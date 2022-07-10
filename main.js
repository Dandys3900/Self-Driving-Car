const canvas = document.getElementById("myCanvas");
// Random value, might be changed later
canvas.width = 250;

// Get drawing context
const ctx = canvas.getContext("2d");

// Road animation
const road = new Road((canvas.width / 2), (canvas.width * 0.9));

// Draw the car
const car = new Car(road.getLaneCenter(1), 125, 30, 50);

// Listener for keyboard buttons presses
animate();
function animate() {
    car.update(road.borders);
    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -(car.y) + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    // Causes calling the animate() method periodically
    requestAnimationFrame(animate);
}