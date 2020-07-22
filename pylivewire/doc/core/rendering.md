# Rendering

Each component must provide a mehtod called `render` that returns a string that will represent it in the html page. This string can't be arbitrary since there're some annotations that must be added to it to allow the working of pylivewire.

The `render` method must call `self.render_template("comp_view.html")` (Note: not the same as jinja's render_template). This mehtod annotates the root element with the appropriate properties.

The view of the component is declared in the app's templates directory as a normal jinja template. It must consist only of a single root element.

The view has access by default to the component fields and a special object `errors` to facilitate access to validation errors (more on that later). Also you can provide additional variables just like any other jinja template.


To include a component in a template (or another view), a call to `pylivewirecaller` must be issued with the name of the component class as the first argument. Additional parameters override the default values or add new fields to the component object. Theses parameters are not directly accessible since they are provided to `__init__` function which shouldn't be overriden, but they can be accessed later under self.

A special arugment named _key_ can be provided to distinguish this component from others. It's set by default to "wire:{component_call_line_number}", so they are not necessary when no two components can be included in the same line. Other cases include including the components inside a loop.

Example:

```html
<html>
    <body>
        {{ pylivewirecaller("UserComponent", is_admin=False, key="123") }}
    </body>
</html>
```