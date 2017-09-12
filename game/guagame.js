class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        var self = this

        window.addEventListener('keydown', function(event) {
            self.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = 'up'
        })
        this.init()

    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    update() {
            this.scene.update()
        }
        // draw
    draw() {
            this.scene.draw()
            // log('g.draw')
        }
        //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var self = this
        var actions = Object.keys(self.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            var state = self.keydowns[key]
            if (state == 'down') {
                // 如果按键被按下, 调用注册的 action
                self.actions[key]('down')
            }
            else if (state == 'up') {
                self.actions[key]('up')
                self.keydowns[key] = null
            }
        }
        // update
        self.update()
            // clear
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
            // draw
        self.draw()
            // next run loop
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps)
    }
    init() {
        var self = this
        var loads = []
            // 预先载入所有图片
        var names = Object.keys(self.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = self.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                self.images[name] = img
                    // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    log('load images', self.images)
                    self.__start()
                }
            }
        }
    }

    textureByName(name) {
        var img = this.images[name]
        return img
    }
    runWithScene(scene) {
        var self = this
        self.scene = scene
            // 开始运行程序
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }
}
