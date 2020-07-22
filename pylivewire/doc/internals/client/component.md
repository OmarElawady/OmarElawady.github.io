# Component Object

All elements inside the component is associated with a WiredElement object. This object declares the necessary data and adds event listeners based on wire: attributes.

The component have access to three important global objects: eventDispatcher, componentRegistry, and taskScheduler. It uses the component registry to add or remove components as it encounters them during rerendering. The event dispatcher is used to fire events specified in the response from the server. The task scheduler is used to keep track of tasks associated with each component and executes them synchronously, the components performs all requests by adding tasks to the task scheduler.

The component object represents the link between the wired element inside it and the server. All requests are passed to the task scheduler through it.

It also provides method to allow wired elements to keep track of state changes. Namely, loading state and dirty state can be listened on. The wired element registers two handlers to be called when a specific model (component field) is being loaded and when it finishes loading. Same applies for dirty state to watch unsynced data.