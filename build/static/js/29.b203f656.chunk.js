(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{411:function(e,n,t){"use strict";t.d(n,"a",function(){return u});var a=t(57),r=t.n(a),o=t(95),c=t(33),u={getGroups:function(){var e=Object(o.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("/getgroup").then(function(e){return e}).catch(function(e){return console.log(e),!1});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),getGroupsByDateAndCity:function(){var e=Object(o.a)(r.a.mark(function e(n,t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("/getgroupByDateAndCity?city=".concat(n,"&date=").concat(t)).then(function(e){return e}).catch(function(e){return console.log(e),!1});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}(),saveGroups:function(){var e=Object(o.a)(r.a.mark(function e(n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.post("/saveGroup",{data:n}).then(function(e){return e}).catch(function(e){return console.log(e),!1});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),kmean:function(){var e=Object(o.a)(r.a.mark(function e(n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.post("/kmean",{data:n}).then(function(e){return e}).catch(function(e){return console.log(e),!1});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),getSeniorBygroupId:function(){var e=Object(o.a)(r.a.mark(function e(n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("newid",n),e.next=3,c.a.get("/getseniorBygroup?id=".concat(n)).then(function(e){return e}).catch(function(e){return console.log(e),!1});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),updateGroup:function(){var e=Object(o.a)(r.a.mark(function e(n){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("newid",n),e.next=3,c.a.put("/updategroup/".concat(n),{status:"Done"}).then(function(e){return e}).catch(function(e){return console.log(e),!1});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}()}},484:function(e,n,t){"use strict";t.d(n,"a",function(){return u});var a=t(57),r=t.n(a),o=t(95),c=(t(87),t(43),t(33)),u={getUser:function(){var e=Object(o.a)(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("/get-user").then(function(e){try{console.log(e)}catch(n){console.log(n)}});case 2:e.sent;case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),setSeniorstatus:function(){var e=Object(o.a)(r.a.mark(function e(n,t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.a.post("/setseniorstatus",{id:n,data:t}).then(function(e){return console.log("response",e),e});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(n,t){return e.apply(this,arguments)}}()}},918:function(e,n,t){"use strict";t.r(n);var a,r=t(57),o=t.n(r),c=t(95),u=t(42),s=t(0),i=t.n(s),l=t(18),p=t(14).c.div(a||(a=Object(l.a)(['\n  \n  .align {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .edit{\n    position :absolute;\n    top:20px;\n    bottom:5px;\n    left:240px\n  }\n\n  .autoInput {\n    width:100%;\n    height:2.3rem;\n    border: 1px solid rgba(204, 204, 204, 1);\n    border-radius: .16rem!important\n    padding:10px!important\n}\n\n.autoInput:focus {\n    outline: none;\n    border: 1px solid rgba(204, 204, 204, 1);\n   \n    box-shadow: 0 0 0 3px #a3ccfa;\n }\n\n  .round {\n    width: 80%;\n    \n    border-radius: 15px;\n    border: 1px #000 solid;\n    \n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 5;\n}\n\n.corner {\n    position: absolute;\n    top: 3px;\n    left: 5px;\n    height: 20px;\n    width: 20px;\n    z-index: 10;\n    border-radius: 10px;\n    border: none;\n    background:; /* Set the bg image here. with "no-repeat" */\n}\n\n.search {\n    position: relative;\n    width: 190px;\n    height: 30px;\n    \n}\n']))),d=t(69),m=t(58),f=t(447),h=t(462),g=Object(f.compose)(Object(f.withProps)({googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw&v=3.exp&libraries=geometry,drawing,places",loadingElement:i.a.createElement("div",{style:{height:"100%"}}),containerElement:i.a.createElement("div",{style:{height:"400px"}}),mapElement:i.a.createElement("div",{style:{height:"100%"}})}),h.withScriptjs,h.withGoogleMap)(function(e){return i.a.createElement(h.GoogleMap,{defaultZoom:18,defaultCenter:{lat:e.lat,lng:e.lng}},e.isMarkerShown&&i.a.createElement(h.Marker,{position:{lat:e.lat,lng:e.lng}}))}),v=t(28),b=t(411),w=t(484);n.default=function(){var e=Object(s.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(v.g)(),l=Object(v.h)(),f=new URLSearchParams(l.search).get("id");console.log("id",f);var h=function(){b.a.getSeniorBygroupId(f).then(function(e){console.log(e.data.data.senior),t.filter(function(e){return Object.values(e).includes("done")}).length>0&&b.a.updateGroup(f).then(function(e){r.push("/volenteer/assignedgroups/view")}),a(e.data.data.senior)}).catch(function(e){return console.log(e)})};return Object(s.useEffect)(function(){f&&Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:h();case 1:case"end":return e.stop()}},e)}))()},[]),i.a.createElement(p,null,i.a.createElement("div",{className:"container-fluid"},i.a.createElement("div",{className:" clearfix mt-0 mb-5"},i.a.createElement("span",{className:" float-left flex-inline"}," ",i.a.createElement("h4",null,"Group Page"),i.a.createElement("span",null,i.a.createElement("a",{className:"edit "}," ",i.a.createElement("ul",null,"Edit on another ?")))),i.a.createElement("span",{className:"text-right"}," ",i.a.createElement(d.a,null))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-md-7"},i.a.createElement("p",null,"This group delivery takes place on date  and on the city of and has been automatically assigned by a k-means algorithm to group leader "),i.a.createElement("p",null,"here are the names where group leader need to deliver supply"),i.a.createElement("div",{className:"card p-2",style:{background:"#E5E5E5"}},i.a.createElement("a",null,i.a.createElement("div",{class:"clearfix"},t.map(function(e,n){return i.a.createElement("div",{className:"row"},i.a.createElement("p",{className:"col-md-4"},e.fullName),i.a.createElement("div",{className:"col-md-4 rounded-lg",style:{backgroundColor:"#dda0dd"}},i.a.createElement("ul",{onChange:function(n){var t,a;t=n.target.value,a=e._id,console.log(t),console.log(a),a&&Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:w.a.setSeniorstatus(a,t).then(function(e){h()}).catch(function(e){return console.log(e)});case 1:case"end":return e.stop()}},e)}))()}},i.a.createElement("li",{style:{listStyle:"none",display:"inline"}},i.a.createElement("input",{type:"radio",name:n,value:"done"}),"Done",i.a.createElement("input",{type:"radio",name:n,value:"todo",id:"custom_venuetype_private"}),"To-do"))),e.needsFoodSupply?i.a.createElement("p",{className:"col-md-4"}," ",e.needsFoodSupply):i.a.createElement("p",{className:"col-md-4"}," ",e.needsMedicalSupply))}))))),i.a.createElement("div",{className:"row d-flex justify-content-center"},i.a.createElement("div",{className:"col-md-10"},i.a.createElement(g,{isMarkerShown:!0,lat:48.882775,lng:2.176931}),i.a.createElement("div",{className:"row ml-5 mt-4  d-flex justify-content-center"},i.a.createElement("span",null,m.h)," ",i.a.createElement("h6",{className:"ml-1 mt-1"},"Address where group leader have to deliver")))))))}}}]);
//# sourceMappingURL=29.b203f656.chunk.js.map