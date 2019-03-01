import * as PIXI from 'pixi.js';
import Screen from '../screenManager/Screen';
import BasicGame from 'odie/BasicGame';
import Camera from 'odie/components/view3d/Camera';
import OrbitalCamera from 'odie/components/view3d/OrbitalCamera';
import Light from 'odie/components/view3d/Light';
import HexBase3d from '../board3d/HexBase3d';
import OverlaySystem from 'odie/components/overlay/OverlaySystem';
import Ground from '../board3d/Ground';
const out = new PIXI.Point();
export default class GameScreen extends Screen {
    constructor(label) {
        super(label);
        this.container = new PIXI.Container();
        this.addChild(this.container);

        this.graphics = new PIXI.Graphics().beginFill(0 * Math.random()).drawRect(0, 0, 10000, 10000);
        this.container.addChild(this.graphics);


        this.container3D = new PIXI.Container();
        this.container.addChild(this.container3D);

        this.container2D = new PIXI.Container();
        this.container.addChild(this.container2D);

        this.camera = new Camera();
        // this.camera = new OrbitalCamera();

        this.game = new BasicGame({
            stage: this.container3D,
            camera: this.camera,
            renderer: window.renderer,
        });

        this.game.addSystem(OverlaySystem, { stage: this.container2D })

        this.ambient = new Light({
            color: 0x00FFFF,
            intensity: 0.5,
            type: 1,
            distance: 150,
            debug: false,
        });
        this.game.addChild(this.ambient);

        this.ambient.y = 50
        this.ambient.z = 50
        // this.game.view3d.globalUniforms.uniforms.uFogColor = new Float32Array([1, 1, 0.2]);
        // this.game.view3d.globalUniforms.uniforms.uFogDensity = 0.0005;

        this.cameraSin = 0;

        this.ground = new Ground()
        this.game.addChild(this.ground)
        this.hex = new HexBase3d()
        // this.game.addChild(this.hex)
        this.hex.rotation.x = Math.PI / 2

        // this.ground.rotation.y = Math.PI / 4


        this.camera.y = 50
        this.camera.z = 80
        this.camera.rotation.x = -0.35
        // this.sprite = PIXI.Sprite.from('assets/image/coin_texture.jpg')
        // this.container2D.addChild(this.sprite)
        // this.sprite.scale.set(0.2)

    }

    show(delay) {

    }
    update(delta) {
        this.game.update(delta);
        // this.cameraSin += 0.05
        // this.hex.rotation.x = Math.PI / 2 + Math.sin(this.cameraSin) * 0.5;
        // this.hex.rotation.z = -Math.cos(this.cameraSin) * 0.5;


        this.ground.update()
    }
    hide(delay) {

    }
    resize(resolution, innerResolution) {
        this.game.resize(resolution.w, resolution.h)
        // this.gameScene.resize(resolution.w, resolution.h);
    }
}