<?php

namespace Marcorombach\LivewireConfirmModal\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \Marcorombach\LivewireConfirmModal\LivewireConfirmModal
 */
class LivewireConfirmModal extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \Marcorombach\LivewireConfirmModal\LivewireConfirmModal::class;
    }
}
