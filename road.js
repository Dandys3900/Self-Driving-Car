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

        for (let i = 0; i <= this.laneCount; ++i) {
            const x = lerp(
                this.left,
                this.right,
                (i / this.laneCount) // Percentage of lane position move
            );

            //Make middle lines dashed
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]);
            }
            else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}