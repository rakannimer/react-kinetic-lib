import { Map } from 'immutable';
import TableLayout from './TableLayout';
import Header from './Header';
import HeaderRow from './HeaderRow';
import HeaderCell from './HeaderCell';
import Body from './TableBody';
import BodyRow from './BodyRow';
import EmptyBodyRow from './EmptyBodyRow';
import BodyCell from './BodyCell';
import Footer from './Footer';
import FooterRow from './FooterRow';
import FooterCell from './FooterCell';
import FilterControl from './FilterControl';
import PaginationControl from './PaginationControl';

export const DefaultTableConfig = Map({
  TableLayout,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  BodyCell,
  BodyRow,
  EmptyBodyRow,
  Footer,
  FooterRow,
  FooterCell,
  FilterControl,
  PaginationControl,
});
