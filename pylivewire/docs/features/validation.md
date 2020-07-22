# Validation

The component objects inherits the method validate which is just a wrapper around cerberus. When a validation is violated the whole execution stops and the component is rendered. A dict mapping fields to list of errors encountered is provieded to the view to facilitate printing error messages.

Example:

```python
def fancy_validate_pass(field, password, error):
    l = len(password)
    if l < 4:
        error(field, f"The password must be larger than 4, {l} is not.")

class UserComponent(Component):
    username=""
    password=""

    def save(self): # lifecycle hook for password update
        self.validate({"password": {"check_with": fancy_validate_password, "maxlength": 50}})
```

```html
<div>
    <input type="text" wire:model="username" />
    <input type="text" wire:model="password" />
    <button wire:click="save">save</button>
    {% if 'toadd' in errors %}
    <span style='color:red;font-size:13;'>* {{errors['password'][0]}}</span>
    {% endif %}
<div>
```