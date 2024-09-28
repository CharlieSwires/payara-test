(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(26)},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),c=a.n(r),m=a(8),s=a(28),o=a(29),i=a(11),u=a(31),d=a(12),h=a(30),E=a(32);var p=function(e){let{peopleList:t,onWeightsChange:a,onWeightsSubmit:n,checkInBoothId:r,onCheckInBoothIdChange:c,onPersonDetailsChange:m,onShowTicket:p}=e;const y=(e,t,a)=>{m(e,t,a)};return l.a.createElement(s.a,{fluid:!0,className:"px-0"},l.a.createElement(o.a,{className:"align-items-center mb-4 mx-0"},l.a.createElement(i.a,{xs:12,md:7,className:"text-center text-md-left mb-3 mb-md-0"},l.a.createElement("h1",null,"Enter Weights for Each Person")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-end mb-3 mb-md-0"},l.a.createElement(u.a.Label,{className:"font-weight-bold mb-0"},"Check-in Booth ID:")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-start"},l.a.createElement(d.a,{type:"text",value:r,onChange:e=>c(e.target.value),placeholder:"Enter 10-digit ID",maxLength:"10",style:{width:"200px"}}))),l.a.createElement(o.a,{className:"justify-content-center mx-0"},l.a.createElement(i.a,{xs:12,lg:12},l.a.createElement(h.a,{bordered:!0,hover:!0,responsive:!0,className:"text-center"},l.a.createElement("thead",{className:"thead-dark"},l.a.createElement("tr",null,l.a.createElement("th",{style:{width:"3%"}},"#"),l.a.createElement("th",{style:{width:"15%"}},"Full Name"),l.a.createElement("th",{style:{width:"15%"}},"Passport Number"),l.a.createElement("th",{style:{width:"6%"}},"W1"),l.a.createElement("th",{style:{width:"6%"}},"W2"),l.a.createElement("th",{style:{width:"6%"}},"W3"),l.a.createElement("th",{style:{width:"6%"}},"W4"),l.a.createElement("th",{style:{width:"6%"}},"W5"),l.a.createElement("th",{style:{width:"8%"}},"Submit"),l.a.createElement("th",{style:{width:"8%"}},"Amount Paid"),l.a.createElement("th",{style:{width:"21%"}},"Transaction ID"),l.a.createElement("th",{style:{width:"8%"}},"Print Ticket"))),l.a.createElement("tbody",null,t.map((e,t)=>l.a.createElement("tr",{key:t},l.a.createElement("td",null,t+1),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.name,onChange:e=>y(t,"name",e.target.value),placeholder:"Full Name",maxLength:"30"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.passportNumber,onChange:e=>y(t,"passportNumber",e.target.value),placeholder:"Passport Number",maxLength:"30"})),e.weights.map((e,n)=>l.a.createElement("td",{key:n},l.a.createElement(d.a,{type:"number",value:e,onChange:e=>a(t,n,e.target.value),placeholder:`W${n+1}`,min:"0"}))),l.a.createElement("td",null,l.a.createElement(E.a,{variant:"primary",onClick:()=>(e=>{n(e)})(t),disabled:!e.name||!e.passportNumber||!r},"Submit")),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.amountPaid,readOnly:!0,placeholder:"Amount Paid"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.transactionId,readOnly:!0,placeholder:"Transaction ID"})),l.a.createElement("td",null,l.a.createElement(E.a,{variant:"secondary",onClick:()=>p(t),disabled:!e.transactionId},"Print")))))))))};var y=function(e){let{weightsInput:t,personIndex:a,onBack:r,onPay:c,checkInBoothId:m}=e;const[s,o]=Object(n.useState)([]),[i,u]=Object(n.useState)([]),[d,h]=Object(n.useState)(!1),[E,p]=Object(n.useState)(null),[y,b]=Object(n.useState)(null),[g,x]=Object(n.useState)(null);return Object(n.useEffect)(()=>{fetch("http://localhost:9999/payara/luggage-calculator/rules").then(e=>{if(!e.ok)throw new Error(`Failed to fetch rules: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{u(e)}).catch(e=>{console.error("Error fetching rules:",e),p(e)})},[]),l.a.createElement("div",{className:"container"},l.a.createElement("h1",{className:"text-center"},"Luggage Calculator"),l.a.createElement("div",{className:"text-right",style:{marginBottom:"20px"}},l.a.createElement("button",{onClick:r,className:"btn btn-default"},"Back to Input")),d&&l.a.createElement("div",{className:"alert alert-info"},l.a.createElement("strong",null,"Loading...")),E&&l.a.createElement("div",{className:"alert alert-danger"},l.a.createElement("strong",null,"Error:")," ",E.message),l.a.createElement("div",{className:"text-center",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:()=>{null!==y&&c(a,y)},className:"btn btn-primary",style:{marginRight:"10px"}},"Pay Minimum"),l.a.createElement("button",{onClick:()=>{null!==g&&c(a,g)},className:"btn btn-primary"},"Pay User Defined")))};var b=function(e){let{amount:t,onPaymentAccepted:a,onPaymentDeclined:n}=e;return l.a.createElement("div",{className:"container text-center"},l.a.createElement("h1",null,"Payment"),l.a.createElement("p",null,"Amount to be paid: ",l.a.createElement("strong",null,"$",t)),l.a.createElement("div",{className:"payment-methods"},l.a.createElement("h3",null,"Select Payment Method"),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Visa"),l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Mastercard"),l.a.createElement("button",{className:"btn btn-primary"},"PayPal"))),l.a.createElement("div",{className:"payment-actions",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:a,className:"btn btn-success",style:{marginRight:"10px"}},"Payment Accepted"),l.a.createElement("button",{onClick:n,className:"btn btn-danger"},"Payment Declined")))};a(24);function g(){const[e,t]=Object(n.useState)("input"),[a,r]=Object(n.useState)([]),[c,m]=Object(n.useState)(null),[s,o]=Object(n.useState)(Array(5).fill().map(()=>({name:"",passportNumber:"",weights:Array(5).fill(0),amountPaid:"",transactionId:""}))),[i,u]=Object(n.useState)(""),[d,h]=Object(n.useState)(null);return l.a.createElement("div",{className:"App"},"input"===e?l.a.createElement(p,{peopleList:s,onWeightsChange:(e,t,a)=>{const n=[...s];n[e].weights[t]=a,o(n)},onWeightsSubmit:e=>{const a=s[e].weights.map(e=>parseFloat(e)||0);r(a),m(e),t("calculator")},checkInBoothId:i,onCheckInBoothIdChange:e=>{u(e)},onPersonDetailsChange:(e,t,a)=>{const n=[...s];n[e][t]=a,o(n)}}):"calculator"===e?l.a.createElement(y,{weightsInput:a,personIndex:c,onBack:()=>{t("input")},onPay:(e,a)=>{h(a),m(e),t("payment")},checkInBoothId:i}):l.a.createElement(b,{amount:d,onPaymentAccepted:()=>{const e=function(){const e=Date.now().toString(),t=Math.floor(1e11*Math.random()).toString();let a=(e+t).slice(0,20).padEnd(20,"0");return i&&(a+=`-${i}`),a}();((e,a,n)=>{const l=[...s];l[e].amountPaid=a,l[e].transactionId=n,o(l),t("calculator")})(c,d,e)},onPaymentDeclined:()=>{t("calculator")}}))}c.a.render(l.a.createElement(m.a,{basename:"/payara"},l.a.createElement(g,null)),document.getElementById("root"));var x=g;a(25);c.a.render(l.a.createElement(m.a,{basename:"/payara"},l.a.createElement(x,null)),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.31294796.chunk.js.map