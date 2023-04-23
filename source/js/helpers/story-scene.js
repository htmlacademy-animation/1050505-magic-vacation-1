import {WW} from './utils';
import Scene from './scene';

let activeSlideIndex = 0;

export default class sceneStory extends Scene {
  constructor() {
    super(`sceneStory`);

    this.sceneImgs = [
      `img/module-5/scenes-textures/scene-1.png`,
      `img/module-5/scenes-textures/scene-2.png`,
      `img/module-5/scenes-textures/scene-3.png`,
      `img/module-5/scenes-textures/scene-4.png`,
    ];
  }

  setCameraPositionX() {
    this.camera.position.x = WW * activeSlideIndex;
  }

  render() {
    this.animation = requestAnimationFrame(this.render);

    this.setCameraPositionX();

    document.body.addEventListener(`slideChange`, (ev) => {
      activeSlideIndex = ev.detail.active / 2;
      this.setCameraPositionX();
    });

    this.renderer.render(this.scene, this.camera);
  }
}