import { EventDispatcher } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class Resources extends EventDispatcher {
  constructor(app) {
    super();

    this.app = app;
    console.log(this.app.assets)
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
  }
}
