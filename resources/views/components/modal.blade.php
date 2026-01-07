@livewireConfirmModal

<div @keydown.escape.window="$store.confirmModal.hide()"
     class="relative z-50 w-auto h-auto"
     x-data >
    <template x-teleport="body">
        <div x-show="$store.confirmModal.show" class="fixed top-0 left-0 z-[99] flex items-center justify-center w-screen h-screen" x-cloak>
            <div x-show="$store.confirmModal.show"
                 x-transition:enter="ease-out duration-100"
                 x-transition:enter-start="opacity-0"
                 x-transition:enter-end="opacity-100"
                 x-transition:leave="ease-in duration-100"
                 x-transition:leave-start="opacity-100"
                 x-transition:leave-end="opacity-0"
                 @click="$store.confirmModal.hide()" class="absolute inset-0 w-full h-full bg-black/50"></div>
            <div x-show="$store.confirmModal.show"
                 x-trap.inert.noscroll="$store.confirmModal.show"
                 x-transition:enter="ease-out duration-100"
                 x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave="ease-in duration-100"
                 x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                 x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                 class="relative w-full text-gray-900 py-5 px-5 bg-white sm:max-w-lg sm:rounded-md">
                <div class="flex items-center justify-between pb-2">
                    <h3 class="text-lg font-semibold" x-text="$store.confirmModal.title"></h3>
                    <button @click="$store.confirmModal.hide()" class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-gray-800 rounded-full hover:text-gray-600 hover:bg-gray-50">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div class="relative w-auto">
                    <p x-text="$store.confirmModal.description"></p>
                </div>
                <div class="flex flex-col-reverse mt-2 sm:flex-row sm:justify-end sm:space-x-2">
                    <button id="lvcm-cancel-btn" type="button" class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-100 focus:ring-offset-2">
                        {{__('livewire-confirm-modal::confirm-modal.cancel')}}
                    </button>
                    <button id="lvcm-ok-btn" type="button" class="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 bg-neutral-950 hover:bg-neutral-900">
                        {{__('livewire-confirm-modal::confirm-modal.continue')}}
                    </button>
                </div>
            </div>
        </div>
    </template>
</div>

