
class SceneTitle extends mainScene {
    constructor(game) {
        super(game)
            /* var label = Label.new(game, 'hello')
             this.addElement(label) */

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

        this.skipCount = 4

        var title = GuaImage.new(game, 'title')
        title.x = 50
        title.y = 160
        this.addElement(title)

        var tip = GuaImage.new(game, 'tip')
        tip.x = 78
        tip.y = 238
        this.addElement(tip)

        var begin = GuaImage.new(game, 'begin')
        begin.x = 78
        begin.y = 350
        this.addElement(begin)

        game.registerAction('r', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })
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

    }

}