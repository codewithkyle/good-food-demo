(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Env_1=__webpack_require__(1),uuid=__webpack_require__(5),device_manager_1=__webpack_require__(8),Application=function(){function Application(){new device_manager_1.default(Env_1.Env.isDebug,!0),document.documentElement.classList.remove("dom-is-loading")}return Application.mountModules=function(){Array.from(document.body.querySelectorAll("[data-module]:not([data-uuid])")).forEach(function(requestedModule){var moduleIndex=requestedModule.dataset.module;Application.createModule(moduleIndex,requestedModule)}),Application.manageLazyParents()},Application.manageLazyParents=function(){Application.modules.forEach(function(module){module.futureParent&&(module.parent=Application.getModuleByUUID(module.futureParent.getAttribute("data-uuid")),module.parent&&(module.futureParent=null,module.parent.register(module)))})},Application.createModule=function(index,view){var newModule=null;try{var id=uuid();(newModule=new modules[index].prototype.constructor(view,id)).mount()}catch(e){void 0!==modules[index]&&console.error("Failed to create module",e)}return newModule&&(Application.modules.push(newModule),newModule.afterMount()),newModule},Application.destroyModule=function(uuid){var _this=this;uuid?this.modules.forEach(function(module){if(module.uuid===uuid){var index=_this.modules.indexOf(module);module.beforeDestroy(),module.destroy(),_this.modules.splice(index,1)}}):console.warn("No UUID provided")},Application.getModuleByUUID=function(uuid){if(!uuid)return console.warn("No UUID provided"),null;var returnModule=null;return this.modules.forEach(function(module){module.uuid===uuid&&(returnModule=module)}),returnModule},Application.modules=[],Application}();exports.Application=Application,new Application,Application.mountModules()},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Env=function(){function Env(){window.location.hostname.match(/.local/)?Env.setDebug(!0):null!==document.documentElement.getAttribute("debug")&&Env.setDebug(!0)}return Env.setDebug=function(status){Env.isDebug=status},Env.isDebug=!0,Env}();exports.Env=Env,new Env},,,function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Application_1=__webpack_require__(0),Module=function(){function Module(view,uuid){this.view=view,this.uuid=uuid,this.parent=null,this.submodules=[],this.futureParent=null}return Module.prototype.register=function(submodule){this.submodules.push(submodule)},Module.prototype.mount=function(){this.view.dataset.uuid=this.uuid;var parent=this.view.closest('[data-module]:not([data-uuid="'+this.uuid+'"])');parent&&(this.parent=Application_1.Application.getModuleByUUID(parent.getAttribute("data-uuid")),this.parent?this.parent.register(this):this.futureParent=parent)},Module.prototype.afterMount=function(){},Module.prototype.seppuku=function(){Application_1.Application.destroyModule(this.uuid)},Module.prototype.beforeDestroy=function(){},Module.prototype.destroy=function(){if(this.submodules.length)for(var i=this.submodules.length-1;i>=0;i--)Application_1.Application.destroyModule(this.submodules[i].uuid);this.view.remove()},Module}();exports.Module=Module}]]);