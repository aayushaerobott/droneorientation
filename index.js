// Three.js 3D Model Rendering
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(20, -5  , 30);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3ddrone").appendChild(renderer.domElement);

const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
topLight.position.set(100, 400, 400);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 4);
scene.add(ambientLight);

// const loader = new THREE.GLTFLoader();

let roll = -15;   // Initial roll
let pitch = 35;   // Initial pitch
let yaw = 26;     // Initial yaw

const loader = new THREE.GLTFLoader();
        let object;
        loader.load(
            'assets/models/drone/scene.gltf',
            function (gltf) {
                object = gltf.scene;
                object.scale.set(6, 6, 2);
                const initialRoll = -15;   // Example: Set the roll value in degrees
                const initialPitch = 35; // Example: Set the pitch value in degrees
                const initialYaw = 26;    // Example: Set the yaw value in degrees

                // Apply the initial rotation (convert degrees to radians)
                object.rotation.set(
                    THREE.Math.degToRad(initialPitch), // Pitch (around X-axis)
                    THREE.Math.degToRad(initialYaw),   // Yaw (around Y-axis)
                    THREE.Math.degToRad(initialRoll)   // Roll (around Z-axis)
                );
                scene.add(object);
            }
        );

// Function to rotate the model
function rotateModel(roll, pitch, yaw) {
    if (object) {
        object.rotation.x = THREE.Math.degToRad(pitch);  // Pitch (around X-axis)
        object.rotation.y = THREE.Math.degToRad(yaw);    // Yaw (around Y-axis)
        object.rotation.z = THREE.Math.degToRad(roll);   // Roll (around Z-axis)
    }
}

// Key press event listener
document.addEventListener('keydown', function (event) {
    const step = 5; // Step size for rotation in degrees

    switch (event.key.toLowerCase()) {
        case 'r': // Roll adjustment
            roll = 5;
            document.getElementById('command').innerHTML='Roll'
            console.log(`Roll: ${roll}`);
            break;
        case 'f': // Reverse Roll
            roll = -35;
            document.getElementById('command').innerHTML='Roll'
            console.log(`Roll: ${roll}`);
            break;
        case 'p': // Pitch adjustment
            pitch = 60;
            document.getElementById('command').innerHTML='Pitch'
            console.log(`Pitch: ${pitch}`);
            break;
        case 'l': // Reverse Pitch
            pitch = -14;
            document.getElementById('command').innerHTML='Pitch'
            console.log(`Pitch: ${pitch}`);
            break;
        case 'y': // Yaw adjustment
            yaw = 81;
            document.getElementById('command').innerHTML='Yaw'
            console.log(`Yaw: ${yaw}`);
            break;
        case 'h': // Reverse Yaw
            yaw = -24;
            document.getElementById('command').innerHTML='Yaw'
            console.log(`Yaw: ${yaw}`);
            break;
        case 'e': // Reverse Yaw
            roll = -15;   // Initial roll
            pitch = 35;   // Initial pitch
            yaw = 26;     // Initial yaw
            document.getElementById('command').innerHTML=' '
            console.log(`Yaw: ${yaw}`);
            break;
    }


    rotateModel(roll, pitch, yaw); // Update model rotation
    yaw=0
    pitch=0
    roll=0
});

// Render loop
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();

// Resize window adjustments
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
