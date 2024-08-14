<?php

namespace Marcorombach\LivewireConfirmModal;

use Composer\InstalledVersions;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Blade;
use Livewire\Drawer\Utils;
use Livewire\Livewire;
use Marcorombach\LivewireConfirmModal\Components\Modal;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LivewireConfirmModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('livewire-confirm-modal')
            ->hasAssets()
            ->hasConfigFile()
            ->hasViews();
    }


    public function packageBooted(): void
    {
        Route::get('_livewire-confirm-modal/scripts', function () {
            return Utils::pretendResponseIsFile(__DIR__.'/../resources/dist/livewire-confirm-modal.js');
        })->name('livewire-confirm-modal.scripts');

        Livewire::component('livewire-confirm-modal', Modal::class);

        Blade::directive('livewireConfirmModal', function () {

            $version = InstalledVersions::getPrettyVersion('marcorombach/livewire-confirm-modal');

            $content = [];

            $content[] = <<<Blade
                <x-livewire-confirm-modal></x-livewire-confirm-modal>
                <x-livewire-confirm-modal:livewire-confirm-modal></x-livewire-confirm-modal:livewire-confirm-modal>
            Blade;


            $fullScriptPath = route('livewire-confirm-modal.scripts');

            if (is_file(__DIR__.'/../resources/hot')) {
                $url = rtrim(file_get_contents(__DIR__.'/../resources/hot'));

                $content[] = sprintf('<script type="module" src="%s" defer data-navigate-track></script>', "{$url}/resources/js/livewire-confirm-modal.js");
                $content[] = sprintf('<script type="module" src="%s" defer data-navigate-track></script>', "{$url}/@vite/client");
            } else {
                $content[] = <<<HTML
                    <script type="module" src="{$fullScriptPath}?v={$version}" data-navigate-once defer data-navigate-track></script>
                HTML;
            }

            return implode("\n", $content);
        });
    }
}
