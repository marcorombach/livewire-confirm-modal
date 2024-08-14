Livewire.directive("confirm-modal",({el:e,directive:n,component:c,cleanup:o})=>{let r=n.expression,t=i=>{confirm(r)||(i.preventDefault(),i.stopImmediatePropagation())};e.addEventListener("click",t,{capture:!0}),o(()=>{e.removeEventListener("click",t)})});
//# sourceMappingURL=livewire-confirm-modal.js.map
