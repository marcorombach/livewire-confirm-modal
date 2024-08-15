document.addEventListener('alpine:init', () => {
    Alpine.store('confirmModal', {
        show: false,
        title: 'default',

        toggle(){
            this.show = !this.show;
            console.log("Show? " + this.show);
        },

        setTitle(title) {
            this.title = title
            console.log("Title? " + this.title);
        }
    })
})


Livewire.directive('confirm-modal', ({ el, directive, component, cleanup }) => {
    let content =  directive.expression

    // The "directive" object gives you access to the parsed directive.
    // For example, here are its values for: wire:click.prevent="deletePost(1)"
    //
    // directive.raw = wire:click.prevent
    // directive.value = "click"
    // directive.modifiers = ['prevent']
    // directive.expression = "deletePost(1)"

    const newConfirm = () => {
        return new Promise((complete, failed)=>{

            document.getElementById("lvcm-ok").addEventListener("click", function(){
                Alpine.store('confirmModal').toggle();
                complete(true);
            });

            document.getElementById("lvcm-cancel").addEventListener("click", function(){
                Alpine.store('confirmModal').toggle();
                complete(false);
            });

        });
    }

    let onClick = e => {
        Alpine.store('confirmModal').setTitle('Test');
        Alpine.store('confirmModal').toggle();

        if (! newConfirm()) {
            e.preventDefault()
            e.stopImmediatePropagation()
        }
    }

    el.addEventListener('click', onClick, { capture: true })

    cleanup(() => {
        el.removeEventListener('click', onClick)
    })
})
