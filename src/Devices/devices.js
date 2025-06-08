import "../style.css" 
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {gsap} from "gsap"
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

import circuitSceneURL from './assets/circuit_scene.glb?url'

window.onload = () => loadModel()

function loadModel() {
  let loadedModel = null;

  // Brain
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(circuitSceneURL, (gltfScene) => {
    loadedModel = gltfScene.scene;
    // loadedModel.scale.set(4, 4, 4);
    loadedModel.position.y = -10;
    loadedModel.position.x = -8;
    loadedModel.rotation.set(Math.PI, Math.PI, 0);
    scene.add(loadedModel);

    //Timeline magic
    const tl = gsap.timeline({defaults: {duration: 1}})
    tl.fromTo(loadedModel.scale, {z:0, x:0, y:0}, {z:0.5, x:0.5, y:0.5})
    // tl.fromTo(loadedModel.rotation, {z:0, x:0, y:0}, {z: 0, x: Math.PI, y: Math.PI})
    tl.fromTo('nav', {y: '-100%'}, {y: "0%"})
    tl.fromTo('.title', {opacity: 0}, {opacity: 1})
  });

  //Scene
  const scene = new THREE.Scene()

  //Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  //Light
  const light = new THREE.PointLight(0x89CFF0, 100, 100, 2)
  const light2 = new THREE.PointLight(0xfffffff, 100, 100, 2)
  const allround = new THREE.AmbientLight(0x89CFF0, 2)
  light.position.set(0, 5, 5)
  light2.position.set(0, -5, -5)
  scene.add(light)
  scene.add(light2)
  scene.add(allround)

  //Camera
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 30
  scene.add(camera)

  //Renderer
  const canvas = document.querySelector(".webgl");
  // const clickbox = document.getElementById("brain")
  // renderer2.setSize(clickbox.clientWidth, clickbox.clientHeight)
  const renderer = new THREE.WebGLRenderer({canvas})
  // clickbox.appendChild(renderer.domElement)
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // renderer.setPixelRatio(2)
  //renderer.render(scene, camera)

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = false
  controls.enablePan = false
  controls.enableZoom = false
  controls.enableRotate = false
  // controls.autoRotate = false
  // controls.autoRotateSpeed = 5


  //Resize
  window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
  })

  const animate = () => {
    controls.update();

    if (loadedModel) {
      // console.log(10000 / (document.body.scrollHeight - window.innerHeight))
      const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight) , 1);
      const targetRotation = scrollPercent * Math.PI * 2;
      loadedModel.rotation.y += (targetRotation - loadedModel.rotation.y)* 0.05;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();
}