# Event dispatcher

The event dispatcher object keeps track of the evenets that each copmonent type listens on. Then, it forwards the events to the appropriate components whenever an event is fired. It provides a method for a component to regiter/unregister itself. The event firing is done through this object only, so when a wired element requests to fire events, it asks its component to do so which in turn passes this event to the event dispatcher.

Currently, the events are not fired on the document or the window, so there's no way for external js scripts to listen on them.