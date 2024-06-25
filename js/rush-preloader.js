var rush = rush || {};

let imagesList = [
  { name:"coin",           path:"images/coin.png"            },
  { name:"obstacle",       path:"images/obstacle.png"        },
  { name:"platform",       path:"images/platform.png"        },
  { name:"platformLeft",   path:"images/platform-left.png"   },
  { name:"platformRight",  path:"images/platform-right.png"  },
  { name:"platformMiddle", path:"images/platform-middle.png" },
  { name:"hero",           path:"images/running.png"         },
  { name:"trees",          path:"images/trees.png"           },
];

function loadGraphics() {
  rush.graphics = {};

  var totalFiles = imagesList.length;
  var loadedFiles = 0;
  function imageOnload(event) {
    loadedFiles++;
    console.log('loaded', event, loadedFiles, '/', totalFiles)

    this.updateProgress(loadedFiles/totalFiles);

    if (loadedFiles >= totalFiles) {
      this.game.stage.removeChild(this);
      var menuScene = document.getElementById('menu');
      menuScene.classList.remove('hidden');
    }
  }

  for (var i = 0, len = totalFiles; i < len; i++) {
    imageToLoad = imagesList[i];
    var img = new Image();
    // make sure we have onload event declaring before setting the src property.
    img.onload = imageOnload.bind(this);

    console.log ("loading: ", imageToLoad.path);
    img.src = imageToLoad.path;

    rush.graphics[imageToLoad.name] = imageToLoad;
  };
}

function loadSounds(callback) {
  rush.sounds = {};

  // Загрузка звуков с помощью SoundJS
  createjs.Sound.registerSound("sounds/jump.mp3", "jumpSound");
  createjs.Sound.registerSound("sounds/coin-collect.mp3", "coinSound");
  createjs.Sound.registerSound("sounds/background.mp3", "backgroundMusic");
  createjs.Sound.registerSound("sounds/game-over.mp3", "gameoverSound");

  // Проверка загрузки всех звуков
  var numSounds = 4; // Количество звуков для загрузки
  var loadedSounds = 0;

  function soundLoaded(event) {
    loadedSounds++;
    console.log('loaded sound:', event.id, loadedSounds, '/', numSounds);

    if (loadedSounds >= numSounds && typeof callback === 'function') {
      callback(); // Убедитесь, что callback является функцией перед вызовом
    }
  }

  createjs.Sound.on("fileload", soundLoaded);
}


function updateProgress(percentage) {
  var width = percentage * this.game.stage.canvas.width;
  this.progressBar.graphics.rect(0, 0, width, this.game.stage.canvas.height);
  this.percentageText.text = "loading..." + Math.round(percentage*100);
  this.game.stage.update();
}

function createPreloader() {
  function Preloader(game) {
    this.game = game;

    var bg = new createjs.Shape();
    bg.graphics.beginFill("#000");
    bg.graphics.rect(0, 0, game.stage.canvas.width, game.stage.canvas.height);
    this.addChild(bg);

    var progressBar = new createjs.Shape();
    progressBar.graphics.beginFill("#333");
    this.addChild(progressBar);
    this.progressBar = progressBar;

    var percentageText = new createjs.Text("loading...0", "32px sans-serif", "#999");
    percentageText.x = game.stage.canvas.width / 2;
    percentageText.y = game.stage.canvas.height / 2;
    percentageText.textAlign = "center";
    percentageText.textBaseline = "middle";
    this.addChild(percentageText);
    this.percentageText = percentageText;
  };

  Preloader.prototype = new createjs.Container();
  Preloader.prototype.loadGraphics = function() {
    var self = this;

    // Сначала загрузить графику
    loadGraphics.call(this);

    // Затем загрузить звуки и перейти к следующему этапу, когда звуки будут загружены
    loadSounds(function() {
      self.game.backgroundMusicInstance = createjs.Sound.play("backgroundMusic", { loop: -1, volume: 0.2 });
      // Callback функция после загрузки звуков
      self.game.stage.removeChild(self);
      var menuScene = document.getElementById('menu');
      menuScene.classList.remove('hidden');
    });
  };
  Preloader.prototype.updateProgress = updateProgress;

  return Preloader;
}

rush.Preloader = createPreloader();
