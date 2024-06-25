var rush = rush || {};

rush.DissCoin = (function() {
    function DissCoin() {
        this.initialize();
    }
    var p = DissCoin.prototype = new rush.GameObject();

    // instance variables
    p.category = 'DissCoin';

    p.width = 16;
    p.height = 16;

    // put registration point to the bottom center.
    p.regX = p.width / 2;
    p.regY = p.height;

    p.GameObject_initialize = p.initialize;
    p.initialize = function() {
        this.GameObject_initialize();

        // copy from zoe exported coin.json file.
        var explosionSpritesheetData = {
            "images": ["images/coin.png"],
            "frames": [
                [112, 0, 16, 16, 0, 0, 0], [128, 0, 16, 16, 0, 0, 0],
                [144, 0, 16, 16, 0, 0, 0], [160, 0, 16, 16, 0, 0, 0]
            ],
            "animations": {
                "all": {"frames": [0, 1, 2, 3], frequency:4}
            }
        };

        var explosionSpritesheet = new createjs.SpriteSheet(explosionSpritesheetData);
        this.animation = new createjs.Sprite(explosionSpritesheet, "all");

        // Listen for the animation end
        this.animation.on("animationend", function() {
            console.log("Animation ended"); // Лог для отладки
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }.bind(this));

        this.addChild(this.animation);
    }

    return DissCoin;
})();