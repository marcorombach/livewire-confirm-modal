<?php

namespace Marcorombach\LivewireConfirmModal\Components;

use Illuminate\View\Component;

class Modal extends Component
{
    public function __construct()
    {
    }

    public function render()
    {
        return view('livewire-confirm-modal::components.modal');
    }
}
