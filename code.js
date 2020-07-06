var x, y, z;
var askButton;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

	x = 0;
  y = 0;
  z = 0;

  if (typeof DeviceMotionEvent.requestPermission === 'function' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
        needPermissionsRequest = true;
        askButton = createButton('Begin');
        askButton.size(windowWidth*6/8, windowHeight/8);
        askButton.position(windowWidth/2 - askButton.width/2, windowHeight/2);
        askButton.mousePressed(() => {
          DeviceMotionEvent.requestPermission()
          .then(response => {
            if (response != 'granted') {
              permissions = false;
            } else {

              DeviceOrientationEvent.requestPermission()
              .then(response => {
                if (response != 'granted') {
                  permissions = false;
                } else {
                  askButton.remove();
                }
              }).catch(console.error);

            }
          }).catch(console.error);
        });
  }

  //if (permissions = true) askButton.remove();

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
