import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor(app) {
    this.app = app;

    this.createPerpectiveCamera();
    this.createOrthographicCamera();
  }

  createPerpectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      this.app.sizes.aspect,
      0.1,
      100
    );
    this.app.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 5
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.app.sizes.aspect * this.app.sizes.frustrum) / 2,
      (this.app.sizes.aspect * this.app.sizes.frustrum) / 2,
      this.app.sizes.frustrum / 2,
      -this.app.sizes.frustrum / 2,
      -100,
      100
    );
    this.app.scene.add(this.orthographicCamera);
  }

  resize() {
    // Updating Perspective Camera on Resize
    this.perspectiveCamera.aspect = this.app.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Updating Orthographic Camera on Resize
    this.orthographicCamera.left =
      (-this.app.sizes.aspect * this.app.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.app.sizes.aspect * this.app.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.app.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.app.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    
  }
}
