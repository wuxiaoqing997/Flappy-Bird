class mainScene {
	constructor(game) {
		this.game = game
		this.elements = []
		this.debugModelEnabled = true
	}
	static new(game) {
		var i = new this(game)
		return i
	}
	addElement(img) {
		img.scene = this
		this.elements.push(img)
		// log('add elements', this.elements)
	}
	draw() {
		for (var i = 0; i < this.elements.length; i++) {
			var e = this.elements[i]
			// this.game.drawImage(e)
			// log('e', e)
			e.draw()
		}
	}
	update() {
		for (var i = 0; i < this.elements.length; i++) {
			var e = this.elements[i]
			e.update()
		}
	}
}
