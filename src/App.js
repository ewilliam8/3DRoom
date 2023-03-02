import * as THREE from "three";
import { EventDispatcher } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
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

    /**
     * Sizes
     */
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.enableDamping = true;

    /**
     * Renderer
     */
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer = new EffectComposer(this.renderer);

    this.renderer.setAnimationLoop(() => {
      this.dispatchEvent({ type: "prerender" });

      this.composer.render();

      this.dispatchEvent({ type: "render" });
    });
  }
}
