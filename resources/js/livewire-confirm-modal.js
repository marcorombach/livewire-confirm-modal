document.addEventListener('alpine:init', () => {
    Alpine.store('confirmModal', {
        show: false,
        title: 'default',
        description: 'default',

        hide(){
            this.show = false;
        },
        present(){
            this.show = true;
        },
        setTitle(title) {
            this.title = title;
        },
        setDescription(description) {
            this.description = description;
        }
    })
})

function parseMethod(rawMethod){
    const regex = /,(?![^'"]*['"])/g;
    let method = rawMethod.split('(')[0];
    let params = [];
    try {
        let paramString = rawMethod.split('(')[1].split(')')[0];
        params = paramString.split(regex);
    }catch (e) {
        params = [];
    }
    params = params.map(str => str.replace(/^['"]|['"]$/g, '').trim());

    return { method: method, params: params };
}

Livewire.directive('confirm-modal', ({ el, directive, component, cleanup }) => {
    let content =  directive.expression;

    let title = content.split('|')[0];
    let description = content.split('|')[1];

    const newConfirm = () => {
        return new Promise((complete)=>{
            document.getElementById("lvcm-ok-btn").addEventListener("click", function(){
                Alpine.store('confirmModal').hide();
                complete(true);
            });

            document.getElementById("lvcm-cancel-btn").addEventListener("click", function(){
                Alpine.store('confirmModal').hide();
                complete(false);
            });
        });
    }

    let onClick = async e => {
        e.preventDefault();
        e.stopImmediatePropagation();

        Alpine.store('confirmModal').setTitle(title);
        Alpine.store('confirmModal').setDescription(description);
        Alpine.store('confirmModal').present();

        if (await newConfirm()) {
            let methodObject = parseMethod(el.getAttribute('wire:click'));
            console.log(methodObject);
            component.$wire[methodObject.method](...methodObject.params);
        }
    }

    el.addEventListener('click', onClick, { capture: true });

    cleanup(() => {
        el.removeEventListener('click', onClick);
    })
})
