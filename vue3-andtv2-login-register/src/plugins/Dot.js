(function (window, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    window.Dot = factory()
  }
}(typeof window !== 'undefined' ? window : this, function () {
  return function (selector, userOptions) {
    const options = {
      cW: 1367,
      cH: 500,
      numDot: 100,
      radDot: 15,
      isRangeRad: true,
      dotColor: '#FFFFFF',
      isLine: true,
      lineDist: 75,
      lineColor: '#FFFFFF',
      bounce: 1,
      opacity: 0.5,
      isTouch: false,
      vxRange: 2,
      vyRange: 2,
      isWallCollisionTest: true,
      isBallCollisionTest: true
    }
    const oDots = []
    let canvas = null
    let ctx = null
    let oDotA = null
    let oDotB = null
    let W = null
    let H = null
    const mergeOptions = function (userOptions, options) {
      Object.keys(userOptions).forEach(function (key) {
        options[key] = userOptions[key]
      })
    }
    const colorToRGB = function (color, alpha) {
      if (typeof color === 'string' && color[0] === '#') {
        color = window.parseInt(color.slice(1), 16)
      }
      alpha = (alpha === undefined) ? 1 : alpha
      const r = color >> 16 & 255
      const g = color >> 8 & 255
      const b = color >> 4 & 255
      const a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha)
      if (a === 1) {
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      } else {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
      }
    }
    /* var captureMouse = function (element) {
      var mouse = {
        x: 0,
        y: 0
      }
      element.addEventListener('mousemove', function (event) {
        var x, y
        if (event.pageX || event.pageY) {
          x = event.pageX
          y = event.pageY
        } else {
          x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
          y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        x -= element.offsetLeft
        y -= element.offsetTop
        mouse.x = x
        mouse.y = y
      }, false)
      return mouse
    } */
    const ran = function (min, max) {
      const val = max - min
      return parseInt((Math.random() * val + min).toFixed(2))
    }
    const Practice = function (color, radius, alpha) {
      this.x = 0
      this.y = 0
      this.vx = 0
      this.vy = 0
      this.radius = radius
      this.rotation = 0
      this.mass = 1
      this.scaleX = 1
      this.scaleY = 1
      this.name = ''
      this.color = colorToRGB(color, alpha)
    }
    Practice.prototype.draw = function (ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      ctx.scale(this.scaleX, this.scaleY)
      ctx.fillStyle = this.color
      ctx.strokeStyle = this.color
      ctx.beginPath()
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
    const makeDots = function () {
      for (let i = 0; i < options.numDot; i++) {
        if (options.isRangeRad) {
          options.radDot = Math.floor(ran(2, options.radDot))
        }
        const oDot = new Practice(options.dotColor, options.radDot, options.opacity)
        oDot.x = ran(0, W)
        oDot.y = ran(0, H)
        oDot.vx = Math.random() * (options.vxRange) - options.vxRange / 2
        oDot.vy = Math.random() * (options.vyRange) - options.vyRange / 2
        oDots.push(oDot)
      }
    }
    const draw = function (oDot) {
      oDot.draw(ctx)
    }
    const checkWall = function (oDot) {
      if (options.isWallCollisionTest) {
        if (oDot.x + oDot.radius > W) {
          oDot.x = W - oDot.radius
          oDot.vx *= -(options.bounce)
        } else {
          if (oDot.x - oDot.radius < 0) {
            oDot.x = oDot.radius
            oDot.vx *= -(options.bounce)
          }
        }
        if (oDot.y + oDot.radius > H) {
          oDot.y = H - oDot.radius
          oDot.vy *= -(options.bounce)
        } else {
          if (oDot.y - oDot.radius < 0) {
            oDot.y = oDot.radius
            oDot.vy *= -(options.bounce)
          }
        }
      } else {
        if (oDot.x - oDot.radius > W) {
          oDot.x = 0
        } else {
          if (oDot.x + oDot.radius < 0) {
            oDot.x = W
          }
        }
        if (oDot.y - oDot.radius > H) {
          oDot.y = 0
        } else {
          if (oDot.y + oDot.radius < 0) {
            oDot.y = H
          }
        }
      }
    }
    const move = function (oDot) {
      oDot.x += oDot.vx
      oDot.y += oDot.vy
      checkWall(oDot)
    }
    const rotate = function (x, y, sin, cos, reverse) {
      return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
      }
    }
    const checkCollision = function (oDot0, oDot1) {
      const dx = oDot1.x - oDot0.x
      const dy = oDot1.y - oDot0.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < oDot0.radius + oDot1.radius) {
        const angle = Math.atan2(dy, dx)
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        const pos0 = {
          x: 0,
          y: 0
        }
        const pos1 = rotate(dx, dy, sin, cos, true)
        const vel0 = rotate(oDot0.vx, oDot0.vy, sin, cos, true)
        const vel1 = rotate(oDot1.vx, oDot1.vy, sin, cos, true)
        const vxTotal = vel0.x - vel1.x
        vel0.x = ((oDot0.mass - oDot1.mass) * vel0.x + 2 * oDot1.mass * vel1.x) / (oDot0.mass + oDot1.mass)
        vel1.x = vxTotal + vel0.x
        const absV = Math.abs(vel0.x) + Math.abs(vel1.x)
        const overlap = (oDot0.radius + oDot1.radius) - Math.abs(pos0.x - pos1.x)
        pos0.x += vel0.x / absV * overlap
        pos1.x += vel1.x / absV * overlap
        const pos0F = rotate(pos0.x, pos0.y, sin, cos, false)
        const pos1F = rotate(pos1.x, pos1.y, sin, cos, false)
        oDot1.x = oDot0.x + pos1F.x
        oDot1.y = oDot0.y + pos1F.y
        oDot0.x = oDot0.x + pos0F.x
        oDot0.y = oDot0.y + pos0F.y
        const vel0F = rotate(vel0.x, vel0.y, sin, cos, false)
        const vel1F = rotate(vel1.x, vel1.y, sin, cos, false)
        oDot0.vx = vel0F.x
        oDot0.vy = vel0F.y
        oDot1.vx = vel1F.x
        oDot1.vy = vel1F.y
      }
    }
    const drawLine = function (oDot0, oDot1) {
      const dx = oDot1.x - oDot0.x
      const dy = oDot1.y - oDot0.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < options.lineDist) {
        ctx.save()
        ctx.strokeStyle = colorToRGB(options.lineColor, (options.opacity - 0.4) <= 0 ? 0.1 : options.opacity - 0.4)
        ctx.beginPath()
        ctx.moveTo(oDot0.x, oDot0.y)
        ctx.lineTo(oDot1.x, oDot1.y)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }
    }
    const execute = function () {
      oDots.forEach(move)
      for (let i = 0; i < options.numDot - 1; i++) {
        oDotA = oDots[i]
        for (let j = i + 1; j < options.numDot; j++) {
          oDotB = oDots[j]
          options.isBallCollisionTest && checkCollision(oDotA, oDotB)
          options.isLine && drawLine(oDotA, oDotB)
        }
      }
      oDots.forEach(draw)
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (window.webkitRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      })
    }
    const initDot = function (selector, userOptions) {
      mergeOptions(userOptions, options)
      canvas = document.getElementById(selector)
      // noinspection JSUnresolvedFunction
      ctx = canvas.getContext('2d')
      W = options.cW
      H = options.cH
      canvas.width = W
      canvas.height = H
      makeDots();
      (function drawFrame () {
        window.requestAnimationFrame(drawFrame)
        ctx.clearRect(0, 0, W, H)
        execute()
      }())
    }
    initDot(selector, userOptions)
  }
}))
