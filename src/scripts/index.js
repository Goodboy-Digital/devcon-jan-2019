Math.lerp = function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;

    return value1 + (value2 - value1) * amount;
};

import * as PIXI from 'pixi.js';
import manifest from './manifest-v2.json';
import gboLoader from './gboLoader';
import ScreenManager from './screenManager/ScreenManager.js';
import GameScreen from './game/GameScreen.js';

const loader = new PIXI.Loader();

const type = 'default';

const Resource = PIXI.LoaderResource;

Resource.setExtensionXhrType('gbo', Resource.XHR_RESPONSE_TYPE.BUFFER);

loader.use(gboLoader());

for (const key in manifest.default.image) {
    const element = manifest.default.image[key];

    loader.add(`assets/${element[type]}`);
}
for (const key in manifest.default.json) {
    const element = manifest.default.json[key];

    loader.add(`assets/${element[type]}`);
}
loader.add('assets/models/coin.gbo');
loader.load(init);
window.loader = loader


const appStage = new PIXI.Container()

const app = new PIXI.Application(window.innerWidth, window.innerHeight - 4,
    {
        resolution: Math.min(window.devicePixelRatio, 1.5),
        autoResize: true,
        backgroundColor: 0xFFFFFF,
        forceCanvas: true,
    }
);

window.renderer = app.renderer;

app.stage.addChild(appStage);
window.renderer = app.renderer;
document.body.appendChild(app.renderer.view);
document.body.style.margin = 0;

const screenManager = new ScreenManager();
appStage.addChild(screenManager)

function init() {   

    const gameScreen = new GameScreen('Game');
    screenManager.addScreen(gameScreen);
    window.resourcesData = loader.resources;
    screenManager.forceChange('Game');

    resize();
    app.ticker.add((evt) => {
        screenManager.update(evt / 60);
    });


    window.addEventListener('resize', resize);
}
function resize() {
    screenManager.resize({ w: window.innerWidth, h: window.innerHeight }, { w: window.innerWidth, h: window.innerHeight });
}
