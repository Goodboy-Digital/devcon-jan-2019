import * as PIXI from 'pixi.js';
import Entity3d from 'odie/Entity3d';
import PhongMaterial from 'odie/components/view3d/materials/PhongMaterial';
import PlaneGeometry from 'odie/geometry/PlaneGeometry';
import { TweenLite, Bounce } from 'gsap';

export default class HexBase3d extends Entity3d {
    constructor() {
        super();

        this.color = 0xFFFFFF;
        this.material = new PhongMaterial({
            color: this.color,
            map: PIXI.Texture.from('assets/image/coin_texture.jpg'),
        });

        const state = new PIXI.State();
        state.blend = true;
        state.depthTest = true
        state.culling = true;

        this.bodyContainer = new Entity3d();
        this.addChild(this.bodyContainer);

        this.body = new Entity3d(
            {
                geometry: PIXI.geometryCache['assets/models/coin.gbo'],
                material: this.material,
                state
            });
        this.body.scale.set(0.5)
        this.body.rotation.y = Math.PI * 0.5
        this.bodyContainer.addChild(this.body);


        this.screenPosition = {
            x: 0,
            y: 0,
        };

    }

    build() {
    }

    update(delta) {

    }
}
