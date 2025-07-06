
const scene = new THREE.Scene();
let isOpened = false;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Door
const doorGeometry = new THREE.BoxGeometry(2, 4, 0.2);
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.set(0, 0, 0);
scene.add(door);

// "Person" as a cylinder (just for effect)
const personGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const personMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
const person = new THREE.Mesh(personGeometry, personMaterial);
person.position.set(0, -3, 0);
scene.add(person);

// Animate the door
function animate() {
  requestAnimationFrame(animate);

  if (isOpened && door.rotation.y > -Math.PI / 2) {
    door.rotation.y -= 0.02;
  }

  renderer.render(scene, camera);
}

animate();

// Handle click
document.getElementById("welcomeBtn").addEventListener("click", () => {
  if (!isOpened) {
    isOpened = true;

    // Transition background
    document.body.style.backgroundColor = "#fff";

    // Change door and person color
    door.material.color.set("#00aa00");
    person.material.color.set("#000000");

    // Optionally hide the button
    document.getElementById("welcomeBtn").style.display = "none";
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
