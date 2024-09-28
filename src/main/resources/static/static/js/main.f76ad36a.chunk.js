(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,a){e.exports=a(37)},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),c=a.n(r),s=a(17),o=a(39),m=a(40),i=a(14),u=a(42),d=a(15),h=a(41),p=a(43);var E=function(e){let{peopleList:t,onWeightsChange:a,onWeightsSubmit:n,checkInBoothId:r,onCheckInBoothIdChange:c,onPersonDetailsChange:s,onShowTicket:E}=e;const g=(e,t,a)=>{s(e,t,a)};return l.a.createElement(o.a,{fluid:!0,className:"px-0"},l.a.createElement(m.a,{className:"align-items-center mb-4 mx-0"},l.a.createElement(i.a,{xs:12,md:7,className:"text-center text-md-left mb-3 mb-md-0"},l.a.createElement("h1",null,"Enter Weights for Each Person")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-end mb-3 mb-md-0"},l.a.createElement(u.a.Label,{className:"font-weight-bold mb-0"},"Check-in Booth ID:")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-start"},l.a.createElement(d.a,{type:"text",value:r,onChange:e=>c(e.target.value),placeholder:"Enter 10-digit ID",maxLength:"10",style:{width:"200px"}}))),l.a.createElement(m.a,{className:"justify-content-center mx-0"},l.a.createElement(i.a,{xs:12,lg:12},l.a.createElement(h.a,{bordered:!0,hover:!0,responsive:!0,className:"text-center"},l.a.createElement("thead",{className:"thead-dark"},l.a.createElement("tr",null,l.a.createElement("th",{style:{width:"3%"}},"#"),l.a.createElement("th",{style:{width:"15%"}},"Full Name"),l.a.createElement("th",{style:{width:"15%"}},"Passport Number"),l.a.createElement("th",{style:{width:"6%"}},"W1"),l.a.createElement("th",{style:{width:"6%"}},"W2"),l.a.createElement("th",{style:{width:"6%"}},"W3"),l.a.createElement("th",{style:{width:"6%"}},"W4"),l.a.createElement("th",{style:{width:"6%"}},"W5"),l.a.createElement("th",{style:{width:"8%"}},"Submit"),l.a.createElement("th",{style:{width:"8%"}},"Amount Paid"),l.a.createElement("th",{style:{width:"21%"}},"Transaction ID"),l.a.createElement("th",{style:{width:"8%"}},"Print Ticket"))),l.a.createElement("tbody",null,t.map((e,t)=>l.a.createElement("tr",{key:t},l.a.createElement("td",null,t+1),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.name,onChange:e=>g(t,"name",e.target.value),placeholder:"Full Name",maxLength:"30"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.passportNumber,onChange:e=>g(t,"passportNumber",e.target.value),placeholder:"Passport Number",maxLength:"30"})),e.weights.map((e,n)=>l.a.createElement("td",{key:n},l.a.createElement(d.a,{type:"number",value:e,onChange:e=>a(t,n,e.target.value),placeholder:`W${n+1}`,min:"0"}))),l.a.createElement("td",null,l.a.createElement(p.a,{variant:"primary",onClick:()=>(e=>{n(e)})(t),disabled:!e.name||!e.passportNumber||!r},"Submit")),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.amountPaid,readOnly:!0,placeholder:"Amount Paid"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.transactionId,readOnly:!0,placeholder:"Transaction ID"})),l.a.createElement("td",null,l.a.createElement(p.a,{variant:"secondary",onClick:()=>E(t),disabled:!e.transactionId},"Print")))))))))};var g=function(e){let{weightsInput:t,personIndex:a,onBack:r,onPay:c,checkInBoothId:s}=e;const[o,m]=Object(n.useState)([]),[i,u]=Object(n.useState)([]),[d,h]=Object(n.useState)(!1),[p,E]=Object(n.useState)(null),[g,b]=Object(n.useState)(""),[y,N]=Object(n.useState)(null),[v,f]=Object(n.useState)(null);Object(n.useEffect)(()=>{fetch("https://localhost:8443/payara/luggage-calculator/rules").then(e=>{if(!e.ok)throw new Error(`Failed to fetch rules: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{u(e)}).catch(e=>{console.error("Error fetching rules:",e),E(e)})},[]),Object(n.useEffect)(()=>{x()},[t]);const x=()=>{h(!0),E(null),b("");const e={weights:t.map(e=>parseFloat(e)||0)};fetch("https://localhost:8443/payara/luggage-calculator/min-cost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{if(!e.ok)throw new Error(`Server error: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{const t=e.map(e=>({...e,selectedRule:""}));m(t);const a=t.find(e=>"Cost"===e.enumeration);a&&N(parseFloat(a.amount)),h(!1)}).catch(e=>{console.error("Fetch error:",e),E(e),h(!1)})};return l.a.createElement("div",{className:"container"},l.a.createElement("h1",{className:"text-center"},"Luggage Calculator"),l.a.createElement("div",{className:"text-right",style:{marginBottom:"20px"}},l.a.createElement("button",{onClick:r,className:"btn btn-default"},"Back to Input")),d&&l.a.createElement("div",{className:"alert alert-info"},l.a.createElement("strong",null,"Loading...")),p&&l.a.createElement("div",{className:"alert alert-danger"},l.a.createElement("strong",null,"Error:")," ",p.message),o.length>0&&l.a.createElement("div",null,l.a.createElement("h2",{className:"text-center"},"Results"),l.a.createElement("table",{className:"table table-bordered table-striped"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Amount"),l.a.createElement("th",null,"Enumeration"),l.a.createElement("th",null,"Options"))),l.a.createElement("tbody",null,o.map((e,t)=>l.a.createElement("tr",{key:t},l.a.createElement("td",null,e.amount),l.a.createElement("td",null,e.enumeration),l.a.createElement("td",null,"Cost"!==e.enumeration?i.length>0?l.a.createElement("select",{value:e.selectedRule||"",onChange:e=>((e,t)=>{const a=[...o];a[e].selectedRule=t,m(a)})(t,e.target.value),className:"form-control"},l.a.createElement("option",{value:"",disabled:!0},"Select Rule"),i.map((e,t)=>l.a.createElement("option",{key:t,value:e},e))):"Loading rules...":"N/A"))))),l.a.createElement("div",{className:"text-center",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:()=>{h(!0),E(null),b("");const e=o.filter(e=>"Cost"!==e.enumeration),t=e.map(e=>parseFloat(e.amount)||0),a=e.map(e=>e.selectedRule||"");if(a.includes(""))return E(new Error("Please select a rule for each item.")),void h(!1);const n={weights:t,names:a};fetch("https://localhost:8443/payara/luggage-calculator/cost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(e=>e.text().then(t=>{if(!e.ok)throw new Error(t||`Server error: ${e.status} ${e.statusText}`);return t})).then(e=>{b(e),f(parseFloat(e)),h(!1)}).catch(e=>{console.error("Fetch error:",e),b(e.message),h(!1)})},className:"btn btn-success",style:{marginRight:"10px"}},"Calculate with Rules"),l.a.createElement("button",{onClick:()=>{null!==y?c(a,y):alert("Minimum amount is not available.")},className:"btn btn-primary",disabled:null===y,style:{marginRight:"10px"}},"Pay Minimum"),l.a.createElement("button",{onClick:()=>{null!==v?c(a,v):alert("User-defined amount is not available.")},className:"btn btn-primary",disabled:null===v},"Pay User Defined"))),g&&l.a.createElement("div",{className:"well",style:{marginTop:"20px"}},l.a.createElement("h2",null,"Calculate with Rules Result"),l.a.createElement("p",null,g)))};var b=function(e){let{amount:t,onPaymentAccepted:a,onPaymentDeclined:r}=e;const[c,s]=Object(n.useState)(""),[o,m]=Object(n.useState)(""),[i,u]=Object(n.useState)(""),[d,h]=Object(n.useState)(""),[p,E]=Object(n.useState)(!1),g=p||16===c.length&&3===o.length&&i.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)&&d.length>0;return l.a.createElement("div",{className:"container text-center"},l.a.createElement("h1",null,"Payment"),l.a.createElement("p",null,"Amount to be paid: ",l.a.createElement("strong",null,"$",t)),l.a.createElement("div",{className:"payment-methods"},l.a.createElement("h3",null,"Select Payment Method"),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Visa"),l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Mastercard"),l.a.createElement("button",{className:"btn btn-primary",onClick:function(){E(!p)}},p?"PayPal Selected":"PayPal"))),!p&&l.a.createElement("div",{className:"payment-form",style:{marginTop:"20px"}},l.a.createElement("h4",null,"Card Details"),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"cardName"},"Name on Card"),l.a.createElement("input",{type:"text",id:"cardName",className:"form-control",value:d,onChange:e=>h(e.target.value),placeholder:"Cardholder Name",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"cardNumber"},"Card Number"),l.a.createElement("input",{type:"text",id:"cardNumber",className:"form-control",value:c,onChange:e=>s(e.target.value.replace(/\D/g,"").slice(0,16)),placeholder:"16-digit Card Number",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"expiry"},"Expiry Date (MM/YY)"),l.a.createElement("input",{type:"text",id:"expiry",className:"form-control",value:i,onChange:e=>u(e.target.value.replace(/[^0-9\/]/g,"").slice(0,5)),placeholder:"MM/YY",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",{htmlFor:"cvv"},"CVV"),l.a.createElement("input",{type:"text",id:"cvv",className:"form-control",value:o,onChange:e=>m(e.target.value.replace(/\D/g,"").slice(0,3)),placeholder:"3-digit CVV",required:!0}))),l.a.createElement("div",{className:"payment-actions",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:a,className:"btn btn-success",style:{marginRight:"10px"},disabled:!g},"Payment Accepted"),l.a.createElement("button",{onClick:r,className:"btn btn-danger"},"Payment Declined")))},y=a(16),N=a.n(y);var v=function(e){let{person:t,onBack:a}=e;return l.a.createElement("div",{className:"container text-center"},l.a.createElement("h1",null,"Baggage Ticket for ",t.name),l.a.createElement("div",{style:{margin:"20px 0"}},l.a.createElement("h4",null,"Transaction ID: ",t.transactionId),l.a.createElement(N.a,{value:t.transactionId,size:256}),"  "),l.a.createElement("button",{onClick:a,className:"btn btn-primary"},"Back to Input"))};a(35);var f=function(){const[e,t]=Object(n.useState)("input"),[a,r]=Object(n.useState)([]),[c,s]=Object(n.useState)(null),[o,m]=Object(n.useState)(Array(5).fill().map(()=>({name:"",passportNumber:"",weights:Array(5).fill(0),amountPaid:"",transactionId:""}))),[i,u]=Object(n.useState)(""),[d,h]=Object(n.useState)(null),p=()=>{t("input")},y=(e,a,n)=>{const l=[...o];l[e].amountPaid=a,l[e].transactionId=n,m(l),t("input")};return l.a.createElement("div",{className:"App"},"input"===e?l.a.createElement(E,{peopleList:o,onWeightsChange:(e,t,a)=>{const n=[...o];n[e].weights[t]=a,m(n)},onWeightsSubmit:e=>{const a=o[e].weights.map(e=>parseFloat(e)||0);r(a),s(e),t("calculator")},checkInBoothId:i,onCheckInBoothIdChange:e=>{u(e)},onPersonDetailsChange:(e,t,a)=>{const n=[...o];n[e][t]=a,m(n)},onShowTicket:e=>{s(e),t("ticket")}}):"calculator"===e?l.a.createElement(g,{weightsInput:a,personIndex:c,onBack:p,onPay:(e,a)=>{h(a),s(e),t("payment")},checkInBoothId:i}):"ticket"===e?l.a.createElement(v,{person:o[c],onBack:p}):l.a.createElement(b,{amount:d,onPaymentAccepted:()=>{const e=function(){const e=Date.now().toString(),t=Math.floor(1e11*Math.random()).toString();let a=(e+t).slice(0,20).padEnd(20,"0");return i&&(a+=`-${i}`),a}();y(c,d,e)},onPaymentDeclined:()=>{y(c,null,null)}}))};a(36);c.a.render(l.a.createElement(s.a,{basename:"/payara"},l.a.createElement(f,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.f76ad36a.chunk.js.map