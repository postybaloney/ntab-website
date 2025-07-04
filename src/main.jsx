// src/main.jsx
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import brainSceneURL from './assets/brain_scene.glb?url';

const BrainScene = () => {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    let frameId;
    let loadedModel = null;

    // Setup
    const scene = new THREE.Scene();
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 30;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;

    // Lights
    const light1 = new THREE.PointLight(0x89CFF0, 100, 100, 2);
    light1.position.set(0, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 100, 100, 2);
    light2.position.set(0, -5, -5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x89CFF0, 2);
    scene.add(ambientLight);

    // Load model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(brainSceneURL, (gltfScene) => {
      loadedModel = gltfScene.scene;
      loadedModel.position.set(-1, -12, 0);
      scene.add(loadedModel);
      setModel(loadedModel);

      // const nav = document.querySelector('nav');
      // const title = document.querySelector('.title');

      const tl = gsap.timeline({ defaults: { duration: 1 } });
      tl.fromTo(loadedModel.scale, { z: 0, x: 0, y: 0 }, { z: 15, x: 15, y: 15 });
      // if (nav) tl.fromTo('nav', { y: '-100%' }, { y: '0%' });
      // if (title) tl.fromTo('.title', { opacity: 0 }, { opacity: 1 });
    });

    // Handle resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (loadedModel) {
        const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
        const targetRotation = scrollPercent * Math.PI * 2;
        loadedModel.rotation.y += (targetRotation - loadedModel.rotation.y) * 0.05;
      }

      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
};

export default BrainScene;