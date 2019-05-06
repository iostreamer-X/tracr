![](/tracr.png)

<br>
A javascript library to monitor changes done to your objects! ⚡


Why?
---

On one of those days, when you called a function with some parameters, and that function
called another function, which in turn called an internal library function, and when you checked back your parameters,
somehow they changed. Well, this nifty little tool is for those days.
When you aren't in the mood for checking every single line while in debugging mode, looking for clues.

How?
---

This library depends on [stack-trace](https://www.npmjs.com/package/stack-trace) for capturing context.
For logging purposes it relies on JavaScript proxies.

```
                               getTracr
                         +-------------------+
                         |                   |
                         |                   |
Original Object          |                   |              Proxified Object
   +------+              |                   |                +------+
   |      |              |                   |                |      |
   |      +-------------->                   +--------------->+      |
   |      |              |                   |                |      |
   +------+              |                   |                +------+
                         |                   |
                         |                   |
                         +-------------------+



```

<br>

- `getTracr` takes your object as an argument and returns a decorated version of your object
- Everything inside your object will be converted into a proxy.
    - Your object is traversed, if a key is found whose value is an object, then that object is replaced with a proxy
- If new keys are added after creating the decorated object, those will be tracked too.

**Role of proxies**:
- tracr proxies capture the following operations
    - set a key
    - delete a key
- Whenever aforementioned events occur, suitable actions are taken, like:
    - log the event
    - push to a changeLog

Example:
---

![](/carbon.svg)


Output:
---

![](/result.png)

<br>
<br>

Installation
---

`npm install --save object-event-tracr`

<br>

Documentation:
---

- `getTracr` takes two arguments
    - your original object
    - config object
        - Following configuration is supported
            - traceNewKeys(`true`)
                - You can turn it off so that new keys aren't tracked
            - logGetCalls(`false`)
                - To log which keys have been accessed and where
            - maintainChangeLog(`false`)
                - You can turn it on to get structured response in an array
            - log(`true`)
                - Turn it off to disable logging to console
            - changeLog(`[]`)
                - Pass your array here and when done you'd have the change log stored in this array


Contribution:
---

Feel free to point out issues and submit PRs if you can.