
# Events

The compoent specefies the events it listens on by declaring a class property `listeners`. Currently, the listeners is the same for the objects of the same component and it can't be changed.

Firing events is done using methods. The first is to call `$emit('event_name', ..args)` in the frontend. The second is to call `self.emit("event_name", *args)` in the component object at the backend.

Example:

```python
class UserComponent(Component):
  is_admin = False
  listeners = ["change_user_type"]

  def change_user_type(self, user_type): # False for normal, True for admin
    self.is_admin = True
```

```html
<button wire:click="$emit('change_user_type', true)">promote</button>
```