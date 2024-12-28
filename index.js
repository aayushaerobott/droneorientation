// Three.js 3D Model Rendering
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(20, -5, 30);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3ddrone").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(10, 10, 100);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

const axesHelper = new THREE.AxesHelper(4); // Size of axes
scene.add(axesHelper);

const loader = new THREE.GLTFLoader();
let object;
let roll = -1;
let pitch = -1;
let yaw = -146;

loader.load("scene.gltf", function (gltf) {
  object = gltf.scene;
  object.scale.set(6, 6, 4);
  // Apply initial rotation
  object.rotation.set(
    THREE.Math.degToRad(pitch), // Pitch (around X-axis)
    THREE.Math.degToRad(yaw), // Yaw (around Y-axis)
    THREE.Math.degToRad(roll) // Roll (around Z-axis)
  );
  scene.add(object);
  object.position.set(0, 0, 0);
});

// Function to rotate the model
function rotateModel(roll, pitch, yaw) {
  if (object) {
    object.rotation.x = THREE.Math.degToRad(pitch); // Pitch (around X-axis)
    object.rotation.y = THREE.Math.degToRad(yaw); // Yaw (around Y-axis)
    object.rotation.z = THREE.Math.degToRad(roll); // Roll (around Z-axis)
    console.log(`Roll: ${roll}`);
    console.log(`Pitch: ${pitch}`);
    console.log(`Yaw: ${yaw}`);
  }
}

// Key press event listener
document.addEventListener("keydown", function (event) {
  const step = 5; // Step size for rotation in degrees

  switch (event.key.toLowerCase()) {
    case "6": // Roll adjustment
      roll += step;
      console.log(`Roll: ${roll}`);
      document.getElementById("command").innerHTML = "Roll Right";
      pitch = -1;
      yaw = -146;
      break;
    case "4": // Reverse Roll
      roll -= step;
      console.log(`Roll: ${roll}`);
      document.getElementById("command").innerHTML = "Roll Left";
      pitch = -1;
      yaw = -146;
      break;
    case "2": // back Pitch adjustment
      pitch += 2;
      console.log(`Pitch: ${pitch}`);
      document.getElementById("command").innerHTML = "Pitch Backward";
      roll = -1;
      yaw = -146;
      break;
    case "8": // forwrd pitch
      pitch -= 2;
      console.log(`Pitch: ${pitch}`);
      document.getElementById("command").innerHTML = "Pitch Forward";
      roll = -1;
      yaw = -146;
      break;
    case "9": // Yaw adjustment
      yaw += step;
      console.log(`Yaw: ${yaw}`);
      document.getElementById("command").innerHTML = "Yaw Right";
      roll = -1;
      pitch = -1;
      break;
    case "7": // Reverse Yaw
      yaw -= step;
      console.log(`Yaw: ${yaw}`);
      document.getElementById("command").innerHTML = "Yaw Left";
      roll=-1;
      pitch=-1;
      break;
    case "0":
      roll = -1;
      pitch = -1;
      yaw = -146;
      document.getElementById("command").innerHTML = " ";
      break;
  }
  rotateModel(roll, pitch, yaw); // Update model rotation
});

// Render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();

// Resize window adjustments
// window.addEventListener("resize", function () {
//   const container = document.getElementById("dronecont");
//   const width = container.offsetWidth;
//   const height = container.offsetHeight;

//   // Update camera aspect and projection matrix
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();

//   // Update renderer size
//   renderer.setSize(width, height);
// });
