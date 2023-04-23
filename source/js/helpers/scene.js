import * as THREE from 'three';
import {WW, WH} from './utils';
import vertexShader from "../../shader/vertexShader.glsl";
import fragmentShader from "../../shader/fragmentShader.glsl";

export default class Scene {
  constructor(canvasId) {


    this.canvas = document.getElementById(canvasId);
    this.canvas.width = WW;
    this.canvas.height = WH;

    this.sceneImgs = [];

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, WW / WH, 0.1, 1000);
    this.camera.position.z = 1000;
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});

    this.render = this.render.bind(this);
    window.addEventListener(`resize`, this.onResize.bind(this));
  }

  start() {
    this.setRendererProperties();
    this.setScene();
    this.render();
  }

  setScene() {
    const geometry = new THREE.PlaneGeometry(WW, WH);
    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const planeMaterials = this.sceneImgs.map((path) => new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: textureLoader.load(path)
        },
      },
      vertexShader,
      fragmentShader,
    }));

    planeMaterials.forEach((material, index) => {
      const plane = new THREE.Mesh(geometry, material);
      plane.position.x = WW * index;
      this.scene.add(plane);
    });
  }

  setRendererProperties() {
    const color = new THREE.Color(0x5f458c);
    const alpha = 1;

    this.renderer.setSize(WW, WH);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(color, alpha);
  }

  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.animation = requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    this.onResize();
  }

  stop() {
    cancelAnimationFrame(this.animation);
  }
}
