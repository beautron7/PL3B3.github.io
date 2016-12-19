var scene,
camera,
renderer,
controls,
hex,
point;

var trackingtrue = false;

var chobe = 1;

var momentum_cam = new THREE.Vector3(0, 0, 0);
var camrapid = .5;
var cubes = [];
var cubenum= 1;

init();

function init()
{
	setscene();
	
	setLights();
	
	createTubers();
	
	render();
	
	setFloor();
	
	for(var l = 0; l < cubenum; l++)
	{
		
	}
	document.addEventListener("keydown", keyinput);
}

function keyinput(event)
{
	event.preventDefault();
	if(event.code == "KeyD")
	{
		console.log("Hi");
		camera.position.z += camrapid;
	}
	if(event.code == "KeyA")
	{
		camera.position.z -= camrapid;
	}
	if(event.code == "KeyS")
	{
		camera.position.x -= camera.getWorldDirection().x;
		camera.position.z -= camera.getWorldDirection().z;
	}
	if(event.code == "KeyW")
	{
		camera.position.x += camera.getWorldDirection().x;
		camera.position.z += camera.getWorldDirection().z;
	}
	if(event.code == "ArrowDown")
	{
		//Forward
		cubes[0].momentum.y += .01;
	}
	if(event.code == "ArrowUp")
	{
		//Back
		cubes[0].momentum.y -= .01;
	}
	
	//toggletracking
	if(event.code == "KeyT")
	{
		trackingtrue = !trackingtrue;
	}
	
	//Camera rotation
	if(event.code == "KeyH")
	{
		momentum_cam.y += .01;
	}
	 if(event.code == "KeyL")
	{
		momentum_cam.y -= .01;
	}
	else
	{
		
	}
}

function render() {
	requestAnimationFrame( render );
	for (var n = 0; n < cubenum; n++)
	{
		cubes[n].position.x += cubes[n].momentum.x;
		cubes[n].position.y += cubes[n].momentum.y;
		cubes[n].position.z += cubes[n].momentum.z;
		cubes[n].momentum.x *= .99;
		if(cubes[n].momentum.x * cubes[n].momentum.x < .000025)
		{
			cubes[n].momentum.x = 0;
		}
		cubes[n].momentum.y *= .99;
		if(cubes[n].momentum.y * cubes[n].momentum.y < .000025)
		{
			cubes[n].momentum.y = 0;
		}
		cubes[n].momentum.z *= .99;
		if(cubes[n].momentum.z * cubes[n].momentum.z < .000025)
		{
			cubes[n].momentum.z = 0;
		}
		// console.log(cubes[n].position.x, cubes[n].position.y, cubes[n].position.z);
	}
	if(trackingtrue == true)
	{
		camera.lookAt(new THREE.Vector3(cubes[0].position.x, cubes[0].position.y, cubes[0].position.z));
	}
	// console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
	camera.rotation.y += momentum_cam.y;
	//This sets camera rotation back to 0;
	momentum_cam.y *= .98;
	if(momentum_cam.y * momentum_cam.y < .0000025)
	{
		momentum_cam.y = 0;
	}
	camera.rotation.x += momentum_cam.x;
	//This sets camera rotation back to 0;
	momentum_cam.x *= .98;
	if(momentum_cam.x * momentum_cam.x < .0000025)
	{
		momentum_cam.x = 0;
	}
	console.log(camera.getWorldDirection().x / camera.getWorldDirection.z);
	renderer.render( scene, camera );
}



function setscene() 
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xff000);
	
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.1, 100);
	camera.position.set(-50, 0, 0);
	camera.rotation.y = - Math.PI / 2;
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth  - 10, window.innerHeight - 10);
	renderer.setClearColor(0xCCFFFF, 1);
	document.body.appendChild(renderer.domElement);
}

function createTubers()
{
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			for ( var i = 0; i < geometry.faces.length; i += 2 ) {
			hex = Math.random() * 0xffffff;
			geometry.faces[ i ].color.setHex( hex );
			geometry.faces[ i + 1 ].color.setHex( hex );
		}
	var material = new THREE.MeshBasicMaterial({
		vertexColors: THREE.FaceColors, 
		overdraw: 5, 
		// wireframe: true
	});
	for(var n = 0; n < cubenum; n++)
	{
		cubes[n] = new THREE.Mesh( geometry, material );
		scene.add( cubes[n]);
		cubes[n].momentum = new THREE.Vector3(0, 0, 0);
		cubes[n].position = (0, 0, 0);
		// cubes[n].position.x = Math.round( -20 + (Math.random() * 40));
		// if((cubes[n].position.x ^ 2) < 25)
		// {
			// cubes[n].position.x *= 1.5;
		// }
		// cubes[n].position.y = Math.round( -2 + (Math.random() * 4));
		// if((cubes[n].position.y ^ 2) < 25)
		// {
			// cubes[n].position.y *= 1.5;
		// }
		// cubes[n].position.z = Math.round( -20 + (Math.random() * 40));
		// if((cubes[n].position.z ^ 2) < 25)
		// {
			// cubes[n].position.z *= 1.5;
		// }
		// cubes[n].position.x += cubes[n].momentum.x;
		// cubes[n].position.y += cubes[n].momentum.y;
		// cubes[n].position.z += cubes[n].momentum.z;
	}
}

function setFloor() {
	var geometry1 = new THREE.BoxGeometry(100, 10, 100);
	for ( var i = 0; i < geometry1.faces.length; i += 2 ) {
		hex = .2 * 0xffffff;
		geometry1.faces[ i ].color.setHex( hex );
		geometry1.faces[ i + 1 ].color.setHex( hex );
	}
	var material1 = new THREE.MeshBasicMaterial({
		vertexColors: THREE.FaceColors, 
		overdraw: 5, 
		// wireframe: true
	});
	cubes[1] = new THREE.Mesh( geometry1, material1);
	scene.add(cubes[1]);
	cubes[1].position.set(0, -6, 0);
}

function setLights() {
  var light = new THREE.AmbientLight(0x404040, 2000);
  scene.add(light);
}