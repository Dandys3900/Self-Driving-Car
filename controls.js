class Controls {
    constructor() {
        this.forward = false;
        this.left = false;
        this.rigth = false;
        this.reverse = false;

        this.#addKeyboardListener();
    }

    // # for marking private methods
    #addKeyboardListener() {
        // For pressing the button
        document.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'w':
                        this.forward = true;
                        break;
                    case 'a':
                        this.left = true;
                        break;
                    case 'd':
                        this.rigth = true;
                        break;
                    case 's':
                        this.reverse = true;
                        break;
                }
            }
        );

        // For releasing the button
        document.addEventListener('keyup', (e) => {
                switch (e.key) {
                    case 'w':
                        this.forward = false;
                        break;
                    case 'a':
                        this.left = false;
                        break;
                    case 'd':
                        this.rigth = false;
                        break;
                    case 's':
                        this.reverse = false;
                        break;
                }
            }
        );
    }
}