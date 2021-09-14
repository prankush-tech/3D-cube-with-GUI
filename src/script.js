import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';

/**
 * Base
 */
const gui = new dat.GUI({closed:true, width:400});
const parameters={
    color: 0x00ff00,
    spin: ()=>
    {
        gsap.to(mesh.rotation,{duration:10, y: mesh.rotation.y+3})
    }
}

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({
	color: parameters.color,
    wireframe : true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

gui.add(mesh.position, 'y', -3, 3, 0.01).name('Red cube Y');
gui
    .add(mesh, 'visible', )

gui
    .add(mesh.material, 'wireframe')    
/**
 * Sizes
 */
gui
    .addColor(parameters, 'color')
    .onChange( ()=>
    {
        material.color.set(parameters.color)
    })

gui
    .add(parameters,'spin')

// console.log(dat) debug
//debugging





const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
