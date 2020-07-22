# Component classes

The function init_pylivewire in `pylivewire.init_pylivewire(app, "todo")` is used to initialize the pylivewire extension by passing it the app along with the flask app name. This line does a couple of things. It searches for components in the subdirectory pylivewire/comps. The component classes resides in this subdirectory and its name is the name of its class. It gets discovered by pylivewire by checking whether it inherits from Component class.

## Views

Each component mmust be associated with a view in the templates directory. The render method must call self.render_template(view_name) to render the html of the component. Additional arguments can be provided just like jinja's render_template method.

Minimal Example:


```python
from pylivewire import Component # assume this's included in all subsequent examples.

class UserComponent(Component):

  def render(self): # assume that this method is provided as this when ommited.
    return self.render_template("user_view.html")

```

## Fields


The component fields are any property found under self. You can specify the default value for fields by declaring them as class properties. They are copied for each component, so you don't need to worry about references. The fields data are passed to the client unencrypted, so care must be taken not to expose sensitive information in it. They are accessible by default inside the html view directly using their name, you can override a name by passing it as a named argument to self.render_template method.

Example:

```python
class UserComponent(Component):
  # default values for the fields
  username = ""
  password = ""
  is_admin = false
  friends = ["khaled"]
  
  def render(self):
    self.friends_count = len(friends) # adding fields dynamically at any point is also allowed
    return self.render_template("user_view.html")
```
