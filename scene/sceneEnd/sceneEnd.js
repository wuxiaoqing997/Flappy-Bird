class SceneEnd extends mainScene {
	constructor(game) {
			super(game)
			var bk = GuaImage.new(game, 'bk')
			this.addElement(bk)
			var end = GuaImage.new(game, 'end')
			end.x = 50
			end.y = 160
			this.addElement(end)
			game.registerAction('r', function() {
				var s = SceneTitle.new(game)
				game.replaceScene(s)
			})
			this.skipCount = 
			this.grounds = []
			for (var i = 0; i < 20; i++) {
				var g = GuaImage.new(game, 'ground')
				g.x = i * 19
				g.y = 510
				this.addElement(g)
				this.grounds.push(g)
			}
		}
		//draw() {}
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