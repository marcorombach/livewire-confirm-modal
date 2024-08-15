document.addEventListener('alpine:init', () => {
    Alpine.store('confirmModal', {
        show: false,
        title: 'default',
        description: 'default',

        toggle(){
            this.show = !this.show;
        },

        hide(){
            this.show = false;
        },

        present(){
            this.show = true;
        },

        setTitle(title) {
            this.title = title
        },

        setDescription(description) {
            this.description = description
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

    params = params.map(str => str.replace(/^['"]|['"]$/g, ''));

    return { method: method, params: params }
}


Livewire.directive('confirm-modal', ({ el, directive, component, cleanup }) => {
    let content =  directive.expression;

    let title = content.split('|')[0];
    let description = content.split('|')[1];

    console.log(el);
    console.log(el.getAttribute('wire:click'));
    console.log(parseMethod(el.getAttribute('wire:click')))
    console.log(component);

    const newConfirm = () => {
        return new Promise((complete, failed)=>{

            document.getElementById("lvcm-ok").addEventListener("click", function(){
                Alpine.store('confirmModal').hide();
                complete(true);
            });

            document.getElementById("lvcm-cancel").addEventListener("click", function(){
                Alpine.store('confirmModal').hide();
                complete(false);
            });

        });
    }

    let onClick = async e => {
        e.preventDefault()
        e.stopImmediatePropagation()

        Alpine.store('confirmModal').setTitle(title);
        Alpine.store('confirmModal').setDescription(description);
        Alpine.store('confirmModal').present();

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
