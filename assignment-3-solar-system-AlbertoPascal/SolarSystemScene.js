var renderer = null,  //más planetas con sus órbitas. 
scene = null, 
camera = null,
solarSystem = null,
cube = null,
sphereGroup = null,
current_angle=0,
sphere = null,
cone = null;
var angleTras=0;
var sun_radius=0;
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
    //console.log(angle);

    // Rotate the cube about its Y axis
    //sun.rotation.y += angle;

    // Rotate the sphere group about its Y axis
    
    //solarSystem.rotation.y -= angle/2;
    angular_velocity= velocity/sun_radius;
    Earth.rotation.y-=5*angle/2;
    sun.rotation.y-=0.5*angle/2;
    moveAround(Earth, 15, current_angle, 365); //tarda 365 días en dar la vuelta al sol
    moveAround(EarthMoon, 2, current_angle, 15) //tarda aproximadamente 27 días en dar la vuelta a la tierra pero con 15 se ve mejor
    current_angle++;
//console.log(current_angle);
    //sphereGroup.rotation.y -= 5*angle / 2;
    EarthMoon.rotation.y-=2*angle/2;
    Mercury.rotation.y -= 3*angle/2;
    moveAround(Mercury,6, current_angle, 88); //tarda 88 días en dar la vuelta al sol
    Venus.rotation.y-= 2*angle/2;
    moveAround(Venus,10,current_angle, 225); //tarda 225 días en dar la vuelta al sol
    Mars.rotation.y-= 1.5*angle/2;
    moveAround(Mars,20,current_angle,687) //tarda 687 días en dar la vuelta al sol
    Jupiter.rotation.y -=angle/2;
    moveAround(Jupiter, 25, current_angle, 365*3); //tarda 11 años en dar una vuelta pero se pondrá a escala menor para que sea visualmente apreciable
    Saturn.rotation.y -= angle/2;
    moveAround(Saturn, -30, current_angle, 365*4);

    //rotateAndTranslate(EarthMoon, 2, 100,100,angle);
    //sphere.rotation.x += angle;
    //rotateAndTranslate(EarthMoon, 4, 100, 2600, 2);
    // Rotate the cone about its X axis (tumble forward)
//    cone.rotation.z += angle; 
   // rotateAndTranslate(Earth, 4, 100, 3600, 2);
    //rotateAndTranslate(EarthMoon, 2, 10000, 2600, 2);
    
   // sun2.position.x = Math.cos(angular_velocity * Math.PI / 180) * angle;
    //sun2.position.z = Math.sin(angular_velocity * Math.PI / 180) * angle;
    angular_velocity++;
    //console.log(obj.position.x + " " + obj.position.z + " ", angleTras);
    //angleTras++;
    //rotateAndTranslate(sun2, 4, 100, 4, 200);
  // console.log(sun2.position);
    //rotateAndTranslate(sun2,4,100,4,200)
}

