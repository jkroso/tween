
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
  .to({ rotate: 360, opacity: 1  })
  .ease('out-bounce')
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

### Tween(from, to)

  Tweening base class

### Tween#reset()

  Reset the tweens timer and state. Call this before
  calling `.next()` for the first time.

```js
this.reset()
while (!this.done) this.next()
```

### Tween#to(val)

  retarget the tween towards `val`. `this.from`
  will be set to the tweens current value unless
  `this._to` is currently `null`. Calls `reset()`
  internally

```js
tween.to({ x: 50, y: 100 })
```

### Tween#from(val)

  set the base value to `val`

### Tween#duration(ms)

  Set duration to `ms` [500].

### Tween#ease(fn:String|Function)

  Set easing function to `fn`.

```js
tween.ease('in-out-sine')
```

### Tween#next()

  generate the next frame

### Tween#frame(percent)

  generate a tween frame at point `p` between
  `this._from` and `this._to`. To be defined in
  sub-classes

```js
tween(1, 3).frame(.5) // => 2
```