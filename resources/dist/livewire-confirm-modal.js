document.addEventListener("alpine:init",()=>{Alpine.store("confirmModal",{show:!1,title:"default",toggle(){this.show=!this.show},setTitle(e){this.title=e}})});Livewire.directive("confirm-modal",({el:e,directive:o,component:r,cleanup:n})=>{let l=o.expression,t=i=>{Alpine.store("confirmModal").setTitle("Test"),Alpine.store("confirmModal").toggle(),confirm(l)||(i.preventDefault(),i.stopImmediatePropagation())};e.addEventListener("click",t,{capture:!0}),n(()=>{e.removeEventListener("click",t)})});
//# sourceMappingURL=livewire-confirm-modal.js.map
