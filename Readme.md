
# tween

  A tween engine is a generator which produces intermediate values (frames) between two points. The frames it generates are based on two variables. The time elapsed since the tween was created and an [easing](//github.com/component/ease) function which hopefully adds an interesting shape to the series of frames. Tween engines can be used to create animations.

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

    $ {package mananger} install jkroso/tween

then in your app:

```js
var tween = require('tween')
```

## Example

```js
var Tween = require('tween');
var raf = require('raf');
var button = document.querySelector('button');
var style = button.style;

var tween = Tween({ rotate: 0, opacity: 0 })
  .ease('out-bounce')
  .to({ rotate: 360, opacity: 1  })
  .duration(800);

function animate() {
  var frame = tween.next();
  style.opacity = frame.opacity;
  style.webkitTransform = 'rotate(' + frame.rotate + 'deg)';
  if (!tween.done) raf(animate);
}

animate();
```

## API

  - [Tween()](#tween)
  - [Tween.reset()](#tweenreset)
  - [Tween.to()](#tweentoobjobjectarray)
  - [Tween.duration()](#tweendurationmsnumber)
  - [Tween.ease()](#tweeneasefnstringfunction)
  - [Tween.next()](#tweennext)
  - [Tween.done](#tweendone)
  - [Tween.frame()](#tweenframepercentnumber)

### Tween(x:Object|Array|Number)

  Initialize a new `Tween` with `x`.

### Tween.reset()

  Reset the tween.

### Tween.to(obj:Object|Array)

  set target value. if `.to()` has been called before
  `_from` will be updated to the current frame

```js
 tween.to({ x: 50, y: 100 })
```

### Tween.duration(ms:Number)

  Set duration to `ms` [500].

### Tween.ease(fn:String|Function)

  Set easing function to `fn`.

```js
 tween.ease('in-out-sine')
```

### Tween.next()

  generate the next frame

### Tween.done

  `false` until the last frame is generated

### Tween.frame(percent:Number)

  generate a tween frame at point `p` between
  `this._from` and `this._to`
