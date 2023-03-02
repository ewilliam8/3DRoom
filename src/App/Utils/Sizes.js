import { EventDispatcher } from "three";

export default class Sizes extends EventDispatcher {
  constructor(app) {
    super();

    this.app = app;
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      aspect: window.innerWidth / window.innerHeight,
      frustrum: 5,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;
      this.sizes.aspect = this.sizes.width / this.sizes.height;
      this.dispatchEvent({
        type: "resize",
        width: this.sizes.width,
        height: this.sizes.height,
      });
    });
  }
}
