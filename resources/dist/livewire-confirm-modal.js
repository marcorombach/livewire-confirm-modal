document.addEventListener("alpine:init",()=>{Alpine.store("confirmModal",{show:!1,title:"default",toggle(){this.show=!this.show,console.log("Show? "+this.show)},setTitle(e){this.title=e,console.log("Title? "+this.title)}})});Livewire.directive("confirm-modal",({el:e,directive:l,component:n,cleanup:i})=>{l.expression,console.log(e),console.log(l),console.log(n);const c=()=>new Promise((o,s)=>{document.getElementById("lvcm-ok").addEventListener("click",function(){Alpine.store("confirmModal").toggle(),console.log("ok onclick"),o(!0)}),document.getElementById("lvcm-cancel").addEventListener("click",function(){Alpine.store("confirmModal").toggle(),console.log("cancel onclick"),o(!1)})});let t=async o=>{Alpine.store("confirmModal").setTitle("Test"),Alpine.store("confirmModal").toggle(),await c()?console.log("ok"):(console.log("cancel"),o.preventDefault(),o.stopImmediatePropagation())};e.addEventListener("click",t,{capture:!0}),i(()=>{e.removeEventListener("click",t)})});
//# sourceMappingURL=livewire-confirm-modal.js.map
