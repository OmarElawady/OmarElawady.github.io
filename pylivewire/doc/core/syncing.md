# Syncing

This page talks about the interaction between the server and the client.

When the page is loaded all included components are rendered and passed to it the initial data specified by the server. The roots of the component are annotated with a univerally unique identifier inside the property "wire:id" (Done by default). "wire:key" on the other hand is used to keep track of the rendered child components, so they must be unique within the component they are included in.

## Wire qualified attributes

These attributes has the special form "wire:_name_\[mods\] \[=value\]". After the name modifiers can be added alter the behaviour of the element. Modifiers are in the form "._modname_._itsvalue_", multiple mods can be specified. The modifiers are predefined and their type is either integer, string, or booleans. Booleans have no value portion, their presence indicates their truth.

## Wiring properties

Input fields can be attached to a backend property by adding `wire:mode="prop"` property to the input. When this is provided, any input done on this element is passed to the backend to update the corresponding property and optionally do other processing.

Example:

```html
<input type="text" wire:model="username" />
```

### Debouncing

To avoid bogging the server with unnecessary requests for frequently modified elements such as text fields, debouncing is a a modifier that can be added with a specified interval to wait before sending request in case it modified again within this interval.

Example:

```html
<input type="text" wire:model.debounce.3000="username">
```

### Lazy updates

Lazy updating is used to sync only when the user unfocuses the element.


Example:

```html
<input type="text" wire:model.lazy="username">
```
