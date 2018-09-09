var renderer = null, 
scene = null, 
camera = null,
solarSystem = null,
cube = null,
sphereGroup = null,
sphere = null,
cone = null;
sun_radius=0;
var sun2=null;
var duration = 5000; // ms
var currentTime = Date.now();
velocity=10;
var planetGroup, planet_1, planet_2;
var planet_1_orbit;

function animate() 
{
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    var movement = now * 0.001;

    // Rotate the cube about its Y axis
    sun.rotation.y += angle;

    // Rotate the sphere group about its Y axis
    anotherPlanetOrbit.rotation.y -= 2*angle/2;
    solarSystem.rotation.y -= angle/2;
    sphereGroup.rotation.y -= 5*angle / 2;
    sphere.rotation.x += angle;

    // Rotate the cone about its X axis (tumble forward)
    cone.rotation.z += angle; 

    angular_velocity= velocity/sun_radius;
    sun2.position.x = Math.cos(angular_velocity * Math.PI / 180) * angle;
    sun2.position.z = Math.sin(angular_velocity * Math.PI / 180) * angle;
    angular_velocity++;
    //console.log(obj.position.x + " " + obj.position.z + " ", angleTras);
    angleTras++;
    //rotateAndTranslate(sun2, 4, 100, 4, 200);
    console.log(sun2.position);
    //rotateAndTranslate(sun2,4,100,4,200)
}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();
}
function createSun(size)
{
    var SunSpot = new THREE.Object3D;
    sun_radius=size;

    var texture = new THREE.TextureLoader().load("../images/sunbump.jpg");
    var bump = new THREE.TextureLoader().load("../images/sunbump.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.10 });

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(size, 20, 20);
    
    // And put the geometry and material together into a mesh
    planet = new THREE.Mesh(geometry, material);

    // Add the sphere mesh to our group
    SunSpot.add( planet );


    SunSpot.position.set(0, 0,0);

    return SunSpot;

}
function rotateAndTranslate(obj, basePosition, angle, days, angleTras) {
    obj.rotation.y += angle / 2;

    let velocity = 365 / (days * 10);

    // Algo así
    
    obj.position.x = Math.cos(angleTras * velocity * Math.PI / 180) * basePosition;
    obj.position.z = Math.sin(angleTras * velocity * Math.PI / 180) * basePosition ;

    //console.log(obj.position.x + " " + obj.position.z + " ", angleTras);
    angleTras++;

}
function createScene(canvas)
{    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color 
    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);

    // Create a group to hold all the objects
    solarSystem = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    var light = new THREE.DirectionalLight( 0xffffff, 1.5);
    var light2 = new THREE.DirectionalLight( 0xffffff, 1.5);
    // var light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set(1, 2, 0);
    light.target.position.set(0,0,0);
    light2.position.set(-1, 2, 0);
    light2.target.position.set(0,0,0);
    solarSystem.add(light);
    solarSystem.add(light2);


    var textureUrl = "../images/ash_uvgrid01.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });

    // Create the cube geometry
    var geometry = new THREE.SphereGeometry(1.5, 20, 20);

    // And put the geometry and material together into a mesh
    sun = createSun(2);

    // Tilt the mesh toward the viewer
    sun.rotation.x = Math.PI / 5;
    sun.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    solarSystem.add( sun );
    var material = new THREE.MeshPhongMaterial({ map: texture });

    // Create the cube geometry
    var geometry = new THREE.SphereGeometry(1.5, 20, 20);

    // Create a group for the sphere
    anotherPlanetOrbit= new THREE.Object3D;
    sun2= new THREE.Mesh(geometry,material);
    sun2.position.set(0,0,0);
    anotherPlanetOrbit.position.set(0,0,0);
    solarSystem.add(anotherPlanetOrbit);
    anotherPlanetOrbit.add(sun2);
    sphereGroup = new THREE.Object3D;
    solarSystem.add(sphereGroup);
    
    // Move the sphere group up and back from the cube
    sphereGroup.position.set(0, 0, -8);

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(0.5, 20, 20);
    
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, material);

    // Add the sphere mesh to our group
    sphereGroup.add( sphere );

    // Create the cone geometry
    //geometry = new THREE.CylinderGeometry(0, .333, 1, 20, 5);
    geometry = new THREE.SphereGeometry(0.2,100,100);
    // And put the geometry and material together into a mesh
    cone = new THREE.Mesh(geometry, material);

    // Move the cone up and out from the sphere
    cone.position.set(1.5, 1.5, -.667);
        
    // Add the cone mesh to our group
    sphereGroup.add( cone );
    
    // Now add the group to our scene
    scene.add( solarSystem );
}