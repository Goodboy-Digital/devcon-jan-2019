import * as PIXI from 'pixi.js';
import Entity3d from 'odie/Entity3d';
import PhongMaterial from 'odie/components/view3d/materials/PhongMaterial';
import PbrMaterial from 'odie/components/view3d/materials/PbrMaterial';
import PlaneGeometry from 'odie/geometry/PlaneGeometry';

export default class Ground extends Entity3d {
    constructor() {
        super();


        this.tex =  PIXI.Texture.from('assets/image/displacement_map.png')
        this.tex2 =  PIXI.Texture.from('assets/image/001.png')
        this.tex.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.tex2.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        this.material = new PhongMaterial({
            name: 'block-shader',
            uniforms: { t:this.tex2, uPosition: new PIXI.Point() },
            vertex: {
                start: `
                    uniform sampler2D t;
                    uniform vec2 uPosition;
                    float rand(vec2 co){
                        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
                    }
                    `,
                main: `
                    vec2 pos = transformed.xy;
                    pos = pos/100.;
                    pos+= 0.5;
                    pos+=uPosition;
                    vec4 samp = texture2D(t, pos);
                    // vec4 samp = texture2D(t, vec2(0., pos.y));
                    transformed.z = samp.r * 20.;
           
                    `
                ,
            },
            // map:  this.tex2
        });

        const state = new PIXI.State();
        state.depthTest = true;
        // state.blend = true;
        this.planeData = {
            width:100,
            height:100,
            i:20,
            j:20
        }
        this.geometry = new PlaneGeometry(this.planeData.width, this.planeData.height,this.planeData.i,this.planeData.j)
        // this.geometry.addAttribute('nudge',  this.geometry.indexBuffer.data)
        console.log(this.geometry);
        
        this.body = new Entity3d({
            geometry: this.geometry,
            material: this.material,
            state
        })
        this.body.rotation.x = -Math.PI/2
        this.body.rotation.z = Math.PI
        this.addChild(this.body)

        this.addSelf();

        this.speed = 0.25

        this.uvSpeed = 0.05

        this.uvController = 0;

        this.chunck = this.planeData.height / this.planeData.j;

        console.log(this.chunck);
        
    }
    update(delta) {

        // return
        this.body.z += this.speed
       if(this.body.z > this.chunck){            
            
            this.body.z -= this.chunck // adj

            this.material.uniforms.uPosition.y -= this.chunck / this.planeData.height//* 0.2

            
        }       
    }
}