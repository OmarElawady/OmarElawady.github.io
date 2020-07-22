# Rendering components

When the `Component.render_template` is called, the call is forwarded to jinja's render_template after adding the following data to `**kwargs`:

1. The data fields under `self`.
2. the dict error that contains the validation errors encountered.
3. `obj` which points to self used by pylivewire to keep track of the component that rendered the template.