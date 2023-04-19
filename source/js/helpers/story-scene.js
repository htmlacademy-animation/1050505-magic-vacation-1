import {WW} from './utils';
import Scene from './scene';

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

  render() {
    this.animation = requestAnimationFrame(this.render);

    document.body.addEventListener(`slideChange`, (ev) => {
      this.camera.position.x = WW * (ev.detail.active / 2);
    });

    this.renderer.render(this.scene, this.camera);
  }
}
