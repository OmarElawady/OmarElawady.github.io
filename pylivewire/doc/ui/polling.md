# Polling

When the root of the component has the polling attribute, it gets refreshed at regular intervals. This might be useful in case you want to monitor changes done in the backend and notify other components to refresh or perform a specific action on update. The default interval of polling is 10 seconds.

Example:

```html
<div wire:polling.interval.5000>
    I get refreshed eveery 5 seconds.
</div>
```