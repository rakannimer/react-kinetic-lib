(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./src/apis/discussions/DiscussionsAPI.md":function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return l});var b=a("./node_modules/docz/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),i=(a("./node_modules/react/index.js"),a("./node_modules/@mdx-js/react/dist/index.es.js")),n={},r="wrapper";function l(e){var t=e.components,a=Object(b.a)(e,["components"]);return Object(i.b)(r,Object.assign({},n,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"sendmessage"},"sendMessage"),Object(i.b)("p",null,"Send a message to a discussion."),Object(i.b)("h3",{id:"parameters"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"object"))," message parameters",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.id")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"}),"string"))," the discussion id to send the message to."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.message")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"}),"string"))," message text to send."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.parentId")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"}),"string"))," the id of the parent message."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.attachment")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array"}),"array"))," an array of File objects to attach.")))),Object(i.b)("h2",{id:"updatemessage"},"updateMessage"),Object(i.b)("h3",{id:"parameters-1"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params"),"  ")),Object(i.b)("h2",{id:"fetchmessages"},"fetchMessages"),Object(i.b)("h3",{id:"parameters-2"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"pageToken"),"  ")),Object(i.b)("h2",{id:"fetchmessage"},"fetchMessage"),Object(i.b)("h3",{id:"parameters-3"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.discussionId"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.id"),"  ")))),Object(i.b)("h2",{id:"fetchmessagehistory"},"fetchMessageHistory"),Object(i.b)("h3",{id:"parameters-4"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.discussionId"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.id"),"  ")))),Object(i.b)("h2",{id:"fetchdiscussion"},"fetchDiscussion"),Object(i.b)("p",null,"Fetch a discussion by ",Object(i.b)("inlineCode",{parentName:"p"},"id"),"."),Object(i.b)("h3",{id:"parameters-5"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"object"))," fetch parameters",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.id")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"}),"string"))," the discussion id")))),Object(i.b)("h2",{id:"fetchdiscussions"},"fetchDiscussions"),Object(i.b)("p",null,"Fetch discussions based upon parameters."),Object(i.b)("h3",{id:"parameters-6"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"object"))," fetch parameters",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.pageToken")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String"}),"string"))," next page token for paginated results"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.relatedItem")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"object"))," search for discussions based upon related item (optional, default ",Object(i.b)("inlineCode",{parentName:"li"},"{}"),")"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.title"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.isArchived"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.start"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params.end"),"  ")))),Object(i.b)("h2",{id:"creatediscussion"},"createDiscussion"),Object(i.b)("h3",{id:"parameters-7"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.title"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.description"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.isPrivate"),"   (optional, default ",Object(i.b)("inlineCode",{parentName:"li"},"false"),")"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.owningUsers"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.owningTeams"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.joinPolicy"),"  ")))),Object(i.b)("h2",{id:"updatediscussion"},"updateDiscussion"),Object(i.b)("h3",{id:"parameters-8"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"data"),"  ")),Object(i.b)("h2",{id:"fetchinvites"},"fetchInvites"),Object(i.b)("h3",{id:"parameters-9"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  ")),Object(i.b)("h2",{id:"createinvite"},"createInvite"),Object(i.b)("h3",{id:"parameters-10"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.discussionId"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.type"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.value"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.message"),"  ")))),Object(i.b)("h2",{id:"resendinvite"},"resendInvite"),Object(i.b)("h3",{id:"parameters-11"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.discussionId"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.email"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.username"),"  ")))),Object(i.b)("h2",{id:"removeinvite"},"removeInvite"),Object(i.b)("h3",{id:"parameters-12"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0")," ",Object(i.b)("strong",{parentName:"li"},Object(i.b)("a",Object.assign({parentName:"strong"},{href:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object"}),"Object"))," ",Object(i.b)("ul",{parentName:"li"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.discussionId"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.email"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"$0.username"),"  ")))),Object(i.b)("h2",{id:"fetchparticipants"},"fetchParticipants"),Object(i.b)("h3",{id:"parameters-13"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  ")),Object(i.b)("h2",{id:"removeparticipant"},"removeParticipant"),Object(i.b)("h3",{id:"parameters-14"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"username"),"  ")),Object(i.b)("h2",{id:"updateparticipant"},"updateParticipant"),Object(i.b)("h3",{id:"parameters-15"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"username"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"data"),"  ")),Object(i.b)("h2",{id:"createrelateditem"},"createRelatedItem"),Object(i.b)("h3",{id:"parameters-16"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"id"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"relatedItem"),"  ")),Object(i.b)("h2",{id:"sendinvites"},"sendInvites"),Object(i.b)("h3",{id:"parameters-17"},"Parameters"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"discussion"),"  "),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"values"),"  ")))}l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/apis/discussions/DiscussionsAPI.md"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=apis-discussions-discussions-api.38fef1ac327b90c20998.js.map