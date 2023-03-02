import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World"

import { EventDispatcher } from "three";
import * as dat from "dat.gui";

export class App extends EventDispatcher {
  static instance;
  constructor() {
    super();

    if (App.instance) return App.instance;
    App.instance = this;

    // Scene
    this.scene = new THREE.Scene();

    // GUI
    // this.gui = new dat.GUI();

    // Canvas
    this.canvas = document.querySelector("canvas.webgl");

    //Sizes
    this._sizes = new Sizes();
    this.sizes = this._sizes.sizes;

    //Camera
    this.camera = new Camera(this);

    //Renderer
    this.renderer = new Renderer(this);

    // World
    this.world = new World(this); 

    /**
     * Event Listeners
     */ 
    this._sizes.addEventListener('resize', ()=> {
      this.resize();
    });

    this._sizes.addEventListener('update', ()=> {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
  }
}
