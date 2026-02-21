/* =========================================
   3D ROBOT / MASCOT MODULE
   ========================================= */
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// 1. Setup Scene
const container = document.getElementById('mascot-container');
const scene = new THREE.Scene();
// Alpha true makes background transparent
const camera = new THREE.PerspectiveCamera(50, 300/400, 0.1, 1000); 
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(300, 400);
container.appendChild(renderer.domElement);

// 2. Create "Cartoon Bot" Group
const botGroup = new THREE.Group();
scene.add(botGroup);

// -- Materials (Toon Shader for Cartoon look) --
const pinkMat = new THREE.MeshToonMaterial({ color: 0xe73c7e }); // MJPRU Pink
const yellowMat = new THREE.MeshToonMaterial({ color: 0xffeb3b }); // MJPRU Yellow
const whiteMat = new THREE.MeshToonMaterial({ color: 0xffffff });
const blackMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

// -- Body Parts --

// Head (Sphere)
const headGeo = new THREE.SphereGeometry(1, 32, 32);
const head = new THREE.Mesh(headGeo, pinkMat);
botGroup.add(head);

// Eyes (White Ovals)
const eyeGeo = new THREE.SphereGeometry(0.3, 32, 16);
const leftEye = new THREE.Mesh(eyeGeo, whiteMat);
leftEye.position.set(-0.35, 0.1, 0.85);
leftEye.scale.set(1, 1.2, 0.5); // Flatten slightly
botGroup.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeo, whiteMat);
rightEye.position.set(0.35, 0.1, 0.85);
rightEye.scale.set(1, 1.2, 0.5);
botGroup.add(rightEye);

// Pupils (Black dots)
const pupilGeo = new THREE.SphereGeometry(0.1, 16, 16);
const leftPupil = new THREE.Mesh(pupilGeo, blackMat);
leftPupil.position.set(-0.35, 0.1, 1.1);
botGroup.add(leftPupil);

const rightPupil = new THREE.Mesh(pupilGeo, blackMat);
rightPupil.position.set(0.35, 0.1, 1.1);
botGroup.add(rightPupil);

// Antenna (Cylinder + Sphere)
const antStickGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
const antStick = new THREE.Mesh(antStickGeo, whiteMat);
antStick.position.set(0, 1.2, 0);
botGroup.add(antStick);

const antBobbleGeo = new THREE.SphereGeometry(0.2);
const antBobble = new THREE.Mesh(antBobbleGeo, yellowMat);
antBobble.position.set(0, 1.5, 0);
botGroup.add(antBobble);

// Floating Hands (Spheres)
const handGeo = new THREE.SphereGeometry(0.25);
const leftHand = new THREE.Mesh(handGeo, yellowMat);
leftHand.position.set(-1.4, -0.5, 0);
botGroup.add(leftHand);

const rightHand = new THREE.Mesh(handGeo, yellowMat);
rightHand.position.set(1.4, -0.5, 0);
botGroup.add(rightHand);

// -- Lighting (Crucial for Toon Effect) --
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(2, 5, 5);
scene.add(dirLight);

// -- Mouse Interaction Vars --
let mouseX = 0;
let mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
});

// -- Animation Loop --
const clock = new THREE.Clock();
const bubble = document.getElementById('speech-bubble');

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 1. Bobbing Motion (Floating)
    botGroup.position.y = Math.sin(t * 2) * 0.1;
    
    // 2. Hands floating independently
    leftHand.position.y = -0.5 + Math.sin(t * 2.5) * 0.1;
    rightHand.position.y = -0.5 + Math.cos(t * 2.5) * 0.1;

    // 3. Antenna Wiggle
    antBobble.position.x = Math.sin(t * 5) * 0.05;

    // 4. Look at Mouse (Subtle rotation)
    botGroup.rotation.y = mouseX * 2; // Follow horizontal
    botGroup.rotation.x = mouseY * 2; // Follow vertical

    // 5. Scroll Reaction (Spin)
    const scrollY = window.scrollY;
    if(scrollY > 100) {
        // Keep bobbing but look active
        antBobble.scale.setScalar(1 + Math.sin(t*10)*0.2); // Pulsing antenna
        bubble.style.opacity = '1';
        if(scrollY < 1000) bubble.innerText = "Scroll More! 👇";
        else bubble.innerText = "Scroll More! 👇";
    } else {
        bubble.style.opacity = '0';
    }

    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    // No full screen resize needed for fixed mascot container
});