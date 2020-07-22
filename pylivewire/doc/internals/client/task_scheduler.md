# Task scheduler

This object keeps a list of the tasks for each component and executes them synchronously. The tasks for different copmonents are executed asynchronously. When it receives a task from a component, it appends it to the list of pending requests. When it's on top of the list, the component is asked to perform this task and provides it with a callback to be called when this task is done. This callback simply removes this task and serves the next if one exists.

Currently, it performs no error handling, so when a task fails or doesn't call the callback, the next tasks won't be executed.