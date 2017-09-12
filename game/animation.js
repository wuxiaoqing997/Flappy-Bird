class Animation {
    constructor(game) {
        this.game = game
        this.animations = {
            bird: [],
            blue: [],
        }
        for (var i = 1; i < 3; i++) {
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['bird'].push(t)
        }
        for (var i = 1; i < 3; i++) {
            var name = `bb${i}`
            var t = game.textureByName(name)
            this.animations['blue'].push(t)
        }
        this.setupInput()
        this.animationName = 'bird'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        this.flipx = false
        this.gy = 10
        this.vy = 0
        this.rotation = 0
        this.alpha = 1
    }
    static new(game) {
        return new this(game)
    }
    update() {
        this.y += this.vy
        this.vy += this.gy * 0.2
        this.frameCount--
            if (this.frameCount == 0) {
                this.frameCount = 3
                this.frameIndex = (this.frameIndex + 1) % this.frames().length
                this.texture = this.frames()[this.frameIndex]
            }
        var h = 477
        if (this.y > h) {
            this.y = h
            var s = SceneEnd.new(this.game)
            this.game.replaceScene(s)
        }

        if (this.rotation < 45) {
            this.rotation += 5
        }

        if (this.alpha > 0) {
            this.alpha -= 0.1
        }

    }
    jump() {
        this.vy = -5
        this.rotation = -45
    }
    frames() {
        return this.animations[this.animationName]
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
            //把坐标系的原点改到了物体的中心点上
        context.translate(this.x + w2, this.y + h2)
        if (this.flipx) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()

    }
    move(x, keystatus) {
        this.x += x
        this.flipx = (x < 0)
    }
    setupInput() {
        var g = this.game
        var s = this
        g.registerAction('k', function() {
            s.animationName == 'bird' ? s.animationName = 'blue' : s.animationName = 'bird'
            s.texture = s.frames()[0]
        })
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(img) {
        var a = this
        var b = img
        if (this.life === false || img.life === false) {
            // 检测是否死亡
        } else if (this.aInb(a.x, b.x, b.x + b.w) || this.aInb(b.x, a.x, a.x + a.w)) {
            if (this.aInb(a.y, b.y, b.y + b.h) || this.aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}