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

function parseMethod(rawMethod){
    const regex = /,(?=[^()]*\))/g
    let method = rawMethod
    let params = []
    method = rawMethod.split('(')[0];
    let paramString = rawMethod.split('(')[1].split(')')[0];

    params = paramString.split(regex);

    return { method: method, params: params }
}


Livewire.directive('confirm-modal', ({ el, directive, component, cleanup }) => {
    let content =  directive.expression

    // The "directive" object gives you access to the parsed directive.
    // For example, here are its values for: wire:click.prevent="deletePost(1)"
    //
    // directive.raw = wire:click.prevent
    // directive.value = "click"
    // directive.modifiers = ['prevent']
    // directive.expression = "deletePost(1)"

    console.log(el);
    console.log(el.getAttribute('wire:click'));
    console.log(parseMethod(el.getAttribute('wire:click')))
    console.log(component);

    const newConfirm = () => {
        return new Promise((complete, failed)=>{

            document.getElementById("lvcm-ok").addEventListener("click", function(){
                Alpine.store('confirmModal').toggle();
                console.log('ok onclick');
                complete(true);
            });

            document.getElementById("lvcm-cancel").addEventListener("click", function(){
                Alpine.store('confirmModal').toggle();
                console.log('cancel onclick');
                complete(false);
            });

        });
    }

    let onClick = async e => {
        e.preventDefault()
        e.stopImmediatePropagation()

        Alpine.store('confirmModal').setTitle('Test');
        Alpine.store('confirmModal').toggle();

        if (!await newConfirm()) {
            console.log('cancel');

        }else{
            console.log('ok');
            let methodObject = parseMethod(el.getAttribute('wire:click'));
            console.log(methodObject);
            component.$wire[methodObject.method](methodObject.params);
        }
    }

    el.addEventListener('click', onClick, { capture: true })

    cleanup(() => {
        el.removeEventListener('click', onClick)
    })
})
