var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
            var k = event.key
            if (k == 'p') {
                // 暂停功能
                window.paused = !window.paused
            } 
        })
}

var __main = function() {

    var images = {
        bk: 'img/bg_day.png',
        ground: 'img/ground.png',
        b1: 'img/bird0_0.png',
        b2: 'img/bird0_1.png',
        b3: 'img/bird0_2.png',

        bb1: 'img/bird1_0.png',
        bb2: 'img/bird1_1.png',
        bb3: 'img/bird1_2.png',

        pipe: 'img/pipe_up.png',
        begin:'img/button_play.png',
        end: 'img/text_game_over.png',
        title: 'img/title.png',
        tip:'img/tutorial.png',
    }

    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        log('begin')
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()