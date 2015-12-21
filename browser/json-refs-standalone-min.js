!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.JsonRefs=e()}}(function(){var e;return function t(e,r,n){function o(s,a){if(!r[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=r[s]={exports:{}};e[s][0].call(f.exports,function(t){var r=e[s][1][t];return o(r?r:t)},f,f.exports,t,e,r,n)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e,t,r){"use strict";function n(e,t){function r(e){return c(e,"Undefined")||""===e?[]:e.split("/")}function n(e){".."===e?o.pop():o.push(e)}var o=[];return r(e).concat(r(t)).forEach(n),0===o.length?"":o.join("/")}function o(e,t){function r(e){Object.keys(e).forEach(function(t){n[t]=e[t]})}var n={};return r(T.parse(e||"")),r(T.parse(t||"")),0===Object.keys(n).length?void 0:T.stringify(n)}function i(e,t){var r,i,s=O.parse(c(t,"Undefined")?"":t);return"absolute"===s.reference?i=s:(r=c(e,"Undefined")?void 0:O.parse(e),c(r,"Undefined")?i=s:(i=r,i.path=O.normalize(n(r.path,s.path)),i.query=o(r.query,s.query))),i.fragment=void 0,O.serialize(i)}function s(e){return e.replace(/~0/g,"~").replace(/~1/g,"/")}function a(e,t){var r=[],n=e;return t.slice(0,t.length-1).forEach(function(e){e in n&&(n=n[e],r.push(n))}),r}function u(e,t){var r=e;return t.forEach(function(e){if(!(e in r))throw Error("JSON Pointer points to missing location: "+w(t));r=r[e]}),r}function c(e,t){return"Undefined"===t?"undefined"==typeof e:Object.prototype.toString.call(e)==="[object "+t+"]"}function f(e){var t;return c(e,"Array")?(t=[],e.forEach(function(e,r){t[r]=f(e)})):c(e,"Object")?(t={},Object.keys(e).forEach(function(r){t[r]=f(e[r])})):t=e,t}function p(e){return c(e,"String")||(e=JSON.stringify(e)),e.replace(/~/g,"~0").replace(/\//g,"~1")}function h(e,t){var r=S[e],n=Promise.resolve(),o=f(t.loaderOptions||{});return c(r,"Undefined")?(c(o.processContent,"Undefined")&&(o.processContent=function(e,t){t(void 0,JSON.parse(e.text))}),n=_.load(e,o),n=n.then(function(t){return S[e]={response:t},t})):n=n.then(function(){return r.response}),n=n.then(function(e){return f(e)})}function l(e){return c(e,"Object")&&c(e.$ref,"String")}function d(e){return Object.keys(e).reduce(function(e,t){return"$ref"!==t&&e.push(t),e},[])}function y(e,t,r,n){function o(t,o){r.push(o),y(e,t,r,n),r.pop()}var i=!0;c(n,"Function")&&(i=n(e,t,r)),-1===e.indexOf(t)&&(e.push(t),i!==!1&&(c(t,"Array")?t.forEach(function(e,t){o(e,t.toString())}):c(t,"Object")&&Object.keys(t).forEach(function(e){o(t[e],e)}))),e.pop()}function m(e){if(!c(e,"Undefined")){if(!c(e,"Object"))throw new TypeError("options must be an Object");if(!(c(e.subDocPath,"Undefined")||c(e.subDocPath,"Array")||g(e.subDocPath)))throw new TypeError("options.subDocPath must be an Array of path segments or a valid JSON Pointer");if(!(c(e.filter,"Undefined")||c(e.filter,"Array")||c(e.filter,"Function")||c(e.filter,"String")))throw new TypeError("options.filter must be an Array, a Function of a String")}}function v(e){var t,r,n,o={def:e};if(l(e)){if(t=e.$ref,n=A[t],c(n,"Undefined")&&(n=A[t]=O.parse(e.$ref)),o.uri=t,o.uriDetails=n,c(n.error,"Undefined"))switch(n.reference){case"absolute":case"uri":o.type="remote";break;case"same-document":o.type="local";break;default:o.type=n.reference}else o.error=o.uriDetails.error,o.type="invalid";r=d(e),r.length>0&&(o.warning="Extra JSON Reference properties will be ignored: "+r.join(", "))}else o.type="invalid";return o}function g(e){var t,r=c(e,"String");return r&&""!==e&&(t=e.charAt(0),-1===["#","/"].indexOf(t)?r=!1:"#"===t&&"#"!==e&&"/"!==e.charAt(1)&&(r=!1)),r}function E(e){return l(e)&&"invalid"!==v(e).type}function b(e){if(!g(e))throw new Error("ptr must be a JSON Pointer");var t=e.split("/");return t.shift(),t=t.map(s)}function w(e,t){if(!c(e,"Array"))throw new Error("path must be an Array");return(t!==!1?"#":"")+(e.length>0?"/":"")+e.map(p).join("/")}function C(e,t){var r,n=[],o=e,i=[],s={};if(!c(e,"Array")&&!c(e,"Object"))throw new TypeError("obj must be an Array or an Object");return c(t,"Undefined")&&(t={}),m(t),c(t.subDocPath,"Array")?i=t.subDocPath:c(t.subDocPath,"String")&&(i=b(t.subDocPath)),r=c(t.filter,"Array")||c(t.filter,"String")?function(e){var r=c(t.filter,"String")?[t.filter]:t.filter;return r.indexOf(e.type)>-1}:c(t.filter,"Function")?t.filter:function(){return!0},i.length>0&&(n=a(e,i),o=u(e,i)),y(n,o,i,function(e,t,n){var o,i=!0;return E(t)&&(o=v(t),r(o,n)===!0&&(s[w(n)]=o),d(t).length>0&&(i=!1)),i}),s}function x(e,t){var r=Promise.resolve();return r=r.then(function(){if(!c(e,"String"))throw new TypeError("location must be a string");c(t,"Undefined")&&(t={}),m(t),e=i(t.relativeBase,e)}).then(function(){return h(e,t)}).then(function(e){return C(e,t)})}var _=e("path-loader"),T=e("querystring"),O=e("uri-js"),S={},A={};"undefined"==typeof Promise&&e("native-promise-only"),t.exports.findRefs=C,t.exports.findRefsAt=x,t.exports.getRefDetails=v,t.exports.isPtr=g,t.exports.isRef=E,t.exports.pathFromPtr=b,t.exports.pathToPtr=w},{"native-promise-only":3,"path-loader":4,querystring:9,"uri-js":17}],2:[function(e,t,r){function n(e){return e?o(e):void 0}function o(e){for(var t in n.prototype)e[t]=n.prototype[t];return e}t.exports=n,n.prototype.on=n.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks[e]=this._callbacks[e]||[]).push(t),this},n.prototype.once=function(e,t){function r(){n.off(e,r),t.apply(this,arguments)}var n=this;return this._callbacks=this._callbacks||{},r.fn=t,this.on(e,r),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r=this._callbacks[e];if(!r)return this;if(1==arguments.length)return delete this._callbacks[e],this;for(var n,o=0;o<r.length;o++)if(n=r[o],n===t||n.fn===t){r.splice(o,1);break}return this},n.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),r=this._callbacks[e];if(r){r=r.slice(0);for(var n=0,o=r.length;o>n;++n)r[n].apply(this,t)}return this},n.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[e]||[]},n.prototype.hasListeners=function(e){return!!this.listeners(e).length}},{}],3:[function(t,r,n){(function(t){!function(t,n,o){n[t]=n[t]||o(),"undefined"!=typeof r&&r.exports?r.exports=n[t]:"function"==typeof e&&e.amd&&e(function(){return n[t]})}("Promise","undefined"!=typeof t?t:this,function(){"use strict";function e(e,t){h.add(e,t),p||(p=d(h.drain))}function t(e){var t,r=typeof e;return null==e||"object"!=r&&"function"!=r||(t=e.then),"function"==typeof t?t:!1}function r(){for(var e=0;e<this.chain.length;e++)n(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function n(e,r,n){var o,i;try{r===!1?n.reject(e.msg):(o=r===!0?e.msg:r.call(void 0,e.msg),o===n.promise?n.reject(TypeError("Promise-chain cycle")):(i=t(o))?i.call(o,n.resolve,n.reject):n.resolve(o))}catch(s){n.reject(s)}}function o(n){var s,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(s=t(n))?e(function(){var e=new a(u);try{s.call(n,function(){o.apply(e,arguments)},function(){i.apply(e,arguments)})}catch(t){i.call(e,t)}}):(u.msg=n,u.state=1,u.chain.length>0&&e(r,u))}catch(c){i.call(new a(u),c)}}}function i(t){var n=this;n.triggered||(n.triggered=!0,n.def&&(n=n.def),n.msg=t,n.state=2,n.chain.length>0&&e(r,n))}function s(e,t,r,n){for(var o=0;o<t.length;o++)!function(o){e.resolve(t[o]).then(function(e){r(o,e)},n)}(o)}function a(e){this.def=e,this.triggered=!1}function u(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function c(t){if("function"!=typeof t)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var n=new u(this);this.then=function(t,o){var i={success:"function"==typeof t?t:!0,failure:"function"==typeof o?o:!1};return i.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");i.resolve=e,i.reject=t}),n.chain.push(i),0!==n.state&&e(r,n),i.promise},this["catch"]=function(e){return this.then(void 0,e)};try{t.call(void 0,function(e){o.call(n,e)},function(e){i.call(n,e)})}catch(s){i.call(n,s)}}var f,p,h,l=Object.prototype.toString,d="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),f=function(e,t,r,n){return Object.defineProperty(e,t,{value:r,writable:!0,configurable:n!==!1})}}catch(y){f=function(e,t,r){return e[t]=r,e}}h=function(){function e(e,t){this.fn=e,this.self=t,this.next=void 0}var t,r,n;return{add:function(o,i){n=new e(o,i),r?r.next=n:t=n,r=n,n=void 0},drain:function(){var e=t;for(t=r=p=void 0;e;)e.fn.call(e.self),e=e.next}}}();var m=f({},"constructor",c,!1);return c.prototype=m,f(m,"__NPO__",0,!1),f(c,"resolve",function(e){var t=this;return e&&"object"==typeof e&&1===e.__NPO__?e:new t(function(t,r){if("function"!=typeof t||"function"!=typeof r)throw TypeError("Not a function");t(e)})}),f(c,"reject",function(e){return new this(function(t,r){if("function"!=typeof t||"function"!=typeof r)throw TypeError("Not a function");r(e)})}),f(c,"all",function(e){var t=this;return"[object Array]"!=l.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t(function(r,n){if("function"!=typeof r||"function"!=typeof n)throw TypeError("Not a function");var o=e.length,i=Array(o),a=0;s(t,e,function(e,t){i[e]=t,++a===o&&r(i)},n)})}),f(c,"race",function(e){var t=this;return"[object Array]"!=l.call(e)?t.reject(TypeError("Not an array")):new t(function(r,n){if("function"!=typeof r||"function"!=typeof n)throw TypeError("Not a function");s(t,e,function(e,t){r(t)},n)})}),c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],4:[function(e,t,r){"use strict";function n(e){return"undefined"!=typeof e&&(e=-1===e.indexOf("://")?"":e.split("://")[0]),e}function o(e){var t=n(e),r=i[t];if("undefined"==typeof r){if(""!==t)throw new Error("Unsupported scheme: "+t);r=s}return r}var i={file:e("./lib/loaders/file"),http:e("./lib/loaders/http"),https:e("./lib/loaders/http")},s="object"==typeof window||"function"==typeof importScripts?i.http:i.file;"undefined"==typeof Promise&&e("native-promise-only"),t.exports.load=function(e,t){var r=Promise.resolve();return"undefined"==typeof t&&(t={}),r=r.then(function(){if("undefined"==typeof e)throw new TypeError("location is required");if("string"!=typeof e)throw new TypeError("location must be a string");if("undefined"!=typeof t){if("object"!=typeof t)throw new TypeError("options must be an object");if("undefined"!=typeof t.processContent&&"function"!=typeof t.processContent)throw new TypeError("options.processContent must be a function")}}),r=r.then(function(){return new Promise(function(r,n){var i=o(e);i.load(e,t||{},function(e,t){e?n(e):r(t)})})}).then(function(e){return t.processContent?new Promise(function(r,n){t.processContent("object"==typeof e?e:{text:e},function(e,t){e?n(e):r(t)})}):"object"==typeof e?e.text:e})}},{"./lib/loaders/file":5,"./lib/loaders/http":6,"native-promise-only":3}],5:[function(e,t,r){"use strict";var n=new TypeError("The 'file' scheme is not supported in the browser");t.exports.getBase=function(){throw n},t.exports.load=function(){var e=arguments[arguments.length-1];if("function"!=typeof e)throw n;e(n)}},{}],6:[function(e,t,r){"use strict";var n=e("superagent"),o=["delete","get","head","patch","post","put"];t.exports.load=function(e,t,r){function i(e,t){e?r(e):("function"==typeof t.buffer&&t.buffer(!0),t.end(function(e,t){e?r(e):r(void 0,t)}))}var s,a,u=t.method?t.method.toLowerCase():"get";if("undefined"!=typeof t.method?"string"!=typeof t.method?s=new TypeError("options.method must be a string"):-1===o.indexOf(t.method)&&(s=new TypeError("options.method must be one of the following: "+o.slice(0,o.length-1).join(", ")+" or "+o[o.length-1])):"undefined"!=typeof t.prepareRequest&&"function"!=typeof t.prepareRequest&&(s=new TypeError("options.prepareRequest must be a function")),s)r(s);else if(a=n["delete"===u?"del":u](e),t.prepareRequest)try{t.prepareRequest(a,i)}catch(c){r(c)}else i(void 0,a)}},{superagent:11}],7:[function(e,t,r){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,r,i){t=t||"&",r=r||"=";var s={};if("string"!=typeof e||0===e.length)return s;var a=/\+/g;e=e.split(t);var u=1e3;i&&"number"==typeof i.maxKeys&&(u=i.maxKeys);var c=e.length;u>0&&c>u&&(c=u);for(var f=0;c>f;++f){var p,h,l,d,y=e[f].replace(a,"%20"),m=y.indexOf(r);m>=0?(p=y.substr(0,m),h=y.substr(m+1)):(p=y,h=""),l=decodeURIComponent(p),d=decodeURIComponent(h),n(s,l)?o(s[l])?s[l].push(d):s[l]=[s[l],d]:s[l]=d}return s};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],8:[function(e,t,r){"use strict";function n(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,r,a){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?n(s(e),function(s){var a=encodeURIComponent(o(s))+r;return i(e[s])?n(e[s],function(e){return a+encodeURIComponent(o(e))}).join(t):a+encodeURIComponent(o(e[s]))}).join(t):a?encodeURIComponent(o(a))+r+encodeURIComponent(o(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},s=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t}},{}],9:[function(e,t,r){"use strict";r.decode=r.parse=e("./decode"),r.encode=r.stringify=e("./encode")},{"./decode":7,"./encode":8}],10:[function(e,t,r){t.exports=function(e,t,r){for(var n=0,o=e.length,i=3==arguments.length?r:e[n++];o>n;)i=t.call(null,i,e[n],++n,e);return i}},{}],11:[function(e,t,r){function n(){}function o(e){var t={}.toString.call(e);switch(t){case"[object File]":case"[object Blob]":case"[object FormData]":return!0;default:return!1}}function i(e){return e===Object(e)}function s(e){if(!i(e))return e;var t=[];for(var r in e)null!=e[r]&&a(t,r,e[r]);return t.join("&")}function a(e,t,r){return Array.isArray(r)?r.forEach(function(r){a(e,t,r)}):void e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}function u(e){for(var t,r,n={},o=e.split("&"),i=0,s=o.length;s>i;++i)r=o[i],t=r.split("="),n[decodeURIComponent(t[0])]=decodeURIComponent(t[1]);return n}function c(e){var t,r,n,o,i=e.split(/\r?\n/),s={};i.pop();for(var a=0,u=i.length;u>a;++a)r=i[a],t=r.indexOf(":"),n=r.slice(0,t).toLowerCase(),o=b(r.slice(t+1)),s[n]=o;return s}function f(e){return/[\/+]json\b/.test(e)}function p(e){return e.split(/ *; */).shift()}function h(e){return E(e.split(/ *; */),function(e,t){var r=t.split(/ *= */),n=r.shift(),o=r.shift();return n&&o&&(e[n]=o),e},{})}function l(e,t){t=t||{},this.req=e,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||"undefined"==typeof this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText,this.setStatusProperties(this.xhr.status),this.header=this.headers=c(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this.setHeaderProperties(this.header),this.body="HEAD"!=this.req.method?this.parseBody(this.text?this.text:this.xhr.response):null}function d(e,t){var r=this;g.call(this),this._query=this._query||[],this.method=e,this.url=t,this.header={},this._header={},this.on("end",function(){var e=null,t=null;try{t=new l(r)}catch(n){return e=new Error("Parser is unable to parse the response"),e.parse=!0,e.original=n,e.rawResponse=r.xhr&&r.xhr.responseText?r.xhr.responseText:null,r.callback(e)}if(r.emit("response",t),e)return r.callback(e,t);if(t.status>=200&&t.status<300)return r.callback(e,t);var o=new Error(t.statusText||"Unsuccessful HTTP response");o.original=e,o.response=t,o.status=t.status,r.callback(o,t)})}function y(e,t){return"function"==typeof t?new d("GET",e).end(t):1==arguments.length?new d("GET",e):new d(e,t)}function m(e,t){var r=y("DELETE",e);return t&&r.end(t),r}var v,g=e("emitter"),E=e("reduce");v="undefined"!=typeof window?window:"undefined"!=typeof self?self:this,y.getXHR=function(){if(!(!v.XMLHttpRequest||v.location&&"file:"==v.location.protocol&&v.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}return!1};var b="".trim?function(e){return e.trim()}:function(e){return e.replace(/(^\s*|\s*$)/g,"")};y.serializeObject=s,y.parseString=u,y.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},y.serialize={"application/x-www-form-urlencoded":s,"application/json":JSON.stringify},y.parse={"application/x-www-form-urlencoded":u,"application/json":JSON.parse},l.prototype.get=function(e){return this.header[e.toLowerCase()]},l.prototype.setHeaderProperties=function(e){var t=this.header["content-type"]||"";this.type=p(t);var r=h(t);for(var n in r)this[n]=r[n]},l.prototype.parseBody=function(e){var t=y.parse[this.type];return t&&e&&(e.length||e instanceof Object)?t(e):null},l.prototype.setStatusProperties=function(e){1223===e&&(e=204);var t=e/100|0;this.status=this.statusCode=e,this.statusType=t,this.info=1==t,this.ok=2==t,this.clientError=4==t,this.serverError=5==t,this.error=4==t||5==t?this.toError():!1,this.accepted=202==e,this.noContent=204==e,this.badRequest=400==e,this.unauthorized=401==e,this.notAcceptable=406==e,this.notFound=404==e,this.forbidden=403==e},l.prototype.toError=function(){var e=this.req,t=e.method,r=e.url,n="cannot "+t+" "+r+" ("+this.status+")",o=new Error(n);return o.status=this.status,o.method=t,o.url=r,o},y.Response=l,g(d.prototype),d.prototype.use=function(e){return e(this),this},d.prototype.timeout=function(e){return this._timeout=e,this},d.prototype.clearTimeout=function(){return this._timeout=0,clearTimeout(this._timer),this},d.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this.clearTimeout(),this.emit("abort"),this)},d.prototype.set=function(e,t){if(i(e)){for(var r in e)this.set(r,e[r]);return this}return this._header[e.toLowerCase()]=t,this.header[e]=t,this},d.prototype.unset=function(e){return delete this._header[e.toLowerCase()],delete this.header[e],this},d.prototype.getHeader=function(e){return this._header[e.toLowerCase()]},d.prototype.type=function(e){return this.set("Content-Type",y.types[e]||e),this},d.prototype.parse=function(e){return this._parser=e,this},d.prototype.accept=function(e){return this.set("Accept",y.types[e]||e),this},d.prototype.auth=function(e,t){var r=btoa(e+":"+t);return this.set("Authorization","Basic "+r),this},d.prototype.query=function(e){return"string"!=typeof e&&(e=s(e)),e&&this._query.push(e),this},d.prototype.field=function(e,t){return this._formData||(this._formData=new v.FormData),this._formData.append(e,t),this},d.prototype.attach=function(e,t,r){return this._formData||(this._formData=new v.FormData),this._formData.append(e,t,r),this},d.prototype.send=function(e){var t=i(e),r=this.getHeader("Content-Type");if(t&&i(this._data))for(var n in e)this._data[n]=e[n];else"string"==typeof e?(r||this.type("form"),r=this.getHeader("Content-Type"),"application/x-www-form-urlencoded"==r?this._data=this._data?this._data+"&"+e:e:this._data=(this._data||"")+e):this._data=e;return!t||o(e)?this:(r||this.type("json"),this)},d.prototype.callback=function(e,t){var r=this._callback;this.clearTimeout(),r(e,t)},d.prototype.crossDomainError=function(){var e=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");e.crossDomain=!0,e.status=this.status,e.method=this.method,e.url=this.url,this.callback(e)},d.prototype.timeoutError=function(){var e=this._timeout,t=new Error("timeout of "+e+"ms exceeded");t.timeout=e,this.callback(t)},d.prototype.withCredentials=function(){return this._withCredentials=!0,this},d.prototype.end=function(e){var t=this,r=this.xhr=y.getXHR(),i=this._query.join("&"),s=this._timeout,a=this._formData||this._data;this._callback=e||n,r.onreadystatechange=function(){if(4==r.readyState){var e;try{e=r.status}catch(n){e=0}if(0==e){if(t.timedout)return t.timeoutError();if(t.aborted)return;return t.crossDomainError()}t.emit("end")}};var u=function(e){e.total>0&&(e.percent=e.loaded/e.total*100),t.emit("progress",e)};this.hasListeners("progress")&&(r.onprogress=u);try{r.upload&&this.hasListeners("progress")&&(r.upload.onprogress=u)}catch(c){}if(s&&!this._timer&&(this._timer=setTimeout(function(){t.timedout=!0,t.abort()},s)),i&&(i=y.serializeObject(i),this.url+=~this.url.indexOf("?")?"&"+i:"?"+i),r.open(this.method,this.url,!0),this._withCredentials&&(r.withCredentials=!0),"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof a&&!o(a)){var p=this.getHeader("Content-Type"),h=this._parser||y.serialize[p?p.split(";")[0]:""];!h&&f(p)&&(h=y.serialize["application/json"]),h&&(a=h(a))}for(var l in this.header)null!=this.header[l]&&r.setRequestHeader(l,this.header[l]);return this.emit("request",this),r.send("undefined"!=typeof a?a:null),this},d.prototype.then=function(e,t){return this.end(function(r,n){r?t(r):e(n)})},y.Request=d,y.get=function(e,t,r){var n=y("GET",e);return"function"==typeof t&&(r=t,t=null),t&&n.query(t),r&&n.end(r),n},y.head=function(e,t,r){var n=y("HEAD",e);return"function"==typeof t&&(r=t,t=null),t&&n.send(t),r&&n.end(r),n},y.del=m,y["delete"]=m,y.patch=function(e,t,r){var n=y("PATCH",e);return"function"==typeof t&&(r=t,t=null),t&&n.send(t),r&&n.end(r),n},y.post=function(e,t,r){var n=y("POST",e);return"function"==typeof t&&(r=t,t=null),t&&n.send(t),r&&n.end(r),n},y.put=function(e,t,r){var n=y("PUT",e);return"function"==typeof t&&(r=t,t=null),t&&n.send(t),r&&n.end(r),n},t.exports=y},{emitter:2,reduce:10}],12:[function(e,t,r){var n=function(){function e(e){throw new RangeError(T[e])}function t(e,t){for(var r=e.length,n=[];r--;)n[r]=t(e[r]);return n}function r(e,r){var n=e.split("@"),o="";n.length>1&&(o=n[0]+"@",e=n[1]),e=e.replace(_,".");var i=e.split("."),s=t(i,r).join(".");return o+s}function n(e){for(var t,r,n=[],o=0,i=e.length;i>o;)t=e.charCodeAt(o++),t>=55296&&56319>=t&&i>o?(r=e.charCodeAt(o++),56320==(64512&r)?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),o--)):n.push(t);return n}function o(e){return t(e,function(e){var t="";return e>65535&&(e-=65536,t+=A(e>>>10&1023|55296),e=56320|1023&e),t+=A(e)}).join("")}function i(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:d}function s(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function a(e,t,r){var n=0;for(e=r?S(e/g):e>>1,e+=S(e/t);e>O*m>>1;n+=d)e=S(e/O);return S(n+(O+1)*e/(e+v))}function u(t){var r,n,s,u,c,f,p,h,v,g,C=[],x=t.length,_=0,T=b,O=E;for(n=t.lastIndexOf(w),0>n&&(n=0),s=0;n>s;++s)t.charCodeAt(s)>=128&&e("not-basic"),C.push(t.charCodeAt(s));for(u=n>0?n+1:0;x>u;){for(c=_,f=1,p=d;u>=x&&e("invalid-input"),h=i(t.charCodeAt(u++)),(h>=d||h>S((l-_)/f))&&e("overflow"),_+=h*f,v=O>=p?y:p>=O+m?m:p-O,!(v>h);p+=d)g=d-v,f>S(l/g)&&e("overflow"),f*=g;r=C.length+1,O=a(_-c,r,0==c),S(_/r)>l-T&&e("overflow"),T+=S(_/r),_%=r,C.splice(_++,0,T)}return o(C)}function c(t){var r,o,i,u,c,f,p,h,v,g,C,x,_,T,O,j=[];for(t=n(t),x=t.length,r=b,o=0,c=E,f=0;x>f;++f)C=t[f],128>C&&j.push(A(C));for(i=u=j.length,u&&j.push(w);x>i;){for(p=l,f=0;x>f;++f)C=t[f],C>=r&&p>C&&(p=C);for(_=i+1,p-r>S((l-o)/_)&&e("overflow"),o+=(p-r)*_,r=p,f=0;x>f;++f)if(C=t[f],r>C&&++o>l&&e("overflow"),C==r){for(h=o,v=d;g=c>=v?y:v>=c+m?m:v-c,!(g>h);v+=d)O=h-g,T=d-g,j.push(A(s(g+O%T,0))),h=S(O/T);j.push(A(s(h,0))),c=a(o,_,i==u),o=0,++i}++o,++r}return j.join("")}function f(e){return r(e,function(e){return C.test(e)?u(e.slice(4).toLowerCase()):e})}function p(e){return r(e,function(e){return x.test(e)?"xn--"+c(e):e})}var h,l=2147483647,d=36,y=1,m=26,v=38,g=700,E=72,b=128,w="-",C=/^xn--/,x=/[^\x20-\x7E]/,_=/[\x2E\u3002\uFF0E\uFF61]/g,T={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},O=d-y,S=Math.floor,A=String.fromCharCode;return h={version:"1.3.2",ucs2:{decode:n,encode:o},decode:u,encode:c,toASCII:p,toUnicode:f}}();"undefined"==typeof COMPILED&&"undefined"!=typeof t&&(t.exports=n)},{}],13:[function(e,t,r){e("./schemes/http"),e("./schemes/urn"),e("./schemes/mailto")},{"./schemes/http":14,"./schemes/mailto":15,"./schemes/urn":16}],14:[function(e,t,r){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri");n.SCHEMES.http=n.SCHEMES.https={domainHost:!0,parse:function(e,t){return e.host||(e.error=e.error||"HTTP URIs must have a host."),e},serialize:function(e,t){return(e.port===("https"!==String(e.scheme).toLowerCase()?80:443)||""===e.port)&&(e.port=void 0),e.path||(e.path="/"),e}}},{"../uri":17}],15:[function(e,t,r){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri"),o=e("../punycode");!function(){function e(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];if(e.length>1){e[0]=e[0].slice(0,-1);for(var r=e.length-1,n=1;r>n;++n)e[n]=e[n].slice(1,-1);return e[r]=e[r].slice(1),e.join("")}return e[0]}function t(e){return"(?:"+e+")"}function r(e){return e.toUpperCase()}function i(e){var t=n.pctDecChars(e);return t.match(R)?t:e}function s(e){return void 0!==e&&null!==e?e instanceof Array&&!e.callee?e:"number"!=typeof e.length||e.split||e.setInterval||e.call?[e]:Array.prototype.slice.call(e):[]}var a={},u=n.IRI_SUPPORT,c="[A-Za-z0-9\\-\\.\\_\\~"+(u?"\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF":"")+"]",f="[0-9A-Fa-f]",p=t(t("%[EFef]"+f+"%"+f+f+"%"+f+f)+"|"+t("%[89A-Fa-f]"+f+"%"+f+f)+"|"+t("%"+f+f)),h="[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]",l="[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]",d=e(l,'[\\"\\\\]'),y=t(h+"+"+t("\\."+h+"+")+"*"),m=t("\\\\"+d),v=t(l+"|"+m),g=t('\\"'+v+'*\\"'),E="[\\x21-\\x5A\\x5E-\\x7E]",b="[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]",w=t(c+"|"+p+"|"+b),C=t(y+"|\\["+E+"*\\]"),x=t(y+"|"+g),_=t(x+"\\@"+C),T=t(_+t("\\,"+_)+"*"),O=t(w+"*"),S=O,A=t(O+"\\="+S),j=t(A+t("\\&"+A)+"*"),P=t("\\?"+j),R=(n.VALIDATE_SUPPORT&&new RegExp("^mailto\\:"+T+"?"+P+"?$"),new RegExp(c,"g")),D=new RegExp(p,"g"),N=new RegExp(e("[^]",h,"[\\.]",'[\\"]',d),"g"),U=new RegExp(e("[^]",h,"[\\.]","[\\[]",E,"[\\]]"),"g"),I=new RegExp(e("[^]",c,b),"g"),F=I,q=n.VALIDATE_SUPPORT&&new RegExp("^"+T+"$"),H=n.VALIDATE_SUPPORT&&new RegExp("^"+j+"$");n.SCHEMES.mailto={parse:function(e,t){n.VALIDATE_SUPPORT&&!e.error&&(e.path&&!q.test(e.path)?e.error="Email address is not valid":e.query&&!H.test(e.query)&&(e.error="Header fields are invalid"));var r=e.to=e.path?e.path.split(","):[];if(e.path=void 0,e.query){for(var i=!1,s={},a=e.query.split("&"),u=0,c=a.length;c>u;++u){var f=a[u].split("=");switch(f[0]){case"to":for(var p=f[1].split(","),h=0,l=p.length;l>h;++h)r.push(p[h]);break;case"subject":e.subject=n.unescapeComponent(f[1],t);break;case"body":e.body=n.unescapeComponent(f[1],t);break;default:i=!0,s[n.unescapeComponent(f[0],t)]=n.unescapeComponent(f[1],t)}}i&&(e.headers=s)}e.query=void 0;for(var u=0,c=r.length;c>u;++u){var d=r[u].split("@");if(d[0]=n.unescapeComponent(d[0]),"undefined"==typeof o||t.unicodeSupport)d[1]=n.unescapeComponent(d[1],t).toLowerCase();else try{d[1]=o.toASCII(n.unescapeComponent(d[1],t).toLowerCase())}catch(y){e.error=e.error||"Email address's domain name can not be converted to ASCII via punycode: "+y}r[u]=d.join("@")}return e},serialize:function(e,t){var u=s(e.to);if(u){for(var c=0,f=u.length;f>c;++c){var p=String(u[c]),h=p.lastIndexOf("@"),l=p.slice(0,h),d=p.slice(h+1);if(l=l.replace(D,i).replace(D,r).replace(N,n.pctEncChar),"undefined"!=typeof o)try{d=t.iri?o.toUnicode(d):o.toASCII(n.unescapeComponent(d,t).toLowerCase())}catch(y){e.error=e.error||"Email address's domain name can not be converted to "+(t.iri?"Unicode":"ASCII")+" via punycode: "+y}else d=d.replace(D,i).toLowerCase().replace(D,r).replace(U,n.pctEncChar);u[c]=l+"@"+d}e.path=u.join(",")}var m=e.headers=e.headers||{};e.subject&&(m.subject=e.subject),e.body&&(m.body=e.body);var v=[];for(var g in m)m[g]!==a[g]&&v.push(g.replace(D,i).replace(D,r).replace(I,n.pctEncChar)+"="+m[g].replace(D,i).replace(D,r).replace(F,n.pctEncChar));return v.length&&(e.query=v.join("&")),e}}}()},{"../punycode":12,"../uri":17}],16:[function(e,t,r){if("undefined"==typeof COMPILED&&"undefined"==typeof n&&"function"==typeof e)var n=e("../uri");!function(){var e=n.pctEncChar,t="(?:[0-9A-Za-z][0-9A-Za-z\\-]{1,31})",r="(?:\\%[0-9A-Fa-f]{2})",o="[0-9A-Za-z\\(\\)\\+\\,\\-\\.\\:\\=\\@\\;\\$\\_\\!\\*\\'\\/\\?\\#]",i="(?:(?:"+r+"|"+o+")+)",s=new RegExp("^urn\\:("+t+")$"),a=new RegExp("^("+t+")\\:("+i+")$"),u=/^([^\:]+)\:(.*)/,c=/[\x00-\x20\\\"\&\<\>\[\]\^\`\{\|\}\~\x7F-\xFF]/g,f=/^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;n.SCHEMES.urn={parse:function(e,t){var r,o,i=e.path.match(a);return i||(t.tolerant||(e.error=e.error||"URN is not strictly valid."),i=e.path.match(u)),i?(r="urn:"+i[1].toLowerCase(),o=n.SCHEMES[r],o||(o=n.SCHEMES[r]={parse:function(e,t){return e},serialize:n.SCHEMES.urn.serialize}),e.scheme=r,e.path=i[2],e=o.parse(e,t)):e.error=e.error||"URN can not be parsed.",e},serialize:function(t,r){var n,o=t.scheme||r.scheme;if(o&&"urn"!==o){var n=o.match(s);n||(n=["urn:"+o,o]),t.scheme="urn",t.path=n[1]+":"+(t.path?t.path.replace(c,e):"")}return t}},n.SCHEMES["urn:uuid"]={parse:function(e,t){return t.tolerant||e.path&&e.path.match(f)||(e.error=e.error||"UUID is not valid."),e},serialize:function(e,t){return t.tolerant||e.path&&e.path.match(f)?e.path=(e.path||"").toLowerCase():e.scheme=void 0,n.SCHEMES.urn.serialize(e,t)}}}()},{"../uri":17}],17:[function(e,t,r){var n=!1,o=!0,i=!0,s=function(){function e(){for(var e=[],t=0;t<arguments.length;t++)e[t-0]=arguments[t];if(e.length>1){e[0]=e[0].slice(0,-1);for(var r=e.length-1,n=1;r>n;++n)e[n]=e[n].slice(1,-1);return e[r]=e[r].slice(1),e.join("")}return e[0]}function t(e){return"(?:"+e+")"}function r(r){var n="[A-Za-z]",o="[0-9]",s=e(o,"[A-Fa-f]"),a=t(t("%[EFef]"+s+"%"+s+s+"%"+s+s)+"|"+t("%[89A-Fa-f]"+s+"%"+s+s)+"|"+t("%"+s+s)),u="[\\:\\/\\?\\#\\[\\]\\@]",c="[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]",f=e(u,c),p=r?"[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]":"[]",h=r?"[\\uE000-\\uF8FF]":"[]",l=e(n,o,"[\\-\\.\\_\\~]",p),d=t(n+e(n,o,"[\\+\\-\\.]")+"*"),y=t(t(a+"|"+e(l,c,"[\\:]"))+"*"),m=t(t("25[0-5]")+"|"+t("2[0-4]"+o)+"|"+t("1"+o+o)+"|"+t("[1-9]"+o)+"|"+o),v=t(m+"\\."+m+"\\."+m+"\\."+m),g=t(s+"{1,4}"),E=(t(t(g+"\\:"+g)+"|"+v),t(e(l,c,"[\\:]")+"+")),b=t("v"+s+"+\\."+e(l,c,"[\\:]")+"+"),w=t("\\["+t(E+"|"+b)+"\\]"),C=t(t(a+"|"+e(l,c))+"*"),x=t(w+"|"+v+"(?!"+C+")|"+C),_=t(o+"*"),T=t(t(y+"@")+"?"+x+t("\\:"+_)+"?"),O=t(a+"|"+e(l,c,"[\\:\\@]")),S=t(O+"*"),A=t(O+"+"),j=t(t(a+"|"+e(l,c,"[\\@]"))+"+"),P=t(t("\\/"+S)+"*"),R=t("\\/"+t(A+P)+"?"),D=t(j+P),N=t(A+P),U="(?!"+O+")",I=(t(P+"|"+R+"|"+D+"|"+N+"|"+U),t(t(O+"|"+e("[\\/\\?]",h))+"*")),F=t(t(O+"|[\\/\\?]")+"*"),q=t(t("\\/\\/"+T+P)+"|"+R+"|"+N+"|"+U),H=t(d+"\\:"+q+t("\\?"+I)+"?"+t("\\#"+F)+"?"),L=t(t("\\/\\/"+T+P)+"|"+R+"|"+D+"|"+U),k=t(L+t("\\?"+I)+"?"+t("\\#"+F)+"?"),M=(t(H+"|"+k),
t(d+"\\:"+q+t("\\?"+I)+"?"),"^("+d+")\\:"+t(t("\\/\\/("+t("("+y+")@")+"?("+x+")"+t("\\:("+_+")")+"?)")+"?("+P+"|"+R+"|"+N+"|"+U+")")+t("\\?("+I+")")+"?"+t("\\#("+F+")")+"?$"),z="^(){0}"+t(t("\\/\\/("+t("("+y+")@")+"?("+x+")"+t("\\:("+_+")")+"?)")+"?("+P+"|"+R+"|"+D+"|"+U+")")+t("\\?("+I+")")+"?"+t("\\#("+F+")")+"?$";"^("+d+")\\:"+t(t("\\/\\/("+t("("+y+")@")+"?("+x+")"+t("\\:("+_+")")+"?)")+"?("+P+"|"+R+"|"+N+"|"+U+")")+t("\\?("+I+")")+"?$","^"+t("\\#("+F+")")+"?$","^"+t("("+y+")@")+"?("+x+")"+t("\\:("+_+")")+"?$";return{URI_REF:i&&new RegExp("("+M+")|("+z+")"),NOT_SCHEME:new RegExp(e("[^]",n,o,"[\\+\\-\\.]"),"g"),NOT_USERINFO:new RegExp(e("[^\\%\\:]",l,c),"g"),NOT_HOST:new RegExp(e("[^\\%]",l,c),"g"),NOT_PATH:new RegExp(e("[^\\%\\/\\:\\@]",l,c),"g"),NOT_PATH_NOSCHEME:new RegExp(e("[^\\%\\/\\@]",l,c),"g"),NOT_QUERY:new RegExp(e("[^\\%]",l,c,"[\\:\\@\\/\\?]",h),"g"),NOT_FRAGMENT:new RegExp(e("[^\\%]",l,c,"[\\:\\@\\/\\?]"),"g"),ESCAPE:new RegExp(e("[^]",l,c),"g"),UNRESERVED:new RegExp(l,"g"),OTHER_CHARS:new RegExp(e("[^\\%]",l,f),"g"),PCT_ENCODED:new RegExp(a,"g")}}function n(e){var t,r=e.charCodeAt(0);return t=16>r?"%0"+r.toString(16).toUpperCase():128>r?"%"+r.toString(16).toUpperCase():2048>r?"%"+(r>>6|192).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase():"%"+(r>>12|224).toString(16).toUpperCase()+"%"+(r>>6&63|128).toString(16).toUpperCase()+"%"+(63&r|128).toString(16).toUpperCase()}function s(e){for(var t,r,n,o="",i=0,s=e.length;s>i;)t=parseInt(e.substr(i+1,2),16),128>t?(o+=String.fromCharCode(t),i+=3):t>=194&&224>t?(s-i>=6?(r=parseInt(e.substr(i+4,2),16),o+=String.fromCharCode((31&t)<<6|63&r)):o+=e.substr(i,6),i+=6):t>=224?(s-i>=9?(r=parseInt(e.substr(i+4,2),16),n=parseInt(e.substr(i+7,2),16),o+=String.fromCharCode((15&t)<<12|(63&r)<<6|63&n)):o+=e.substr(i,9),i+=9):(o+=e.substr(i,3),i+=3);return o}function u(e){return void 0===e?"undefined":null===e?"null":Object.prototype.toString.call(e).split(" ").pop().split("]").shift().toLowerCase()}function c(e){return e.toUpperCase()}function f(e,t){function r(e){var r=s(e);return r.match(t.UNRESERVED)?r:e}return e.scheme&&(e.scheme=String(e.scheme).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_SCHEME,"")),void 0!==e.userinfo&&(e.userinfo=String(e.userinfo).replace(t.PCT_ENCODED,r).replace(t.NOT_USERINFO,n).replace(t.PCT_ENCODED,c)),void 0!==e.host&&(e.host=String(e.host).replace(t.PCT_ENCODED,r).toLowerCase().replace(t.NOT_HOST,n).replace(t.PCT_ENCODED,c)),void 0!==e.path&&(e.path=String(e.path).replace(t.PCT_ENCODED,r).replace(e.scheme?t.NOT_PATH:t.NOT_PATH_NOSCHEME,n).replace(t.PCT_ENCODED,c)),void 0!==e.query&&(e.query=String(e.query).replace(t.PCT_ENCODED,r).replace(t.NOT_QUERY,n).replace(t.PCT_ENCODED,c)),void 0!==e.fragment&&(e.fragment=String(e.fragment).replace(t.PCT_ENCODED,r).replace(t.NOT_FRAGMENT,n).replace(t.PCT_ENCODED,c)),e}function p(e,t){void 0===t&&(t={});var r,n,u=o&&t.iri!==!1?C:w,c=!1,p={};if("suffix"===t.reference&&(e=(t.scheme?t.scheme+":":"")+"//"+e),i?(r=e.match(u.URI_REF),r&&(r=r[1]?r.slice(1,10):r.slice(10,19)),r||(c=!0,t.tolerant||(p.error=p.error||"URI is not strictly valid."),r=e.match(x))):r=e.match(x),r){if(A?(p.scheme=r[1],p.userinfo=r[3],p.host=r[4],p.port=parseInt(r[5],10),p.path=r[6]||"",p.query=r[7],p.fragment=r[8],isNaN(p.port)&&(p.port=r[5])):(p.scheme=r[1]||void 0,p.userinfo=-1!==e.indexOf("@")?r[3]:void 0,p.host=-1!==e.indexOf("//")?r[4]:void 0,p.port=parseInt(r[5],10),p.path=r[6]||"",p.query=-1!==e.indexOf("?")?r[7]:void 0,p.fragment=-1!==e.indexOf("#")?r[8]:void 0,isNaN(p.port)&&(p.port=e.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/)?r[4]:void 0)),void 0!==p.scheme||void 0!==p.userinfo||void 0!==p.host||void 0!==p.port||p.path||void 0!==p.query?void 0===p.scheme?p.reference="relative":void 0===p.fragment?p.reference="absolute":p.reference="uri":p.reference="same-document",t.reference&&"suffix"!==t.reference&&t.reference!==p.reference&&(p.error=p.error||"URI is not a "+t.reference+" reference."),n=j[(t.scheme||p.scheme||"").toLowerCase()],!o||"undefined"==typeof a||t.unicodeSupport||n&&n.unicodeSupport)f(p,u);else{if(p.host&&(t.domainHost||n&&n.domainHost))try{p.host=a.toASCII(p.host.replace(u.PCT_ENCODED,s).toLowerCase())}catch(h){p.error=p.error||"Host's domain name can not be converted to ASCII via punycode: "+h}f(p,w)}n&&n.parse&&n.parse(p,t)}else c=!0,p.error=p.error||"URI can not be parsed.";return p}function h(e,t){var r=[];return void 0!==e.userinfo&&(r.push(e.userinfo),r.push("@")),void 0!==e.host&&r.push(e.host),"number"==typeof e.port&&(r.push(":"),r.push(e.port.toString(10))),r.length?r.join(""):void 0}function l(e){for(var t,r=[];e.length;)e.match(_)?e=e.replace(_,""):e.match(T)?e=e.replace(T,"/"):e.match(O)?(e=e.replace(O,"/"),r.pop()):"."===e||".."===e?e="":(t=e.match(S)[0],e=e.slice(t.length),r.push(t));return r.join("")}function d(e,t){void 0===t&&(t={});var r,n,i,u=o&&t.iri?C:w,c=[];if(r=j[(t.scheme||e.scheme||"").toLowerCase()],r&&r.serialize&&r.serialize(e,t),o&&"undefined"!=typeof a&&e.host&&(t.domainHost||r&&r.domainHost))try{e.host=t.iri?a.toUnicode(e.host):a.toASCII(e.host.replace(u.PCT_ENCODED,s).toLowerCase())}catch(p){e.error=e.error||"Host's domain name can not be converted to "+(t.iri?"Unicode":"ASCII")+" via punycode: "+p}return f(e,u),"suffix"!==t.reference&&e.scheme&&(c.push(e.scheme),c.push(":")),n=h(e,t),void 0!==n&&("suffix"!==t.reference&&c.push("//"),c.push(n),e.path&&"/"!==e.path.charAt(0)&&c.push("/")),void 0!==e.path&&(i=e.path,t.absolutePath||r&&r.absolutePath||(i=l(i)),void 0===n&&(i=i.replace(/^\/\//,"/%2F")),c.push(i)),void 0!==e.query&&(c.push("?"),c.push(e.query)),void 0!==e.fragment&&(c.push("#"),c.push(e.fragment)),c.join("")}function y(e,t,r,n){void 0===r&&(r={});var o={};return n||(e=p(d(e,r),r),t=p(d(t,r),r)),r=r||{},!r.tolerant&&t.scheme?(o.scheme=t.scheme,o.userinfo=t.userinfo,o.host=t.host,o.port=t.port,o.path=l(t.path),o.query=t.query):(void 0!==t.userinfo||void 0!==t.host||void 0!==t.port?(o.userinfo=t.userinfo,o.host=t.host,o.port=t.port,o.path=l(t.path),o.query=t.query):(t.path?("/"===t.path.charAt(0)?o.path=l(t.path):(void 0===e.userinfo&&void 0===e.host&&void 0===e.port||e.path?e.path?o.path=e.path.slice(0,e.path.lastIndexOf("/")+1)+t.path:o.path=t.path:o.path="/"+t.path,o.path=l(o.path)),o.query=t.query):(o.path=e.path,void 0!==t.query?o.query=t.query:o.query=e.query),o.userinfo=e.userinfo,o.host=e.host,o.port=e.port),o.scheme=e.scheme),o.fragment=t.fragment,o}function m(e,t,r){return d(y(p(e,r),p(t,r),r,!0),r)}function v(e,t){return"string"==typeof e?e=d(p(e,t),t):"object"===u(e)&&(e=p(d(e,t),t)),e}function g(e,t,r){return"string"==typeof e?e=d(p(e,r),r):"object"===u(e)&&(e=d(e,r)),"string"==typeof t?t=d(p(t,r),r):"object"===u(t)&&(t=d(t,r)),e===t}function E(e,t){return e&&e.toString().replace(o&&t&&t.iri?C.ESCAPE:w.ESCAPE,n)}function b(e,t){return e&&e.toString().replace(o&&t&&t.iri?C.PCT_ENCODED:w.PCT_ENCODED,s)}var w=r(!1),C=o?r(!0):void 0,x=/^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?([^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n)*))?/i,_=/^\.\.?\//,T=/^\/\.(\/|$)/,O=/^\/\.\.(\/|$)/,S=/^\/?(?:.|\n)*?(?=\/|$)/,A=void 0==="".match(/(){0}/)[1],j={};return{IRI_SUPPORT:o,VALIDATE_SUPPORT:i,pctEncChar:n,pctDecChars:s,SCHEMES:j,parse:p,_recomposeAuthority:h,removeDotSegments:l,serialize:d,resolveComponents:y,resolve:m,normalize:v,equal:g,escapeComponent:E,unescapeComponent:b}}();if(!n&&"undefined"!=typeof t&&"function"==typeof e){var a=e("./punycode");t.exports=s,e("./schemes")}},{"./punycode":12,"./schemes":13}]},{},[1])(1)});