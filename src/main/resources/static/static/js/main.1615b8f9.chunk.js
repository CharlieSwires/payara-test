(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(26)},24:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),c=a.n(r),s=a(8),o=a(28),m=a(29),i=a(11),u=a(31),d=a(12),h=a(30),E=a(32);var p=function(e){let{peopleList:t,onWeightsChange:a,onWeightsSubmit:n,checkInBoothId:r,onCheckInBoothIdChange:c,onPersonDetailsChange:s,onShowTicket:p}=e;const b=(e,t,a)=>{s(e,t,a)};return l.a.createElement(o.a,{fluid:!0,className:"px-0"},l.a.createElement(m.a,{className:"align-items-center mb-4 mx-0"},l.a.createElement(i.a,{xs:12,md:7,className:"text-center text-md-left mb-3 mb-md-0"},l.a.createElement("h1",null,"Enter Weights for Each Person")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-end mb-3 mb-md-0"},l.a.createElement(u.a.Label,{className:"font-weight-bold mb-0"},"Check-in Booth ID:")),l.a.createElement(i.a,{xs:12,md:2,className:"d-flex justify-content-center justify-content-md-start"},l.a.createElement(d.a,{type:"text",value:r,onChange:e=>c(e.target.value),placeholder:"Enter 10-digit ID",maxLength:"10",style:{width:"200px"}}))),l.a.createElement(m.a,{className:"justify-content-center mx-0"},l.a.createElement(i.a,{xs:12,lg:12},l.a.createElement(h.a,{bordered:!0,hover:!0,responsive:!0,className:"text-center"},l.a.createElement("thead",{className:"thead-dark"},l.a.createElement("tr",null,l.a.createElement("th",{style:{width:"3%"}},"#"),l.a.createElement("th",{style:{width:"15%"}},"Full Name"),l.a.createElement("th",{style:{width:"15%"}},"Passport Number"),l.a.createElement("th",{style:{width:"6%"}},"W1"),l.a.createElement("th",{style:{width:"6%"}},"W2"),l.a.createElement("th",{style:{width:"6%"}},"W3"),l.a.createElement("th",{style:{width:"6%"}},"W4"),l.a.createElement("th",{style:{width:"6%"}},"W5"),l.a.createElement("th",{style:{width:"8%"}},"Submit"),l.a.createElement("th",{style:{width:"8%"}},"Amount Paid"),l.a.createElement("th",{style:{width:"21%"}},"Transaction ID"),l.a.createElement("th",{style:{width:"8%"}},"Print Ticket"))),l.a.createElement("tbody",null,t.map((e,t)=>l.a.createElement("tr",{key:t},l.a.createElement("td",null,t+1),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.name,onChange:e=>b(t,"name",e.target.value),placeholder:"Full Name",maxLength:"30"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.passportNumber,onChange:e=>b(t,"passportNumber",e.target.value),placeholder:"Passport Number",maxLength:"30"})),e.weights.map((e,n)=>l.a.createElement("td",{key:n},l.a.createElement(d.a,{type:"number",value:e,onChange:e=>a(t,n,e.target.value),placeholder:`W${n+1}`,min:"0"}))),l.a.createElement("td",null,l.a.createElement(E.a,{variant:"primary",onClick:()=>(e=>{n(e)})(t),disabled:!e.name||!e.passportNumber||!r},"Submit")),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.amountPaid,readOnly:!0,placeholder:"Amount Paid"})),l.a.createElement("td",null,l.a.createElement(d.a,{type:"text",value:e.transactionId,readOnly:!0,placeholder:"Transaction ID"})),l.a.createElement("td",null,l.a.createElement(E.a,{variant:"secondary",onClick:()=>p(t),disabled:!e.transactionId},"Print")))))))))};var b=function(e){let{weightsInput:t,personIndex:a,onBack:r,onPayment:c,checkInBoothId:s}=e;const[o,m]=Object(n.useState)([]),[i,u]=Object(n.useState)([]),[d,h]=Object(n.useState)(!1),[E,p]=Object(n.useState)(null),[b,g]=Object(n.useState)(""),[y,f]=Object(n.useState)(null),[w,N]=Object(n.useState)(null);Object(n.useEffect)(()=>{fetch("http://localhost:9999/payara/luggage-calculator/rules").then(e=>{if(!e.ok)throw new Error(`Failed to fetch rules: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{u(e)}).catch(e=>{console.error("Error fetching rules:",e),p(e)})},[]),Object(n.useEffect)(()=>{x()},[t]);const x=()=>{h(!0),p(null),g("");const e={weights:t.map(e=>parseFloat(e)||0)};fetch("http://localhost:9999/payara/luggage-calculator/min-cost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{if(!e.ok)throw new Error(`Server error: ${e.status} ${e.statusText}`);return e.json()}).then(e=>{const t=e.map(e=>({...e,selectedRule:""}));m(t);const a=t.find(e=>"Cost"===e.enumeration);a&&f(parseFloat(a.amount)),h(!1)}).catch(e=>{console.error("Fetch error:",e),p(e),h(!1)})};function v(){let e=(Date.now().toString()+Math.floor(1e11*Math.random()).toString()).slice(0,20).padEnd(20,"0");return s&&(e+=`-${s}`),e}return l.a.createElement("div",{className:"container"},l.a.createElement("h1",{className:"text-center"},"Luggage Calculator"),l.a.createElement("div",{className:"text-right",style:{marginBottom:"20px"}},l.a.createElement("button",{onClick:r,className:"btn btn-default"},"Back to Input")),d&&l.a.createElement("div",{className:"alert alert-info"},l.a.createElement("strong",null,"Loading...")),E&&l.a.createElement("div",{className:"alert alert-danger"},l.a.createElement("strong",null,"Error:")," ",E.message),o.length>0&&l.a.createElement("div",null,l.a.createElement("h2",{className:"text-center"},"Results"),l.a.createElement("table",{className:"table table-bordered table-striped"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Amount"),l.a.createElement("th",null,"Enumeration"),l.a.createElement("th",null,"Options"))),l.a.createElement("tbody",null,o.map((e,t)=>l.a.createElement("tr",{key:t},l.a.createElement("td",null,e.amount),l.a.createElement("td",null,e.enumeration),l.a.createElement("td",null,"Cost"!==e.enumeration?i.length>0?l.a.createElement("select",{value:e.selectedRule||"",onChange:e=>((e,t)=>{const a=[...o];a[e].selectedRule=t,m(a)})(t,e.target.value),className:"form-control"},l.a.createElement("option",{value:"",disabled:!0},"Select Rule"),i.map((e,t)=>l.a.createElement("option",{key:t,value:e},e))):"Loading rules...":"N/A"))))),l.a.createElement("div",{className:"text-center",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:()=>{h(!0),p(null),g("");const e=o.filter(e=>"Cost"!==e.enumeration),t=e.map(e=>parseFloat(e.amount)||0),a=e.map(e=>e.selectedRule||"");if(a.includes(""))return p(new Error("Please select a rule for each item.")),void h(!1);const n={weights:t,names:a};fetch("http://localhost:9999/payara/luggage-calculator/cost",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(e=>e.text().then(t=>{if(!e.ok)throw new Error(t||`Server error: ${e.status} ${e.statusText}`);return t})).then(e=>{g(e),N(parseFloat(e)),h(!1)}).catch(e=>{console.error("Fetch error:",e),g(e.message),h(!1)})},className:"btn btn-success",style:{marginRight:"10px"}},"Calculate with Rules"),l.a.createElement("button",{onClick:()=>{if(null!==y){const e=v();c(a,y,e),alert(`Payment of ${y} processed with Transaction ID: ${e}`)}else alert("Minimum amount is not available.")},className:"btn btn-primary",disabled:null===y,style:{marginRight:"10px"}},"Pay Minimum"),l.a.createElement("button",{onClick:()=>{if(null!==w){const e=v();c(a,w,e),alert(`Payment of ${w} processed with Transaction ID: ${e}`)}else alert("User-defined amount is not available.")},className:"btn btn-primary",disabled:null===w},"Pay User Defined"))),b&&l.a.createElement("div",{className:"well",style:{marginTop:"20px"}},l.a.createElement("h2",null,"Calculate with Rules Result"),l.a.createElement("p",null,b)))};var g=function(e){let{amount:t,onPaymentAccepted:a,onPaymentDeclined:n}=e;return l.a.createElement("div",{className:"container text-center"},l.a.createElement("h1",null,"Payment"),l.a.createElement("p",null,"Amount to be paid: ",l.a.createElement("strong",null,"$",t)),l.a.createElement("div",{className:"payment-methods"},l.a.createElement("h3",null,"Select Payment Method"),l.a.createElement("div",null,l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Visa"),l.a.createElement("button",{className:"btn btn-primary",style:{marginRight:"10px"}},"Mastercard"),l.a.createElement("button",{className:"btn btn-primary"},"PayPal"))),l.a.createElement("div",{className:"payment-actions",style:{marginTop:"20px"}},l.a.createElement("button",{onClick:a,className:"btn btn-success",style:{marginRight:"10px"}},"Payment Accepted"),l.a.createElement("button",{onClick:n,className:"btn btn-danger"},"Payment Declined")))};a(24);function y(){const[e,t]=Object(n.useState)("input"),[a,r]=Object(n.useState)([]),[c,s]=Object(n.useState)(null),[o,m]=Object(n.useState)(Array(5).fill().map(()=>({name:"",passportNumber:"",weights:Array(5).fill(0),amountPaid:"",transactionId:""}))),[i,u]=Object(n.useState)(""),[d,h]=Object(n.useState)(null);return l.a.createElement("div",{className:"App"},"input"===e?l.a.createElement(p,{peopleList:o,onWeightsChange:(e,t,a)=>{const n=[...o];n[e].weights[t]=a,m(n)},onWeightsSubmit:e=>{const a=o[e].weights.map(e=>parseFloat(e)||0);r(a),s(e),t("calculator")},checkInBoothId:i,onCheckInBoothIdChange:e=>{u(e)},onPersonDetailsChange:(e,t,a)=>{const n=[...o];n[e][t]=a,m(n)}}):"calculator"===e?l.a.createElement(b,{weightsInput:a,personIndex:c,onBack:()=>{t("input")},onPay:(e,a)=>{h(a),s(e),t("payment")},checkInBoothId:i}):l.a.createElement(g,{amount:d,onPaymentAccepted:()=>{const e=function(){const e=Date.now().toString(),t=Math.floor(1e11*Math.random()).toString();let a=(e+t).slice(0,20).padEnd(20,"0");return i&&(a+=`-${i}`),a}();((e,a,n)=>{const l=[...o];l[e].amountPaid=a,l[e].transactionId=n,m(l),t("calculator")})(c,d,e)},onPaymentDeclined:()=>{t("calculator")}}))}c.a.render(l.a.createElement(s.a,{basename:"/payara"},l.a.createElement(y,null)),document.getElementById("root"));var f=y;a(25);c.a.render(l.a.createElement(s.a,{basename:"/payara"},l.a.createElement(f,null)),document.getElementById("root"))}},[[13,1,2]]]);
//# sourceMappingURL=main.1615b8f9.chunk.js.map