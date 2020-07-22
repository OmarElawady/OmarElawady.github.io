
# Loading state

This state is activated only when the client is making a request to the server. You can show or hide an element when the loading state is activated. You can also toggle classes or attributes. Due to being updated using js, the dom updates to state aware elements is ignored. A target may also be specified to listen only on loading for specific model syncs or method calls using wire:target property. Multiple targets can be specifed by separating them with commas.

Example:

```html
<input type="text" wire:model="first_name" />
<button wire:click="sayHi('qwre')">say hi</button> 
<div wire:loading>loading</div> <!-- shown when loading -->
<div wire:loading.remove>Loaded</div> <!-- hidden when loading -->
<div wire:target="first_name" wire:loading.class.add="bg-gray">loading</div><!-- class bg-gray is added when syncing first_name -->
<div class="bg-gray" wire:loading.class.remove="bg-gray">loading</div><!-- class bg-gray is removed when loading -->
<div wire:target="sayHi('qwre')" wire:loading.attr.add="style='color:black'">loading</div><!-- Adding attribute on requests that calls the specified event -->
<div class="bg-gray" wire:loading.attr.remove="style">loading</div><!-- removing attribute -->
```
