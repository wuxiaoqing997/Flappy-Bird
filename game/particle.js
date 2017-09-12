class Particle extends GuaImage {
    constructor(game) {
        super(game, 'boom')
        this.setup()
    }
    setup() {
        this.life = 30
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += this.vx * factor
        this.vy += this.vy * factor

    }
}

class ParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 20
        this.x = 150
        this.y = 200
        this.numberOfParticle = 10
        this.particles = []
    }
    update() {
        this.duration--

            // log('this.particles', this.particles)
            if (this.particles.length < this.numberOfParticle) {
                var p = Particle.new(this.game)
                var s = 5
                var vx = randomBetween(-s, s)
                var vy = randomBetween(-s, s)
                p.init(this.x, this.y, vx, vy)
                this.particles.push(p)
            }
        for (var p of this.particles) {
            p.update()
        }

        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            return
        }
        // log('draw', this.particles)
        for (var p of this.particles) {
            p.draw()
        }
    }
}