class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.distance = 200
        this.colums = 3
        for (var i = 0; i < 3; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 200 + i * this.distance
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipePosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)

        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipePosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        for (var p of this.pipes) {
            p.x -= 5
            if (p.x < -100) {
                p.x += this.distance * this.colums
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
                //把坐标系的原点改到了物体的中心点上
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1

            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}
class Scene extends mainScene {
    constructor(game) {
        super(game)


        var bk = GuaImage.new(game, 'bk')
        this.addElement(bk)

        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 510
            this.addElement(g)
            this.grounds.push(g)
        }

        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        this.skipCount = 4
        var b = Animation.new(game)
        b.x = 20
        b.y = 320
        this.player = b
        this.addElement(b)
        this.setupInputs()

        this.end = false

    }
    update() {
        super.update()
            //地面移动
        this.skipCount--
            var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        var self = this
        var pipeList = this.pipe.pipes
        for (var i = 0; i < pipeList.length; i++) {
            var pipe = pipeList[i]
            if (this.player.collide(pipe)) {
                this.end = true
            }
        }
        if (this.end ) {
            var s = SceneEnd.new(self.game)
            self.game.replaceScene(s)
        }

    }
    setupInputs() {
        var b = this.player
        this.game.registerAction('a', function(keystatus) {
            b.move(-10, keystatus)
        })
        this.game.registerAction('d', function(keystatus) {
            b.move(10, keystatus)
        })
        this.game.registerAction('j', function() {
            b.jump()
        })
    }
}