import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// GLTF Loader
const loader = new GLTFLoader();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
// House Container
const house = new THREE.Group();
scene.add(house);

// Wall
const bricksColorTexture = textureLoader.load('textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('textures/bricks/ambientOcclusion');
const bricksNormalTexture = textureLoader.load('textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('textures/bricks/roughness.jpg');

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
walls.position.y = 1.25;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

// Door
const doorColorTexture = textureLoader.load('textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg');

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughness: doorRoughnessTexture
    })
);

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
door.position.y = 1; 
door.position.z = 2 + 0.01; 
house.add(door);

// Bushes
loader.load(
    'stylized_bush/scene.gltf',
    (gltf) =>{
        const bush1 = gltf.scene;
        bush1.position.set(1, 0, 2.2);
        bush1.scale.set(0.7, 0.7, 0.7);
        
        // Traverse the children to set castShadow on meshes
        bush1.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        house.add(bush1);
    }
);

loader.load(
    'stylized_bush/scene.gltf',
    (gltf) =>{
        const bush2 = gltf.scene;
        bush2.position.set(-1, 0, 2.2);
        bush2.scale.set(0.6, 0.6, 0.6);
        // Traverse the children to set castShadow on meshes
        bush2.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        house.add(bush2);
    }
);

loader.load(
    'stylized_bush/scene.gltf',
    (gltf) =>{
        const bush3 = gltf.scene;
        bush3.position.set(1.5, 0, 2.3);
        bush3.scale.set(0.45, 0.45, 0.45);
        // Traverse the children to set castShadow on meshes
        bush3.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        house.add(bush3);
    }
);

loader.load(
    'stylized_bush/scene.gltf',
    (gltf) =>{
        const bush4 = gltf.scene;
        bush4.position.set(-1.5, 0, 2.4);
        bush4.scale.set(0.35, 0.35, 0.35);
        // Traverse the children to set castShadow on meshes
        bush4.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        house.add(bush4);
    }
);

// Bush

loader.load(
    'tall_bush/scene.gltf',
    (gltf) =>{
        const tallBush1 = gltf.scene;
        tallBush1.position.set(5, 0 , -7);
        tallBush1.scale.set(0.8, 0.8, 0.8);
        
        // Traverse the children to set castShadow on meshes
        tallBush1.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        scene.add(tallBush1);
    }
);

loader.load(
    'tall_bush/scene.gltf',
    (gltf) =>{
        const tallBush2 = gltf.scene;
        tallBush2.position.set(-7, 0 , 4);
        tallBush2.scale.set(0.5, 0.5, 0.5);
        
        // Traverse the children to set castShadow on meshes
        tallBush2.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        scene.add(tallBush2);
    }
);


// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveTexture = textureLoader.load('textures/grave/grave2.jpg');
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({map: graveTexture});

for(let i = 0; i < 50; i++){
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);

    grave.position.set(x, 0.3, z);

    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    
    grave.castShadow = true;
    graves.add(grave);
}

// Floor
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

// to fix the large texture of the grass
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

floor.receiveShadow = true;
floor.rotation.x = - Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
//gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.castShadow = true;
moonLight.position.set(4, 5, - 2);
moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

// Configure shadow camera
moonLight.shadow.camera.left = -10;
moonLight.shadow.camera.right = 10;
moonLight.shadow.camera.top = 10;
moonLight.shadow.camera.bottom = -10;
moonLight.shadow.camera.near = 1;
moonLight.shadow.camera.far = 50;

// Improve shadow quality
moonLight.shadow.mapSize.width = 2048; // Increase resolution
moonLight.shadow.mapSize.height = 2048;

gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;
house.add(doorLight);

// Bush Lights
const bushLight = new THREE.PointLight(0xffffff, 1, 3);
bushLight.position.set(5, 2.2 , -6);
scene.add(bushLight);

/**
* Ghosts
*/
const ghost1 = new THREE.PointLight('#D42F73', 2, 3);
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#DC7916', 2, 3);
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#0BB3B6', 2, 3);
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;
scene.add(ghost3);


/**
 * Fog
 */

const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setClearColor('#262837');
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Activating the shadows
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);
    const ghost2Angle = - elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    const ghost3Angle = - elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()