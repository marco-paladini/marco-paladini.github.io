import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// create a 3D graphics scene
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
scene.fog = new THREE.Fog(0xffffff, 0, 750);

const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.up.set(0, 0, 1) // robotics world Z points UP by convention

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

// add a floor
const floor_material = new THREE.MeshStandardMaterial( {color: 0x7d7d7d, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), floor_material);
const grid = new THREE.GridHelper( 100, 100 );
grid.rotateX(- Math.PI / 2 );
grid.material.opacity = 0.25;
grid.material.transparent = true;
scene.add( grid );
scene.add( floor );


// add a cube
const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshStandardMaterial( {
  color: 0x00ff00, // green color
  roughness: 0.4,
  metalness: 0.7
});
const cube = new THREE.Mesh( geometry, material );
// place cube on top of the floor
cube.position.z += 0.25;
scene.add( cube );

// add a squashed sphere
const sphere_geometry = new THREE.SphereGeometry( 0.5, 10, 10 );
sphere_geometry.scale(0.2, 1, 1);
const wireframe = new THREE.WireframeGeometry( sphere_geometry );
const sphere = new THREE.LineSegments( wireframe );
sphere.material.depthTest = false;
sphere.material.opacity = 0.25;
sphere.material.transparent = true;
sphere.position.x += 2.0;
sphere.position.z += 0.5;
scene.add( sphere );

// set camera position
camera.position.z = 2.0;
camera.position.y = 5;
camera.position.x = 1;
camera.lookAt(new THREE.Vector3( 0, 0, 0 ));
// run render loop
function animate() {
  cube.rotation.z += 0.1;
  sphere.rotation.x += 0.1;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );
