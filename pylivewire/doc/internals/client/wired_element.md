# WiredElement

Each element inside a component is associated with an object of this type. This object iterates through the element attributes and registers the appropriate listeners.

For example, when it sees wire:model attributes it registers a change listener on this listener that requests the component object to update the value of the specified model.