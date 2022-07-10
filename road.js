class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - (width / 2);
        this.right = x + (width / 2);

        // JS has infinite constant, but acts weird at animations
        this.infinity = 1000000;
        // Y axes growns down
        this.top = -(this.infinity);
        this.bottom = this.infinity;

        // Road borders
        const topLeft = {x: this.left, y: this.top};
        const topRight = {x: this.right, y: this.top};
        const bottomLeft = {x: this.left, y: this.bottom};
        const bottomRight = {x: this.right, y: this.bottom};

        this.borders = [
            [topLeft, bottomLeft], // Left side border
            [topRight, bottomRight] // Right side border
        ];
    }

    // Method for helping in scaling the lanes of the road
    // and render car in the middle of the lane
    getLaneCenter(laneIndex) {
        const laneWidth = (this.width / this.laneCount);
        // Math.min() is used in case user inputs number higher or smaller the actual lane count is
        return (this.left + (laneWidth / 2) + (Math.min(laneIndex, (this.laneCount - 1)) * laneWidth));
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'white';

        for (let i = 1; i <= (this.laneCount - 1); ++i) {
            const x = lerp(
                this.left,
                this.right,
                (i / this.laneCount) // Percentage of lane position move
            );

            //Make middle lines dashed
            ctx.setLineDash([20, 20]);

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=> {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}