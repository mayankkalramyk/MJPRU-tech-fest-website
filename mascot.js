/* =========================================
   3D ROBOT / MASCOT MODULE (MOBILE OPTIMIZED)
   ========================================= */
import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

// 1. Setup Scene
const container = document.getElementById('mascot-container');
const scene = new THREE.Scene();

// Alpha true makes background transparent
const camera = new THREE.PerspectiveCamera(50, 300/400, 0.1, 1000); 
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

// Mobile Responsive Sizing
function setMascotSize() {
    if (window.innerWidth < 600) {
        renderer.setSize(200, 250); // Smaller for mobile
        camera.aspect = 200 / 250;
    } else {
        renderer.setSize(300, 400); // Normal for desktop
        camera.aspect = 300 / 400;
    }
    camera.updateProjectionMatrix();
}
setMascotSize(); // Set initial size
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
const headGeo = new THREE.SphereGeometry(1, 32, 32);
const head = new THREE.Mesh(headGeo, pinkMat);
botGroup.add(head);

const eyeGeo = new THREE.SphereGeometry(0.3, 32, 16);
const leftEye = new THREE.Mesh(eyeGeo, whiteMat);
leftEye.position.set(-0.35, 0.1, 0.85);
leftEye.scale.set(1, 1.2, 0.5); 
botGroup.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeo, whiteMat);
rightEye.position.set(0.35, 0.1, 0.85);
rightEye.scale.set(1, 1.2, 0.5);
botGroup.add(rightEye);

const pupilGeo = new THREE.SphereGeometry(0.1, 16, 16);
const leftPupil = new THREE.Mesh(pupilGeo, blackMat);
leftPupil.position.set(-0.35, 0.1, 1.1);
botGroup.add(leftPupil);

const rightPupil = new THREE.Mesh(pupilGeo, blackMat);
rightPupil.position.set(0.35, 0.1, 1.1);
botGroup.add(rightPupil);

const antStickGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
const antStick = new THREE.Mesh(antStickGeo, whiteMat);
antStick.position.set(0, 1.2, 0);
botGroup.add(antStick);

const antBobbleGeo = new THREE.SphereGeometry(0.2);
const antBobble = new THREE.Mesh(antBobbleGeo, yellowMat);
antBobble.position.set(0, 1.5, 0);
botGroup.add(antBobble);

const handGeo = new THREE.SphereGeometry(0.25);
const leftHand = new THREE.Mesh(handGeo, yellowMat);
leftHand.position.set(-1.4, -0.5, 0);
botGroup.add(leftHand);

const rightHand = new THREE.Mesh(handGeo, yellowMat);
rightHand.position.set(1.4, -0.5, 0);
botGroup.add(rightHand);

// -- Lighting --
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); 
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(2, 5, 5);
scene.add(dirLight);

// -- Interaction Vars (Desktop & Mobile) --
let targetRotationX = 0;
let targetRotationY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Desktop Mouse
document.addEventListener('mousemove', (event) => {
    targetRotationY = (event.clientX - windowHalfX) * 0.001;
    targetRotationX = (event.clientY - windowHalfY) * 0.001;
});

// Mobile Touch Tracking
document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
        targetRotationY = (event.touches[0].clientX - windowHalfX) * 0.002;
        targetRotationX = (event.touches[0].clientY - windowHalfY) * 0.002;
    }
}, { passive: true });

// -- Animation Loop --
const clock = new THREE.Clock();
const bubble = document.getElementById('speech-bubble');

// State variables to prevent unnecessary DOM updates
let isBubbleVisible = false;
let currentBubbleText = "";

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 1. Bobbing Motion
    botGroup.position.y = Math.sin(t * 2) * 0.1;
    
    // 2. Hands floating independently
    leftHand.position.y = -0.5 + Math.sin(t * 2.5) * 0.1;
    rightHand.position.y = -0.5 + Math.cos(t * 2.5) * 0.1;

    // 3. Antenna Wiggle
    antBobble.position.x = Math.sin(t * 5) * 0.05;

    // 4. Smooth Look Rotation (Lerp for natural movement)
    botGroup.rotation.y += (targetRotationY - botGroup.rotation.y) * 0.1;
    botGroup.rotation.x += (targetRotationX - botGroup.rotation.x) * 0.1;

    // 5. Scroll Reaction (Optimized)
    if (bubble) {
        const scrollY = window.scrollY;
        
        if(scrollY > 100) {
            antBobble.scale.setScalar(1 + Math.sin(t*10)*0.2); 
            
            if (!isBubbleVisible) {
                bubble.style.opacity = '1';
                isBubbleVisible = true;
            }
            
            let newText = scrollY < 1000 ? "Scroll More! 👇" : "Explore Events!"; 
            if (currentBubbleText !== newText) {
                bubble.innerText = newText;
                currentBubbleText = newText;
            }
        } else {
            if (isBubbleVisible) {
                bubble.style.opacity = '0';
                isBubbleVisible = false;
            }
        }
    }

    renderer.render(scene, camera);
}
animate();

// Handle Resize for Mobile Orientation Changes
window.addEventListener('resize', () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    setMascotSize();
});