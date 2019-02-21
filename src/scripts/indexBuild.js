import style from 'styles/main.scss';
import domready from 'domready';
import Scene from './Scene';

import * as PIXI from 'pixi.js';

domready(()=> {
    init();
});

let scene;

function init() {
  scene = new Scene(window.innerWidth,window.innerHeight);
  scene.resize(window.innerWidth, window.innerHeight)
  window.addEventListener('resize', resize);
}
function resize() {
  scene.resize(window.innerWidth, window.innerHeight)
}
