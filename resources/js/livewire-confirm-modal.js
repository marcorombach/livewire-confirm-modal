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

function parseMethod(element){
    let method = rawMethod
    let params = []
    const methodAndParamString = method.match(/(.*?)\((.*)\)/s)

    if (methodAndParamString) {
        method = methodAndParamString[1]

        // Use a function that returns it's arguments to parse and eval all params
        // This "$event" is for use inside the livewire event handler.
        let func = new Function('$event', `return (function () {
                for (var l=arguments.length, p=new Array(l), k=0; k<l; k++) {
                    p[k] = arguments[k];
                }
                return [].concat(p);
            })(${methodAndParamString[2]})`)

        params = func(this.eventContext)
    }

    return { method, params }
}

function getParams(element){

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
            debugger;
            component.$wire[el.getAttribute('wire:click')]();
            debugger;
        }
    }

    el.addEventListener('click', onClick, { capture: true })

    cleanup(() => {
        el.removeEventListener('click', onClick)
    })
})
