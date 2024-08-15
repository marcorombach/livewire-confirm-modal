# Livewire Confirm-Modal

[![Latest Version on Packagist](https://img.shields.io/packagist/v/marcorombach/livewire-confirm-modal.svg?style=flat-square)](https://packagist.org/packages/marcorombach/livewire-confirm-modal)
[![Total Downloads](https://img.shields.io/packagist/dt/marcorombach/livewire-confirm-modal.svg?style=flat-square)](https://packagist.org/packages/marcorombach/livewire-confirm-modal)

This is a simple package aiming to provide a Livewire directive like ``wire:confirm`` but without using the default javascript ``confirm()`` function.
This is useful if you need the same style for the confirm box across different browser.
It's also possible to apply your own style by changing the view.

By default this package uses TailwindCSS to style the modal. The look of the modal was inspired by the fantastic components of [Pines UI](https://devdojo.com/pines).

![alt text](https://github.com/marcorombach/livewire-confirm-modal/blob/main/demo.png?raw=true)

## Installation

You can install the package via composer:

```bash
composer require marcorombach/livewire-confirm-modal
```

You need to add the following to your ```tailwind.config.js```

```javascript
"./vendor/marcorombach/livewire-confirm-modal/resources/views/components/*.php"
```
It should look something like this:

```javascript
content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    ...
    "./vendor/marcorombach/livewire-confirm-modal/resources/views/components/*.php",
],
```

Optionally, you can publish the view using

```bash
php artisan vendor:publish --tag="livewire-confirm-modal-views"
```

You should be careful changing the view, especially when touching alpine directives.

## Usage

```html
<button wire:confirm-modal="title|description" wire:click="doSomething(1,2)">
    Test
</button>
```
Replace ``title`` and ``description`` with what you want the confirm modal to display.
Now a modal is shown everytime the button is clicked. It will prevent ``wire:click`` from executing until the continue button in the modal is clicked.

## Credits

- [Marco Rombach](https://github.com/marcorombach)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
