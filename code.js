var x, y, z;
var askButton;

var capture;

function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);

	x = 0;
  y = 0;
  z = 0;

  angleMode(DEGREES);

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

  capture = createCapture({
    audio: false,
    video: {
      width: windowHeight,
      height: windowWidth,
      facingMode: "environment"
    }
  }, function() {
    console.log('capture ready.');
  });
  //capture = createCapture(VIDEO);

  //capture.elt.setAttribute('playsinline', '');
  capture.hide();
  //capture.size(windowWidth, windowHeight);
}

function draw(){
  //background(capture);
  push();
  x += (0.5) * (accelerationX - pAccelerationX) * (deltaTime * deltaTime) + 0;//*0.05;
  y += accelerationY;//*0.05;
  z += accelerationZ;//*0.05;
  normalMaterial();
  rotateZ(rotationZ);
  rotateX(rotationX);
  rotateY(-rotationY);

  translate(0, 0, -400 - x);
  
  box(200, 200, 200);
  pop();

  image(capture, - windowWidth/2, - windowHeight/2);

  // rotate the box based on accelerometer data
  // we could use rotationX,Y here but demonstrating
  // acceleration

  //rotateX(rotationX * 0.05);
  //rotateY(rotationY * 0.05);
  normalMaterial();


}
