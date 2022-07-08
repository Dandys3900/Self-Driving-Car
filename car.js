class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // More realistic car movement
        this.speed = 0;
        this.acceleration = 0.2;

        // Randomly selected, max car speed needs to be limited
        this.maxSpeed = 3;
        this.friction = 0.05;

        this.angle = 0;

        this.control = new Controls();
    }

    update() {
        this.#move();
    }

    #move() {
        // Keyboard presses
        if (this.control.forward) {
            this.speed += this.acceleration;
            //this.y -= 2;
        }
        if (this.speed != 0) {
            const flip = (this.speed > 0) ? 1 : -1;

            if (this.control.left) {
                this.angle += (0.03 * flip);
                //this.x -= 2;
            }
            if (this.control.rigth) {
                this.angle -= (0.03 * flip);
                //this.x += 2;
            }
        }
        if (this.control.reverse) {
            this.speed -= this.acceleration;
            //this.y += 2;
        }

        // More realistic car movement
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        // Minus sign "-" to show car is moving backwards
        if (this.speed <-(this.maxSpeed / 2)) {
            this.speed = -(this.maxSpeed / 2);
        }

        // The more car moves the more friction is there and slows the car
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        // Case for stopping the car
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        this.x -= (this.speed * Math.sin(this.angle));
        this.y -= (this.speed * Math.cos(this.angle));
        //this.y -= this.speed;
    }

    draw(ctx) {
        // Car rotation
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-(this.angle));

        ctx.beginPath();
        ctx.rect(
            -(this.width / 2),
            -(this.height / 2),
            this.width,
            this.height
        );

        ctx.fill();
        ctx.restore();
    }
}