# Pylivewire

git clone repo

cd pylivewire

virtualenv venv

source ./venv/bin/activate

pip install -r requirements.txt

cd todo-on-steroids

PYTHONPATH="$PYTHONPATH:/repo/location/" FLASK_APP=todo flask run

goto localhost:5000


## Docs

### Components:

The whole project revolves around the idea of a component. The component is a python object of a class that inherits the Component class.

Example:

```python
from pylivewire import Component # assume this's included in all subsequent examples.

class UserComponent(Component):

  def render(self): # assume that this method is provided as this when ommited.
    return self.render_template("user_view.html")

```


#### Fields:

The component fields are any property found under self. You can specify the default value for fields by declaring them as class properties. They are copied for each component, so you don't need to worry about references.

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

#### Pylivewire events:

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

#### Lifecycle hooks:

Lifecycle hooks is specified in the component class and is called at mounting, hydrating or field updates. Mount hook is called the first time the component is loaded. Hydrate is called each time the component is rerendered including the first time. Field updated have two types, _updated\_field_ and _updating\_field_ with the later being called before the field is updated and it returns a boolean indicating whether the update should be performed.

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

#### Rendering:

Each component must provide a mehtod called `render` that returns a string that will represent it in the html page. This string can't be arbitrary since there're some annotations that must be added to it to allow the working of pylivewire.

The `render` method must call `self.render_template("comp_view.html")` (note: not the same as jinja's render_template). This mehtod annotates the root element with the appropriate properties.

The view of the component is declared in the app's templates directory as a normal jinja template. It must consist only of a single root element.

The view has access by default to the component fields and a special object `errors` to facilitate access to validation errors (more on that later). Also you can provide additional variables just like any other jinja template.

#### Nesting elements and components' interaction:

The component's root element must have "wire:id" property that is unique across the whole page, it's set by default by pylivewire so the user doesn't need to worry about it.

The components can be nested, but each component is responsible only for its rendereding and its data.

When the page is loaded or a new child component is added, the parent renders it and initializes a new component object. For subsequent renderings of the parent component, the child component is ignored. Therefore, to rerender an component a request must come out of it (whether it's a syncing, method call, or event request).

The component keeps track of its rendered child using their "wire:key" property. This property must be unique inside the component (not necessarily unique across its descendents). It's set by default based on its line number in the template but can be overriden by the user. That's why when there's a possibility of multiple elements being rendered on the same position (in the template), for example in a for loop or a multi stage form, a unique key must be provided to distinguish it.

When anything interesting happens in a component (later on what's interesting), a request is sent to the server with the appropriate payload. The server processes the request and reponds with the data along with some other meta data used to update the component.

### Browser events:

To add a new event on an element (e.g. click or mouseover) you can add a property wire:_eventname_. The value of this property should be a call to a method.

You can also add modifiers to alter the behaviour of the event handler. The _prevent_ modifier prevent the propagation of the event to the element's parent. The _self_ modifier fires makes the event fire only when the target of the event is the element that contains this property. When dealing with keyboard events, it's sometimes convenient to filter the event to only a specific key press. You can do this by adding _enter_ modifier to fire only when the user presses enter, another keyboard event filters are _escape_ and _arrow-right_, others to be added later. You can add multiple modifiers by stacking them like wire:keydown.enter.prevent.self

Example:

```html
<input type="text" wire:keydown.enter="sayHi">
<input type="text" wire:click.self.prevent="sayHello">
```
### State aware elements:

You can show/hide or toggle classes and attributes when the state of the component changes. Currently there're three types of states that the element can listen on.

#### Loading state:

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

#### Dirty state:

Same as loading state with the following differences. It's activated when a data element is wired to the backend and not yet synced with the backend. This might happen because of _lazy_ modifier or debouncing. _target_ specifies the model to listen on. Otherwise, the element acts as a global listener for any wired element update.

Example:

```html
<input type="text" wire:model.lazy="first_name" />
<input type="text" wire:model.debounce.1000="last_name" />
<div wire:dirty>loading</div> <!-- shown when either inputs is not in sync -->
<div wire:target="first_name" wire:loading.remove>Loaded</div> <!-- hidden when only first_name is not in sync -->
```

#### Offline state:

Activated when the page is no longer connected to the internet.

Example:

```html
<div wire:offline>
  You are now offline!
</div>
```

### Defer loading:

This allows the execution of a method after the all the components is loaded. It can only be added to the root of the component.

Example:

```html
<div wire:init="loadPosts">
<!-- bunch of other stuff -->
</div>
```

### File uploads:

You can wire an input of type file to a property and it gets updated with a file object when the component is loaded on the server. You can read it, save it, or validate it.

### Prefetching:

Prefetching extracts the new data of the component aimed at being viewed when the user clicks on an input and caches it. If the user actually clicks the input. If he doesn't, it gets invalidated with the newest request is sent from the componnet.

Example:

```html
<input wire:click.prefetch="toggleUserList" />
```
### Turbolinks:

You can do nothing here. This is just to say that pylivewire is turbolink-friendly.

### Interaction between client and server:

Currently, there're three interesting actions that triggers a request from a component:

1. A wired element is changed, a syncing payload is sent to the server with the updated value.

2. A method is called as a result of an event (e.g. click, mouseover, ...), a method payload is sent with its arguments.

3. An event is fired that the component listens on, an event firing payload is sent with the arguemnts specified by the event emmiter.

The only method to pass data between components is events.

It would be interesting to know how to implement an appropriate concurrency control method to be both simple to use and provide high concurrency level. Currently, the requests for the same component are synchronous and is asynchronous otherwire. It's useful to note that any component action is done by sending a request to the server from the clientt. So firing events from the backend using `self.emit("event_name")` registers this event to be fired when the response payload is received. This means that the side effects of the events are not immediately seen by the components but rather it must take a round trip first. This might produce unexpected behaviour for something like this:

```python
class UserComponent(Component):
  listeners=["change_user_type"]
  username=""
  password=""
  is_admin=False
  
  def chane_user_type(self, user_type):
    self.is_admin = user_type

  def render(self):
    self.is_admin = True
    self.emit("change_user_type", False)
    print(self.is_admin) # prints True as the emit call just registers the event to be fired later
    return self.render_template("user_view.html")
```

#### Request payload:

The request payload is a json object consisting of the following fields:

1. name: The name of the class of the component.
2. oldData: The values of the component's current data fields.
3. type: The type of the payload. One of: updateData, callMethod, fireEvent.
4. rendered_children: List of the keys of the direct children rendered components (Those are not rerendered).
5. json: The actual data of the payload. Depends on the type.

##### json payload information:

updateData: {

  field_name: field_value

}

callMethod: {

  methodName: method_name,

  args: [] // list of args, not implemented!

}

fireEvent: {

  event: event_name,

  args = []

}

##### Response payload:

A JSON object consisting of the following fields:

1. dom: The new dom generated by the component.

2. dispatchEvents: A list of events to be dispatched.

3. newData: The new fields' data of the component.

4. name: The component class name.

5. rendered_children: List of rendered child components.

6. redirect: If not empty the link to follow.

7. dirtyInputs: The diff between old and new data. (Why not in the frontend?)


