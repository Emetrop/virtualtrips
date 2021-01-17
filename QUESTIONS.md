# Questions

Q1: Explain the output of the following code and why

```js
    setTimeout(function() {
      console.log("1");
    }, 100);
    console.log("2");
```

A1: It outputs 2 and after 1 because body of setTimeout is run after 100ms.

Q2: Explain the output of the following code and why

```js
    function foo(d) {
      if(d < 10) {
        foo(d+1);
      }
      console.log(d);
    }
    foo(0);
```

A2: It outputs numbers from 10 to 0 because first is recursively called same function for all number up to number 10, when 10 finally skips the condition and calls console.log as first one - function is executed and now it's turn for parent function (with param 9) to finilize executaion etc

Q3: If nothing is provided to `foo` we want the default response to be `5`. Explain the potential issue with the following code:

```js
    function foo(d) {
      d = d || 5;
      console.log(d);
    }
```

A3: Firstly we should never mutate function params as they supposed to be just read-only - if we want to manipulate with params we should copy it first to local variables. Secondly probably it should assign value 5 when param is not passed to function at all, but 5 would be assigned even if value `0` would be passed.

Q4: Explain the output of the following code and why

```js
    function foo(a) {
      return function(b) {
        return a + b;
      }
    }
    var bar = foo(1);
    console.log(bar(2))
```

A4: It's an example of High Order Function. It's something like a function factory. First we precreate the bar function with param 1 and after we provide second b param to the inner function which is executed and counts 1+2=3. We can call the bar function with other numbers and it always be 1+passed param.

Q5: Explain how the following function would be used

```js
    function double(a, done) {
      setTimeout(function() {
        done(a * 2);
      }, 100);
    }
```

A5: The done param supposed to be a function, which would be called after 100ms and as first param to the done function would be passed doubled arg a.

```js
    double(1, console.log);
```

It would print number 2 to console after 100ms.
