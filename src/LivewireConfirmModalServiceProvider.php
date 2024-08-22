<?php

namespace Marcorombach\LivewireConfirmModal;

use Composer\InstalledVersions;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Livewire\Drawer\Utils;
use Marcorombach\LivewireConfirmModal\Components\Modal;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class LivewireConfirmModalServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('livewire-confirm-modal')
            ->hasViewComponents('livewire-confirm', Modal::class)
            ->hasAssets()
            ->hasTranslations()
            ->hasConfigFile()
            ->hasViews();
    }


    public function packageBooted(): void
    {

        Blade::directive('livewireConfirmModal', function () {
            $js =  file_get_contents(__DIR__.'/../resources/dist/livewire-confirm-modal.js');

            return <<<HTML
                <script type="module" data-navigate-once defer data-navigate-track>$js</script>
            HTML;
        });
    }
}
