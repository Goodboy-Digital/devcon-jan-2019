import * as PIXI from 'pixi.js';
import Screen from '../screenManager/Screen';
import BasicGame from 'odie/BasicGame';
import Camera from 'odie/components/view3d/Camera';
import OrbitalCamera from 'odie/components/view3d/OrbitalCamera';
import Light from 'odie/components/view3d/Light';
import HexBase3d from '../board3d/HexBase3d';
import OverlaySystem from 'odie/components/overlay/OverlaySystem';
export default class GameScreen extends Screen {
    constructor(label) {
        super(label);
        this.container = new PIXI.Container();
        this.addChild(this.container);        
        
        this.graphics = new PIXI.Graphics().beginFill(0x000000).drawRect(0,0,10000,10000);
        this.container.addChild(this.graphics);
        
        
        const sprite = PIXI.Sprite.from('assets/image/coin_texture.jpg');
        this.container.addChild(sprite);
        
        var geometry = new PIXI.Geometry()
        .addAttribute('position', [0, 0, //x, y
                                   100, 0, //x, y
                                   100, 100,
                                   0, 100])// x,y
        .addAttribute('color', [1, 0, 0, 1,
                                0, 1, 0, 1,
                                1, 0, 1, 1,
                                1, 1, 1, 1])
        .addAttribute('uvs', [0, 0,
                              0, 1,
                              1, 1,
                              1, 0])
        .addIndex([0, 1, 2, 0, 3, 2])
            
            
        const uniforms = {
            uTime:1,
            uSampler:PIXI.Texture.from('assets/image/001.png'),
            uSampler2:PIXI.Texture.from('assets/image/displacement_map.png')
        };

        var shader = PIXI.Shader.from(`

            attribute vec2 position;
            attribute vec4 color;
            attribute vec2 uvs;

            varying vec4 vColor;
            varying vec2 vUvs;

            uniform mat3 projectionMatrix;
            uniform mat3 translationMatrix;

            void main(void)
            {
                gl_Position = vec4((projectionMatrix * translationMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
   
                vColor = color;
                vUvs = uvs;
            }

        `,
        `   
            
            varying vec4 vColor;
            varying vec2 vUvs;

            uniform float uTime;
            uniform sampler2D uSampler;
            uniform sampler2D uSampler2;

            void main() {

                vec2 modUvs = vUvs;

                modUvs.x += sin((uTime+vUvs.y) * 2.) * 0.1;
                
                vec4 first = texture2D(uSampler, modUvs);// * vColor;
                vec4 second = texture2D(uSampler2, vUvs);// * vColor;

                float mod = ((1.-second.r) * 1.);;
                mod = clamp(mod, 0., 1.);

                gl_FragColor = first * mod;
                
            }
        `, uniforms);

        var state = new PIXI.State();

        var mesh = new PIXI.Mesh(geometry, shader, state);
            
        this.addChild(mesh);



            this.mesh = mesh;









        // this.container3D = new PIXI.Container();
        // this.container.addChild(this.container3D);

        // this.container2D = new PIXI.Container();
        // this.container.addChild(this.container2D);

        // this.camera = new Camera();
        // // this.camera = new OrbitalCamera();

        // this.game = new BasicGame({
        //     stage: this.container3D,
        //     camera: this.camera,
        //     renderer: window.renderer,
        // });       

        // this.game.addSystem(OverlaySystem, { stage: this.container2D })

        // this.ambient = new Light({
        //     color: 0xFFFFFF,
        //     intensity: 2,
        //     type: 0,
        //     distance: 150,
        //     debug: false,
        // });
        // this.game.addChild(this.ambient);

        // // this.game.view3d.globalUniforms.uniforms.uFogColor = new Float32Array([1, 1, 0.2]);
        // // this.game.view3d.globalUniforms.uniforms.uFogDensity = 0.0005;

        // this.cameraSin = 0;

        // this.hex = new HexBase3d()
        // this.game.addChild(this.hex)
        // this.hex.rotation.x = Math.PI / 2

        // // this.sprite = PIXI.Sprite.from('assets/image/coin_texture.jpg')
        // // this.container2D.addChild(this.sprite)
        // // this.sprite.scale.set(0.2)

    }
  
    show(delay) {

    }
    update(delta) {
    //     this.game.update(delta);
    //     // this.hex.update(delta);
        this.mesh.x = 400
        this.mesh.y = 400
  //  this.mesh.rotation += 0.01;
    this.mesh.scale.set(5);
        this.mesh.shader.uniforms.uTime += 0.1;//.//Math.random();
    // this.cameraSin += 0.05
    //    this.hex.rotation.x = Math.PI / 2 + Math.sin(this.cameraSin) * 0.5;
    //    this.hex.rotation.z = -Math.cos(this.cameraSin) * 0.5;
    // //    this.hex.y = Math.sin(this.cameraSin) * 0.5;
    // //    this.hex.z = Math.sin(this.cameraSin) * 1;


    }
    hide(delay) {

    }
    resize(resolution, innerResolution) {
        // this.gameScene.resize(resolution.w, resolution.h);
    }
}