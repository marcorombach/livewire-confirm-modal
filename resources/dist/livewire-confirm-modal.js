document.addEventListener("alpine:init",()=>{Alpine.store("confirmModal",{show:!1,title:"default",description:"default",toggle(){this.show=!this.show},hide(){this.show=!1},present(){this.show=!0},setTitle(e){this.title=e},setDescription(e){this.description=e}})});function p(e){const s=/,(?![^'"]*['"])/g;let n=e,t=[];return n=e.split("(")[0],t=e.split("(")[1].split(")")[0].split(s),t=t.map(l=>l.replace(/^['"]|['"]$/g,"").trim()),{method:n,params:t}}Livewire.directive("confirm-modal",({el:e,directive:s,component:n,cleanup:t})=>{let r=s.expression,l=r.split("|")[0],a=r.split("|")[1];const d=()=>new Promise((i,o)=>{document.getElementById("lvcm-ok-btn").addEventListener("click",function(){Alpine.store("confirmModal").hide(),i(!0)}),document.getElementById("lvcm-cancel-btn").addEventListener("click",function(){Alpine.store("confirmModal").hide(),i(!1)})});let c=async i=>{if(i.preventDefault(),i.stopImmediatePropagation(),Alpine.store("confirmModal").setTitle(l),Alpine.store("confirmModal").setDescription(a),Alpine.store("confirmModal").present(),await d()){let o=p(e.getAttribute("wire:click"));console.log(o),n.$wire[o.method](...o.params)}};e.addEventListener("click",c,{capture:!0}),t(()=>{e.removeEventListener("click",c)})});
//# sourceMappingURL=livewire-confirm-modal.js.map
