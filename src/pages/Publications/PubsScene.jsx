import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import pubsSceneURL from '../../assets/pubs_scene.glb?url';

const PubsScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let loadedModel = null;
    let frameId;

    // Scene
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Lights
    const light = new THREE.PointLight(0x89CFF0, 100, 100, 2);
    const light2 = new THREE.PointLight(0xffffff, 100, 100, 2);
    const allround = new THREE.AmbientLight(0x89CFF0, 2);
    light.position.set(0, 5, 5);
    light2.position.set(0, -5, -5);
    scene.add(light, light2, allround);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 30;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;

    // Load Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(pubsSceneURL, (gltfScene) => {
      loadedModel = gltfScene.scene;
      loadedModel.position.y = -5;
      loadedModel.position.x = 0;
      loadedModel.rotation.set(Math.PI / 2, 0, 0);
      scene.add(loadedModel);

      // GSAP animation
      const nav = document.querySelector('nav');
      const title = document.querySelector('.title');
      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.fromTo(loadedModel.scale, { z: 0, x: 0, y: 0 }, { z: 75, x: 75, y: 75 });
      if (nav) tl.fromTo(nav, { y: '-100%' }, { y: '0%' }, "<");
      if (title) tl.fromTo(title, { opacity: 0 }, { opacity: 1 }, "<");
    });

    // Resize handler
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      controls.update();
      if (loadedModel) {
        const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
        const targetRotation = scrollPercent * Math.PI * 2;
        loadedModel.rotation.y += (targetRotation - loadedModel.rotation.y) * 0.05;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
};

export default PubsScene;