
# pirpleDebug
This contains some test code for the pirple course source code debugging issue

I have tried using the official Visual Studio code debugging tutorial found at this [link](https://code.visualstudio.com/docs/nodejs/nodejs-debugging?fbclid=IwAR0yA1hIiYAyWurJBLVTvrBjzQxeV9CU6VY4jOqDjvO6tcMMAm_FTSphsJ0), with no positive result so far.

I also have tried using the Node debugger included with Google Chrome, also without any positive result.

###The error which I am trying to debug is this one:
```javascript
C:\Users\Ovidiu\Desktop\pirple\index.js:81
        chosenHandler(data, function (statusCode, payload) {
        ^

TypeError: chosenHandler is not a function
    at IncomingMessage.<anonymous> (C:\Users\Ovidiu\Desktop\pirple\index.js:81:9)
    at IncomingMessage.emit (events.js:182:13)
    at endReadableNT (_stream_readable.js:1081:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

## Usage
Since this can be run for 2 environments (staging and production), here are the necessary commands for Windows (Powershell).
For staging, and production:

```javascript
 $env:NODE_ENV = "staging"; node index.js
```

```javascript
 $env:NODE_ENV = "production"; node index.js
```
On Linux, these should work without any issues:


```javascript
NODE_ENV = "staging" node index.js
```

```javascript
NODE_ENV = "production" node index.js
