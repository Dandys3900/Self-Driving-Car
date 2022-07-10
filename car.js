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

        // For collision of a car and some obstacles
        this.damaged = false;

        this.sensor = new Sensor(this);
        this.control = new Controls();
    }

    update(roadBoarders) {
        // If the car crashes, don´t move the car anymore
        if (!this.damaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.damaged = this.#detectDamage(roadBoarders);
        }
        this.sensor.update(roadBoarders);
    }

    #detectDamage(roadBoarders) {
        for (let i = 0; i < roadBoarders.length; ++i) {
            if (polysIntersect(this.polygon, roadBoarders[i])) {
                return true;
            }
        }
        return false;
    }

    // Get car´s corners to detect collisions
    #createPolygon() {
        // 4 corners, 4 points
        const points = [];
        // Calculate the distance between the car´s center and a corner
        const rad = (Math.hypot(this.width, this.height) / 2);
        // Calculate the angle of diagonal of the opposite corners (přepona v trojúhelníku)
        const alpha = Math.atan2(this.width, this.height);

        // Push coordinates of each corner to the array
        points.push({
            x:this.x-Math.sin(this.angle - alpha) * rad,
            y:this.y-Math.cos(this.angle - alpha) * rad
        });

        points.push({
            x:this.x-Math.sin(this.angle + alpha) * rad,
            y:this.y-Math.cos(this.angle + alpha) * rad
        });

        points.push({
            x:this.x-Math.sin(Math.PI + this.angle - alpha) * rad,
            y:this.y-Math.cos(Math.PI + this.angle - alpha) * rad
        });

        points.push({
            x:this.x-Math.sin(Math.PI + this.angle + alpha) * rad,
            y:this.y-Math.cos(Math.PI + this.angle + alpha) * rad
        });

        return points;
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
        if (this.damaged) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "black";
        }

        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; ++i) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        // Draw car´s sensors rays
        this.sensor.draw(ctx);
    }
}