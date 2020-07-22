
# Dirty state

Same as loading state with the following differences. It's activated when a data element is wired to the backend and not yet synced with the backend. This might happen because of _lazy_ modifier or debouncing. _target_ specifies the model to listen on. Otherwise, the element acts as a global listener for any wired element update.

Example:

```html
<input type="text" wire:model.lazy="first_name" />
<input type="text" wire:model.debounce.1000="last_name" />
<div wire:dirty>loading</div> <!-- shown when either inputs is not in sync -->
<div wire:target="first_name" wire:loading.remove>Loaded</div> <!-- hidden when only first_name is not in sync -->
```