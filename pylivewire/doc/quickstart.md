# Quick start

There's a minimal flask app in the directory minimal in the [repo](https://github.com/OmarElawady/pylivewire/tree/development). First create a directory named with the application name, in this example `app`, and make a `__init__.py` file. The `__init__.py` is a normal flask app with the following two additional lines to use pylivewire.

`import pylivewire`

and

`pylivewire.init_pylivewire(app, "app")`

The init_pylivewire takes the flask app object and its name as arguments.

These four lines should be included in the html template page to load the necessary scripts.

```html
<script src="https://rawcdn.githack.com/OmarElawady/pylivewire/37d7abb4bfab9d84513fe971587910cabd1f24a9/scripts/morphdom-esm.js"></script>
<script src="https://rawcdn.githack.com/OmarElawady/pylivewire/37d7abb4bfab9d84513fe971587910cabd1f24a9/scripts/morphdom-umd.js"></script>
<script type="module" src="https://rawcdn.githack.com/OmarElawady/pylivewire/37d7abb4bfab9d84513fe971587910cabd1f24a9/scripts/pylivewire.js" defer></script>
{{ pylivewire.scripts()|safe }}
```

To load a component in the page, this directive is used:

`{{ pylivewirecaller('HelloWorld')|safe}}`

pylivewire expects a class named `HelloWorld` to be present in a python file in the path `{app_directory}/pylivewire/comps` that inherits from `pylivewire.Component`.

The component has a single property named `message` and one method to render its view. The view associated with it is a html file in the templates directory named `hello_world_view.html`.

To run this minimal example, execute this command starting from the repo root directory:

```bash
cd minimal
PYTHONPATH="$PYTHONPATH:{repo_root_directory}" FLASK_APP=app flask run
```