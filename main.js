const canvas = document.getElementById("myCanvas");
// Random value, might be changed later
canvas.width = 250;

// Get drawing context
const ctx = canvas.getContext("2d");

// Road animation
const road = new Road((canvas.width / 2), (canvas.width * 0.9));

// Draw the car
const car = new Car(road.getLaneCenter(1), 125, 30, 50);
car.draw(ctx);

// Listener for keyboard buttons presses
animate();
function animate() {
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    // Causes calling the animate() method periodically
    requestAnimationFrame(animate);
}