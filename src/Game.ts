import { Application, Sprite, Container, Graphics, filters } from "pixi.js";
import { gsap } from "gsap";

const gameWidth: number = 1280;
const gameHeight: number = 720;
const symbolHeight: number = 180;
const reelWidth: number = 196; // Space between reels
const gapBetweenReels: number = 4; // Gap between individual reels

const app = new Application<HTMLCanvasElement>({
    backgroundColor: 0xffffff,
    width: gameWidth,
    height: gameHeight,
});

export class Game {
    private reels: { container: Container; symbols: Sprite[] }[] = [];
    private isSpinning: boolean = false;
    private spinButton!: Sprite;
    private grayscaleFilter = new filters.ColorMatrixFilter();

    constructor() {
        document.body.appendChild(app.view);
        this.resizeCanvas();
        this.init();
        app.stage.interactive = true;
    }

    private init(): void {
        // Init background
        const background = Sprite.from("background_normalgame");
        app.stage.addChild(background);

        // Define symbols for each reel
        const reelSymbols = [
          ["J", "J", "A", "K", "P", "Q", "K", "P", "K", "J", "A", "K", "P", "Q", "K", "P"], // Reel 1
          ["Q", "Q", "A", "J", "P", "A", "J", "Q", "J", "J", "A", "K", "P", "Q", "K", "J"], // Reel 2
          ["J", "A", "A", "Q", "K", "A", "J", "Q", "Q", "J", "A", "K", "P", "Q", "K", "K"], // Reel 3
          ["A", "K", "P", "J", "Q", "A", "J", "Q", "P", "J", "A", "K", "P", "Q", "K", "P"], // Reel 4
          ["K", "A", "J", "J", "Q", "A", "J", "Q", "P", "J", "A", "K", "P", "Q", "K", "A"], // Reel 5
        ];

        // Create reels dynamically
        reelSymbols.forEach((symbols, index) => {
          const reelContainer = new Container();
          reelContainer.x = 240 + index * (reelWidth + gapBetweenReels);
          reelContainer.y = 100;
          reelContainer.sortableChildren = true; // Enable zIndex sorting
          app.stage.addChild(reelContainer);
      
          const sprites = symbols.map((texture, i) => {
              const symbol = Sprite.from(texture);
              symbol.anchor.set(0.5, 0.5);
              symbol.x = 0;
              symbol.y = i * symbolHeight + symbolHeight / 2;
      
              // Assign a higher zIndex to "P" symbols
              if (texture === "P") {
                  symbol.zIndex = 10; // Higher zIndex so "P" is always on top
              } else {
                  symbol.zIndex = 1;
              }
      
              reelContainer.addChild(symbol);
              return symbol;
          });
      
          this.reels.push({ container: reelContainer, symbols: sprites });
          this.createMask(reelContainer, index);
        });

        // Spin Button
        this.spinButton = Sprite.from("spinButton");
        this.spinButton.setTransform(1050, 520);
        this.spinButton.eventMode = "static";
        this.spinButton.cursor = "pointer";
        this.spinButton.on("pointerdown", this.onClickSpin);
        app.stage.addChild(this.spinButton);
    }

    private createMask(reelContainer: Container, index: number): void {
        const mask = new Graphics();
        mask.beginFill(0x000000);
        mask.drawRect(reelContainer.x - 98, 100, reelWidth , symbolHeight * 3);
        mask.endFill();
        app.stage.addChild(mask);
        reelContainer.mask = mask;
    }

    private onClickSpin = () => {
        this.spinStart();
    };

    private spinStart(): void {
        if (this.isSpinning) return;
        this.isSpinning = true;
  
        // Apply grayscale effect to spin button
        this.grayscaleFilter.desaturate();
        this.spinButton.filters = [this.grayscaleFilter];
  
        this.reels.forEach((reel, index) => {
            const spinDuration = 2 + index * 0.2; // Base duration with staggered effect
            const randomPositions = Math.floor(Math.random() * 10) + 5;
            const totalSpinDistance = randomPositions * symbolHeight;
  
            // Apply blur filter with initial value of 0
            const blurFilter = new filters.BlurFilter();
            blurFilter.blur = 0; // Initially no blur
            
            // Add blur effect to reel container
            reel.container.filters = [blurFilter];
  
            gsap.to(reel.symbols, {
                y: `+=${totalSpinDistance}`,
                duration: spinDuration,
                ease: "power2.in",
                onUpdate: () => this.wrapReel(reel),
                onComplete: () => {
                    // Start the bounce animation IMMEDIATELY after this reel stops spinning
                    this.reelBounce(reel);

                    // If this is the last reel, reset the spin button
                    if (index === this.reels.length - 1) {
                        this.isSpinning = false;
                        this.resetSpinButton();
                    }

                    // Fade out the blur as the reels slow down
                    gsap.to(blurFilter, {
                        blur: 0, // Remove the blur effect
                        duration: 0.3, // Duration of the fade-out
                    });
                },
                onStart: () => {
                    // Delay the fade-in of the blur for 1 second after starting
                    gsap.to(blurFilter, {
                        blur: 3, // Max blur effect when moving fast
                        duration: 0.5, // Gradual fade-in
                        delay: 1, // Start fading in after 1 second of spin
                        ease: "power2.out",
                    });
                }
            });
        });
    }
  
    private reelBounce(reel: { container: Container; symbols: Sprite[] }) {
        gsap.to(reel.symbols, {
            y: "+=15", // Move down slightly
            duration: 0.1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1, // Makes it go back up after dipping
        });
    }

    private wrapReel(reel: { container: Container; symbols: Sprite[] }): void {
        reel.symbols.forEach((symbol) => {
            if (symbol.y > symbolHeight * reel.symbols.length) {
                symbol.y -= symbolHeight * reel.symbols.length;
            }
        });
    }

    private resetSpinButton(): void {
        // Remove grayscale effect after spin
        this.spinButton.filters = [];
    }

    private resizeCanvas(): void {
        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.stage.scale.x = window.innerWidth / gameWidth;
            app.stage.scale.y = window.innerHeight / gameHeight;
        };
        resize();
        window.addEventListener("resize", resize);
    }
}
