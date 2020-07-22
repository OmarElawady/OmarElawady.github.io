# Lifecycle hooks

Lifecycle hooks is specified in the component class and is called at mounting, hydrating and field updates. Mount hook is called the first time the component is loaded. Hydrate is called each time the component is rerendered including the first time. Field updated have two types, _updated\_field_ and _updating\_field_ with the later being called before the field is updated and it returns a boolean indicating whether the update should be performed.

Example:

```python
class UserComponent(Component):
  first_name = "omar"
  mounting_state = ""
  hydrated = False
  field_update_message = ""
  
  def mount(self):
    self.mounting_state = "Mounted"
  
  def hydrate(self):
    self.hydrated = True
  
  def updating_first_name(self, field, value):
    if first_name == "satan":
      self.field_update_message = "No devils allowed here!"
      return False
    else:
      return True
    
  def updated_first_name(self, field, value):
    if first_name == "satan":
      self.field_update_message = "Hello satan :)"
    else:
      self.field_update_message = "Hello normal user"
    
```