var x, y, z;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

  DeviceMotionEvent.requestPermission()
  .then(response => {
    if (response != 'granted') {
      noLoop();
    }
  })
  .catch(console.error);

	x = 0;
  y = 0;
  z = 0;


}

function draw(){
  background(255, 255, 255, 255);
  translate(-width/2, 0, -600);

  // rotate the box based on accelerometer data
  // we could use rotationX,Y here but demonstrating
  // acceleration
  x+=accelerationX*0.05;
  y+=accelerationY*0.05;
  z+=accelerationZ*0.05;
  normalMaterial();
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(200, 200, 200);

}
