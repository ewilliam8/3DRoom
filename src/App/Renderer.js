import * as THREE from "three";
import { EventDispatcher } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

export default class Renderer extends EventDispatcher {
  constructor(app) {
    super();

    this.app = app;
    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });
    // this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(this.app.sizes.width, this.app.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.composer = new EffectComposer(this.renderer);

    this.renderer.setAnimationLoop(() => {
      this.dispatchEvent({ type: "prerender" });

      this.composer.render();
      this.update();

      this.dispatchEvent({ type: "render" });
    });
  }

  resize() {
    this.renderer.setSize(this.app.sizes.width, this.app.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update() {
    this.renderer.render(this.app.scene, this.app.camera.perspectiveCamera);
  }
}
