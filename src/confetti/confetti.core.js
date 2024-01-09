const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

const cancelAnimationFrame =
    window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    const maxConfettis = 25;
    const particles = [];

    const possibleColors = [
        "#ff7336",
        "#f9e038",
        "#02cca4",
        "#383082",
        "#fed3f5",
        "#b1245a",
        "#f2733f"
    ];

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function ConfettiParticle(context, W, H) {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(11, 33); // radius
        this.d = Math.random() * maxConfettis + 11;
        this.color =
            possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 33) - 11;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function() {
            context.beginPath();
            context.lineWidth = this.r / 2;
            context.strokeStyle = this.color;
            context.moveTo(this.x + this.tilt + this.r / 3, this.y);
            context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
            return context.stroke();
        };
    }

    function Draw(context, W, H) {
        const results = [];

        // Magical recursive functional love
        requestAnimationFrame(() => Draw(context, W, H));


        context.clearRect(0, 0, W, window.innerHeight);

        for (let i = 0; i < maxConfettis; i++) {
            results.push(particles[i].draw());
        }

        let particle = {};
        let remainingFlakes = 0;
        for (let i = 0; i < maxConfettis; i++) {
            particle = particles[i];

            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) remainingFlakes++;

            // If a confetti has fluttered out of view,
            // bring it back to above the viewport and let if re-fall.
            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                particle.x = Math.random() * W;
                particle.y = -30;
                particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
        }

        return results;
    }

 export const startAnimation = (element, windowWidth) => {
    let clientHeight = element.clientHeight;
    const context = element.getContext("2d");

    for (let i = 0; i < maxConfettis; i++) {
        particles.push(new ConfettiParticle(context, windowWidth, clientHeight));
    }

    element.width = windowWidth;
    element.height = clientHeight;

    Draw(context, windowWidth, clientHeight);
}

export const cancelAnimation = () => {
    cancelAnimationFrame(Draw);
}

export default {startAnimation, cancelAnimation};


