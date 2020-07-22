# Actions

Actions are method calles to be executed when the event is fired on the element.


To add a new event on an element (e.g. click or mouseover) you can add a property wire:_eventname_. The value of this property should be a call to a method.

You can also add modifiers to alter the behaviour of the event handler. The _prevent_ modifier prevent the propagation of the event to the element's parent. The _self_ modifier fires makes the event fire only when the target of the event is the element that contains this property. The _stop_ modifier is used to stop propagating the event. When dealing with keyboard events, it's sometimes convenient to filter the event to only a specific key press. You can do this by adding _enter_ modifier to fire only when the user presses enter, another keyboard event filters are _escape_ and _arrow-right_, others to be added later. You can add multiple modifiers by stacking them like wire:keydown.enter.prevent.self

Method calls that starts with $ are special methods provided by livewire for actions performed frequently. $set('prop', val) and $emit('event_name') are currently the implemented special methods.

### Prefetching:

Prefetching extracts the new data of the component aimed at being viewed when the user clicks on an input when he hovers over the element and caches it. If the user actually fires the event (Usually a click). If he doesn't, it gets invalidated with the newest request sent from the componnet.

Example:

```html
<input type="text" wire:keydown.enter="sayHi">
<input type="text" wire:click.self.prevent="sayHello">
<button wire:click.prefetch="toggleUserList" />
<button wire:click.self.prevent="$set('accepted_tos', true)">
```