# Pylivewire initialization

The init_pylivewire should be called from the app script to initialize the extension. First, all components inside _app\_name_/pylivewire/comps is scaned and added to a dict for future access. The components is any class defined inside this directory that inherits the Component class.

It also injects the variables `pylivewirecaller` and `pylivewire` into flask's template rendering engine.

Two entry points are added to the web app. The first is to handle requests from client's components. The second is for file uploads.

An extension is added to jinja. This extension modifies the calls to `pylivewirecaller` by adding a default key and a new argument representing the current component. The default key is wire:{line_number} where line number is the location of the call inside the view. The current component is used by `pylivewirecaller` method to keep track of rendered components inside each components. This way, it avoid rerendering nested components that was initialized before.