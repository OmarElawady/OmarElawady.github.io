
### Defer loading

This allows the execution of a method after the all the components is loaded. It can only be added to the root of the component.

Example:

```html
<div wire:init="loadPosts">
<!-- bunch of other stuff -->
</div>
```
