import React, { Component, Fragment } from 'react';
import {
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
  getDefaultKeyBinding,
} from 'draft-js';
import detectIndent from 'detect-indent';
import detectNewLine from 'detect-newline';
import classNames from 'classnames';
import {
  apply,
  applyFilter,
  checkFocus,
  checkSelectionPosition,
  closeTypeahead,
  findByEntityType,
  getCurrentIndentation,
  getEntities,
  getEntitiesImpl,
  insertText,
  nextTypeaheadItem,
  previousTypeaheadItem,
  selectTypeaheadItem,
  startTypeahead,
} from './draftHelpers';
import { processCode, processTemplate } from './languageHelpers';
import { VariableMenu } from './VariableMenu';

export class CodeInput extends Component {
  constructor(props) {
    super(props);
    this.newLine = detectNewLine(props.value) || '\n';
    this.indentation = detectIndent(props.value).indent || '  ';
    this.editor = null;
    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw({
          entityMap: {},
          blocks: [
            {
              text: props.value,
            },
          ],
        }),
        new CompositeDecorator([
          {
            strategy: findByEntityType('typeahead-start'),
            component: props => (
              <span
                className={classNames('code typeahead-start', {
                  'typeahead-tentative': this.state.typeaheadTentative,
                })}
              >
                {props.children}
              </span>
            ),
          },
          {
            strategy: findByEntityType('typeahead-selection'),
            component: props => (
              <span className="code typeahead-selection">{props.children}</span>
            ),
          },
          {
            strategy: findByEntityType('typeahead-filter'),
            component: ({ children, entityKey, contentState }) => (
              <Fragment>
                <VariableMenu
                  options={contentState.getEntity(entityKey).getData().options}
                  active={contentState.getEntity(entityKey).getData().active}
                  onSelect={selectTypeaheadItem(this, this.props.template)}
                  target="variable-typeahead-target"
                />
                <span
                  id="variable-typeahead-target"
                  className={classNames('code typeahead-filter', {
                    'typeahead-tentative': this.state.typeaheadTentative,
                  })}
                >
                  {children}
                </span>
              </Fragment>
            ),
          },
          {
            strategy: (contentBlock, callback, contentState) => {
              const entities = getEntitiesImpl(contentBlock, contentState);
              const typeaheadStart = entities.isEmpty()
                ? null
                : entities.first().start;
              const typeaheadEnd = entities.isEmpty()
                ? null
                : entities.last().end;
              const text =
                typeaheadStart !== null
                  ? contentBlock.getText().slice(0, typeaheadStart) +
                    ' '.repeat(typeaheadEnd - typeaheadStart) +
                    contentBlock.getText().slice(typeaheadEnd)
                  : contentBlock.getText();
              const processor = props.template ? processTemplate : processCode;
              this.tokenStarts = {};
              this.tokenEnds = {};
              processor(text)
                .filter(token => typeof token === 'object')
                .forEach(({ content, index: start, type }) => {
                  const end = start + content.length;
                  this.tokenStarts[start] = type;
                  this.tokenEnds[end] = type;
                  if (start < typeaheadStart && end > typeaheadStart) {
                    callback(start, typeaheadStart);
                  }
                  if (start < typeaheadEnd && end > typeaheadEnd) {
                    callback(typeaheadEnd, end);
                  }
                  if (
                    !(start < typeaheadStart && end > typeaheadStart) &&
                    !(start < typeaheadEnd && end > typeaheadEnd)
                  ) {
                    callback(start, end);
                  }
                });
            },
            component: ({ children, start, end }) => (
              <span
                className={classNames(
                  'code',
                  this.tokenStarts[start] || this.tokenEnds[end],
                  {
                    interpolation: props.template,
                  },
                )}
              >
                {children}
              </span>
            ),
          },
        ]),
      ),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.value !== prevProps.value &&
      this.props.value !==
        this.state.editorState
          .getCurrentContent()
          .getFirstBlock()
          .getText()
    ) {
      this.onChange(
        EditorState.push(
          this.state.editorState,
          convertFromRaw({
            entityMap: {},
            blocks: [
              {
                text: this.props.value,
              },
            ],
          }),
          'insert-characters',
        ),
      );
    }
  }

  onMetaChange = editorState => {
    this.setState({ editorState });
  };

  onChange = (editorState, focus) => {
    const nextEditorState = apply(
      editorState,
      checkFocus,
      checkSelectionPosition,
      applyFilter(this.props.bindings),
    );
    const entities = getEntities(nextEditorState);
    this.setState(
      {
        editorState: nextEditorState,
        typeaheadOpen: !entities.isEmpty(),
        typeaheadTentative: entities.size === 2,
      },
      () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(
            nextEditorState
              .getCurrentContent()
              .getFirstBlock()
              .getText(),
          );
        }
        if (focus) {
          this.focus();
        }
      },
    );
  };

  handleDroppedFiles = (selection, [file]) => {
    if (typeof this.props.onChange === 'function') {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.props.onChange(fileReader.result);
      };
      fileReader.readAsText(file);
    }
  };

  handleKeyCommand = (command, editorState) => {
    if (command === 'start-typeahead') {
      this.onChange(startTypeahead(editorState));
    }
    if (command === 'close-typeahead') {
      this.onChange(closeTypeahead(editorState));
    }
    if (command === 'insert-tab') {
      this.onChange(
        insertText({ text: this.indentation })(this.state.editorState),
      );
    }
    if (command === 'insert-newline') {
      const currentIndentation = getCurrentIndentation(
        this.newLine,
        this.state.editorState,
      );
      this.onChange(
        insertText({ text: this.newLine + currentIndentation })(
          this.state.editorState,
        ),
      );
    }
    if (command === 'select-typeahead-option') {
      const { options, active } = getEntities(
        this.state.editorState,
      ).last().data;
      selectTypeaheadItem(this, this.props.template)(...options.get(active))();
    }
    if (command === 'next-typeahead-option') {
      this.onMetaChange(nextTypeaheadItem(editorState));
    }
    if (command === 'previous-typeahead-option') {
      this.onMetaChange(previousTypeaheadItem(editorState));
    }
    return 'not-handled';
  };

  keyBindingFn = event => {
    if (this.state.typeaheadOpen) {
      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        return 'close-typeahead';
      } else if (event.keyCode === 9 || event.keyCode === 13) {
        return 'select-typeahead-option';
      } else if (
        event.keyCode === 38 ||
        (event.keyCode === 80 && event.ctrlKey)
      ) {
        return 'previous-typeahead-option';
      } else if (
        event.keyCode === 40 ||
        (event.keyCode === 78 && event.ctrlKey)
      ) {
        return 'next-typeahead-option';
      }
    } else {
      if (
        event.keyCode === 52 &&
        event.shiftKey &&
        !this.props.bindings.isEmpty()
      ) {
        return 'start-typeahead';
      } else if (
        event.keyCode === 9 &&
        this.props.value.indexOf(this.newLine) > -1
      ) {
        event.preventDefault();
        return 'insert-tab';
      } else if (event.keyCode === 13) {
        return 'insert-newline';
      }
    }
    return getDefaultKeyBinding(event);
  };

  handleRef = el => (this.editor = el);

  focus = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };

  stopEscape = event => {
    if (event.keyCode === 27) {
      event.stopPropagation();
    }
  };

  render() {
    return (
      <div onKeyUp={this.stopEscape}>
        <Editor
          readOnly={this.props.disabled}
          editorState={this.state.editorState}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.onChange}
          ref={this.handleRef}
          handleDroppedFiles={this.handleDroppedFiles}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
        />
      </div>
    );
  }
}
