// Description: This file contains the Operations page of the Neurotechnology@Berkeley website.
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar.jsx';

export default function Operations() {
//   useEffect(() => {
//     const canvas = document.querySelector('.webgl')
//     const renderer = new THREE.WebGLRenderer({ canvas })
//     renderer.setSize(window.innerWidth, window.innerHeight)

//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     )

//     const cube = new THREE.Mesh(
//       new THREE.BoxGeometry(),
//       new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//     )
//     scene.add(cube)

//     camera.position.z = 5
//     renderer.render(scene, camera)

//     return () => {
//       renderer.dispose()
//     }
//   }, [])

  return (
    <div>
        <Navbar />
        <canvas className="webgl"></canvas>
        <div className="Section">
            <h1>Project 1</h1>
        </div>
        <div className="Section">
            <h1>Project 2</h1>
        </div>
        <div className="Section">
            <h1>Project 3</h1>
        </div>
    </div>
  )
}