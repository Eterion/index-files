"use strict";exports.__esModule=!0;var Core,Contents,Module,Options,core_js_1=require("core-js"),crypto=require("crypto"),fs=require("fs"),glob=require("glob"),path=require("path");function esmIndex(e,s){return void 0===e&&(e="./**"),void 0===s&&(s={}),new core_js_1.Promise(function(t,o){Core.read(e).then(function(e){var n=e.map(function(r){return new core_js_1.Promise(function(i,n){Core.write(r,s).then(function(e){var n=e.code,t=e.message,o=e.options;i({code:n,message:t,options:o,rc:r})}).catch(function(e){n(e)})})});core_js_1.Promise.all(n).then(function(e){t(e)}).catch(function(e){o(e)})})})}!function(e){e.read=function(i){return new core_js_1.Promise(function(t,o){var e=".esm-indexrc.json";glob(i.replace(new RegExp("/"+e+"$"),"")+"/"+e,function(e,n){e&&(console.log("Failed to read "+i+" pattern."),o(e)),t(n)})})},e.write=function(a,e){return new core_js_1.Promise(function(s,c){Options.read(a,e).then(function(n){Module.list(a,n).then(function(e){var t=path.join(path.dirname(a),n.fileName+"."+n.fileExtension),o=path.resolve(t),i=Contents.create(e),r={rc:a,options:n};e.length?fs.access(t,fs.constants.R_OK,function(e){e?fs.writeFile(t,i,function(e){e&&(console.log("Cannot write "+o+" file."),c(e)),s(core_js_1.Object.assign({},r,{code:"add",message:'[32m> Created "'+o+'"[0m'}))}):fs.readFile(t,"utf8",function(e,n){e&&(console.log("Cannot read "+o+" file."),c(e)),Contents.compare(i,n)?fs.writeFile(t,i,function(e){e&&(console.log("Cannot write "+o+" file."),c(e)),s(core_js_1.Object.assign({},r,{code:"update",message:'[33m> Updated "'+o+'"[0m'}))}):s(core_js_1.Object.assign({},r,{code:"no-change",message:'> No changes in "'+o+'"'}))})}):fs.access(t,function(e){e||fs.unlink(t,function(e){e&&(console.log("Cannot unlink "+o+" file."),c(e)),s(core_js_1.Object.assign({},r,{code:"remove",message:'[31m> Removed "'+o+'"[0m'}))})})}).catch(function(e){console.log("Failed to read list of modules."),c(e)})}).catch(function(e){console.log("Failed to read "+a+" file."),c(e)})})}}(Core||(Core={})),function(e){function t(e){return crypto.createHash("md5").update(e.split("\r\n").map(function(e){return/^\/\//.test(e)?"":e}).join()).digest("hex")}e.compare=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return n.slice(1).map(function(e){return t(n[0])==t(e)}).includes(!1)},e.create=function(e,n){void 0===n&&(n=""),n=e.reduce(function(e,n){return e+(n.isIndex?"import * as "+Module.name(n.path)+" from './"+n.path+"';\r\n":"export { default as "+Module.name(n.path)+" } from './"+n.path+"';\r\n")},n);var t=e.filter(function(e){return!0===e.isIndex});return t.length&&(n+="export { "+t.map(function(e){return Module.name(e.path)}).join(", ")+" };\r\n"),n}}(Contents||(Contents={})),function(c){var a,e;c.name=function(e){var n="a-zA-Z0-9";return e.replace(new RegExp("^[^"+n+"]+"),"").replace(new RegExp("[^"+n+"]+$"),"").replace(new RegExp("[^"+n+"]+(["+n+"])","g"),function(e,n){return n.toUpperCase()})},c.list=function(e,s){return new core_js_1.Promise(function(o,i){var r=path.dirname(e);fs.readdir(r,function(e,n){e&&(console.log("Cannot read "+r+" folder."),i(e));var t=n.map(function(i){return new core_js_1.Promise(function(t,o){fs.stat(path.join(r,i),function(e,n){e&&(console.log("Cannot read "+i+" file."),o(e)),n.isDirectory()?a.asDirectory(path.join(r,i),s).then(function(e){t(e)}).catch(function(e){o(e)}):a.asFile(i,s).then(function(e){t(e)}).catch(function(e){o(e)})})})});core_js_1.Promise.all(t).then(function(e){var n=e.filter(function(e){return null!==e});o(n.sort(function(e,n){return e.isIndex?-1:n.isIndex?1:c.name(e.path)<c.name(n.path)?-1:c.name(e.path)>c.name(n.path)?1:0}))}).catch(function(e){console.log("Failed to read files."),i(e)})})})},(e=a||(a={})).asDirectory=function(i,n){return new core_js_1.Promise(function(t,o){n.recursiveSearch?Core.read(i).then(function(e){e.length?Options.read(e[0],n).then(function(n){c.list(e[0],core_js_1.Object.assign({},n)).then(function(e){e.length?t({isIndex:!0,path:path.basename(i,"."+n.fileExtension)+(n.fileName!=Options.defaults.fileName?"/"+n.fileName+(n.fileExtensionInPath?"."+n.fileExtension:""):"")}):t(null)}).catch(function(e){o(e)})}).catch(function(e){o(e)}):t(null)}).catch(function(e){o(e)}):t(null)})},e.asFile=function(n,t){return core_js_1.Promise.resolve([/\.d\.ts$/,new RegExp("\\.(?:spec|test)\\."+t.fileExtension),new RegExp("^"+t.fileName+"\\."+t.fileExtension)].concat(t.ignoreFiles?t.ignoreFiles.map(function(e){return new RegExp(/^\//.test(e)?e.substring(1,e.length-1):"^"+path.basename(e,"."+t.fileExtension)+"\\."+t.fileExtension)}):[]).map(function(e){return!new RegExp("\\."+t.fileExtension+"$").test(n)||e.test(n)}).includes(!0)?null:{isIndex:!1,path:t.fileExtensionInPath?n:path.basename(n,"."+t.fileExtension)})}}(Module||(Module={})),function(s){s.defaults={fileExtension:"js",fileExtensionInPath:!1,fileName:"index",ignoreFiles:[],recursiveSearch:!0},s.read=function(i,r){return void 0===r&&(r={}),new core_js_1.Promise(function(t,o){fs.readFile(i,"utf8",function(e,n){e&&(console.log("Cannot read "+i+" file."),o(e)),r=core_js_1.Object.keys(r).filter(function(e){return void 0!==r[e]}).reduce(function(e,n){return e[n]=r[n],e},{}),t(core_js_1.Object.assign({},s.defaults,r,JSON.parse(n||"{}")))})})}}(Options||(Options={})),exports.default=esmIndex;