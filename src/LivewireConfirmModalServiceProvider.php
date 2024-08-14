<?php

namespace Marcorombach\LivewireConfirmModal;

use Composer\InstalledVersions;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Blade;
use Livewire\Drawer\Utils;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LivewireConfirmModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('livewire-confirm-modal')
            ->hasConfigFile()
            ->hasViews();
    }

    public function packageBooted(): void
    {
        Route::get('_filepond/scripts', function () {
            return Utils::pretendResponseIsFile(__DIR__.'/../resources/dist/livewire-confirm-modal.js');
        })->name('livewire-filepond.scripts');


        Blade::directive('livewireConfirmModal', function () {

            $version = InstalledVersions::getPrettyVersion('marcorombach/livewire-confirm-modal');

            $scripts = [];

            $fullScriptPath = route('livewire-filepond.scripts');

            if (is_file(__DIR__.'/../resources/hot')) {
                $url = rtrim(file_get_contents(__DIR__.'/../resources/hot'));

                $scripts[] = sprintf('<script type="module" src="%s" defer data-navigate-track></script>', "{$url}/resources/js/livewire-confirm-modal.js");
                $scripts[] = sprintf('<script type="module" src="%s" defer data-navigate-track></script>', "{$url}/@vite/client");
            } else {
                $scripts[] = <<<HTML
                    <script type="module" src="{$fullScriptPath}?v={$version}" data-navigate-once defer data-navigate-track></script>
                HTML;
            }

            return implode("\n", $scripts);
        });
    }
}
