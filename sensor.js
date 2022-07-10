class Sensor {
    constructor(car) {
        this.car = car;
        // Rays for detecting objects around the car
        this.rayCount = 5;
        // Sensor´s range
        this.rayLength = 125;
        // Sensor´s angle: 45 degrees
        this.raySpread = Math.PI / 2;
        // Rays array
        this.rays = [];
        // Array for detecting boarders of the road
        this.readings = [];
    }

    update(roadBoarders) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; ++i) {
            this.readings.push(this.#getReading(this.rays[i], roadBoarders));
        }
    }

    // Returns: x, y, offset
    #getReading(ray, roadBoarders) {
        let touches = [];

        for (let i = 0; i < roadBoarders.length; ++i) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                roadBoarders[i][0],
                roadBoarders[i][1]
            );

            if (touch) {
                touches.push(touch);
            }
        }
        // No touches
        if (touches.length == 0) {
            return null;
        }
        else {
            // Offset defines the distance between the car and the obstacle
            // map() returns new array of distances of each touch
            const offsets = touches.map(e=>e.offset);
            // min() doesn´t accept array, "..." operator chops each element of array to pass it to the method
            const minOffset = Math.min(...offsets);
            return touches.find(e=>e.offset == minOffset);
        }
    }

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; ++i) {
            const rayAngle = lerp(
                (this.raySpread / 2),
                -(this.raySpread / 2),
                // For case rayCount will be 1, it will cause dividing by 0
                (this.rayCount == 1 ? 0.5 : (i / (this.rayCount - 1)))
            ) + this.car.angle;

            const start = {x:this.car.x, y:this.car.y};
            const end = {
                x:this.car.x - Math.sin(rayAngle) * this.rayLength,
                y:this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.rayCount; ++i) {
            // Draw detections of borders or obstacles
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";

            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // Draw a line over the obstacle
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";

            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}