function run() {
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();
}
function createSun()
{
    var SunSpot = new THREE.Object3D;
    sun_radius=4;

    var texture = new THREE.TextureLoader().load("../images/sunbump.jpg");
    var bump = new THREE.TextureLoader().load("../images/sunbump.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.10 });

    // Create the sphere geometry
    geometry = new THREE.SphereGeometry(sun_radius, 20, 20);
    
    // And put the geometry and material together into a mesh
    planet = new THREE.Mesh(geometry, material);

    // Add the sphere mesh to our group
    SunSpot.add( planet );


    SunSpot.position.set(0, 0,0);

    return SunSpot;

}
function AddMoonToPlanet(moon_size, Planet, moon_positionX, moon_positionY, moon_positionZ, moon_material)
{
    var LunasGroup= new THREE.Object3D;

    geometry = new THREE.SphereGeometry(moon_size,20,20);
    var moon= new THREE.Mesh(geometry,moon_material);
    Planet.add(LunasGroup);
    LunasGroup.add(moon);
    LunasGroup.position.set(moon_positionX,moon_positionY,moon_positionZ);
    //console.log(moon.position);
    return LunasGroup;
}
function createPlanetWithMoons(size, position, material)
{
    var newPlanets = new THREE.Object3D;
    Planet_radius = size;

    geometry = new THREE.SphereGeometry(size, 20, 20);
    planet = new THREE.Mesh(geometry, material);

    newPlanets.add(planet);

    var LunasGroup= new THREE.Object3D;
    newPlanets.add(LunasGroup);
    newPlanets.position.set(0,0,position);
    /*while(number_moons>0)
    { //quiero poner más lunas. Deben girar en el objeto así que debo hacer otro THREE.Object3D. 
        geometry = new THREE.SphereGeometry(size/5, 20, 20); //que la luna sea de 1/5  de su tamaño. 
        moon=new THREE.Mesh(geometry, moon_material);
        LunasGroup.add(moon);
        LunasGroup.position.set(1,1,-1.5);
        console.log(newPlanets.position);
        console.log(LunasGroup.position);
        number_moons--;
    }*/
    //rotateAndTranslate(planet, position, 88,360,88);
    return newPlanets;

}

function addRings(System, radius)
{
    var texture = new THREE.TextureLoader().load("../images/saturnringcolor.jpg");
    var bump = new THREE.TextureLoader().load("../images/saturnringcolor.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });
    geometry = new THREE.CylinderGeometry(radius +1.2, radius +1.2, 0.01, 360 );
    ring = new THREE.Mesh(geometry, material);
    System.add(ring);
    ring.position.set(0,0,0,);
    return ring;
}
function moveAround(System, orbit_radius, current_angle, days)
{
    var x=0;
    var y=0;
    //console.log("antes estaba en " + System.position.x);

    x = Math.sin(1/days * current_angle) * orbit_radius;
    z= Math.cos(1/days * current_angle) * orbit_radius;
    //console.log("ahora estaba en " + System.position.x);
    //console.log("angle vale " + current_angle)

    System.position.set(x,0,z);
    //      console.log("entré");
    current_angle++;
}
function drawOrbit(orbit_radius){
    //(Sólo para este método: ) Esta parte del código fue investigada y utilizada de : https://threejs.org/docs/#api/en/geometries/CircleGeometry y 
    //de https://www.w3resource.com/javascript-exercises/javascript-drawing-exercise-2.php
    var geom  = new THREE.CircleGeometry(orbit_radius,90);
    var mat= new THREE.MeshBasicMaterial({color:0xffffff});
    var circle = new THREE.LineLoop( geom, mat);
    geom.vertices.shift();
    circle.rotation.x=Math.PI/2;
    return circle;
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
    light.position.set(2, 2, 0);
    light.target.position.set(0,0,0);
    light2.position.set(-2, 2, 0);
    light2.target.position.set(0,0,0);
    solarSystem.add(light);
    solarSystem.add(light2);


    var textureUrl = "../images/ash_uvgrid01.jpg";
    var texture = new THREE.TextureLoader().load(textureUrl);
    var material = new THREE.MeshPhongMaterial({ map: texture });

    // Create the cube geometry
    var geometry = new THREE.SphereGeometry(1.5, 20, 20);

    // And put the geometry and material together into a mesh
    sun = createSun();

    // Tilt the mesh toward the viewer
    sun.rotation.x = Math.PI / 5;
    sun.rotation.y = Math.PI / 5;
    solarSystem.rotation.x = 0.7;
    solarSystem.rotation.y=-1.3;

    // Add the cube mesh to our group
    solarSystem.add( sun );
    var material = new THREE.MeshPhongMaterial({ map: texture });

    // Create the cube geometry
    var geometry = new THREE.SphereGeometry(1.5, 20, 20);

    // Create a group for the sphere
    var texture = new THREE.TextureLoader().load("../images/earth_atmos.jpg");
    var bump = new THREE.TextureLoader().load("../images/earthbump1k.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });

    Earth = createPlanetWithMoons(1,-10, material);


    var texture = new THREE.TextureLoader().load("../images/moon_1024.jpg");
    var bump = new THREE.TextureLoader().load("../images/moon_bump.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });


    EarthMoon= AddMoonToPlanet(0.27, Earth, 1,1,-1.5, material); //nuestra luna es de tamaño de 27% el de la tierra. 
    solarSystem.add(Earth);
    solarSystem.add(drawOrbit(15));
     var texture = new THREE.TextureLoader().load("../images/mercurymap.jpg");
    var bump = new THREE.TextureLoader().load("../images/mercurybump.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });
    Mercury = createPlanetWithMoons(0.32,-6, material); //sólo un poco más grande que nuestra luna. 
    solarSystem.add(Mercury);
    solarSystem.add(drawOrbit(6));

    var texture = new THREE.TextureLoader().load("../images/venusmap.jpg");
    var bump = new THREE.TextureLoader().load("../images/venusbump.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });
    Venus = createPlanetWithMoons(0.815 ,-10, material); //Venus tiene el 81.5% del tamaño de la tierra. 
    solarSystem.add(Venus);
    solarSystem.add(drawOrbit(10));

    var texture = new THREE.TextureLoader().load("../images/marsmap1k.jpg");
    var bump = new THREE.TextureLoader().load("../images/marsbump1k.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });
    Mars = createPlanetWithMoons(0.53, -20, material); //Marte es 53% el tamaño de la tierra
    solarSystem.add(Mars);
    solarSystem.add(drawOrbit(20));

    var texture = new THREE.TextureLoader().load("../images/jupitermap.jpg");
    var bump = new THREE.TextureLoader().load("../images/jupitermap.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.01 });
    Jupiter = createPlanetWithMoons(2.33,-25, material);
    solarSystem.add(Jupiter);
    solarSystem.add(drawOrbit(25));

    var texture = new THREE.TextureLoader().load("../images/saturnmap.jpg");
    var bump = new THREE.TextureLoader().load("../images/saturnmap.jpg");
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.05 });
    Saturn = createPlanetWithMoons(1.95, -30, material); //    
    //ring= addRings(Saturn,2); 
    //Saturn.add(ring);
    solarSystem.add(Saturn);
    solarSystem.add(drawOrbit(30));

    /*sphereGroup = new THREE.Object3D;
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
    sphereGroup.add( cone ); */
    
    // Now add the group to our scene
    scene.add( solarSystem );
}