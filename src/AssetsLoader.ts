import { Assets } from "pixi.js";

export class AssetsLoader
{
    static async loadGameAssets(): Promise<void>
    {
        const manifest = {
            bundles: [
                {
                    name: "assets",
                    assets: [
                        {
                            name: "background_normalgame",
                            srcs: "./assets/background_normalgame.jpg"
                        },
                        {
                            name: "spinButton",
                            srcs: "./assets/spin_button.png"
                        },
                        {
                            name: "T",
                            srcs: "./assets/T.png"
                        },
                        {
                            name: "J",
                            srcs: "./assets/J.png"
                        },
                        {
                            name: "Q",
                            srcs: "./assets/Q.png"
                        },
                        {
                            name: "K",
                            srcs: "./assets/K.png"
                        },
                        {
                            name: "A",
                            srcs: "./assets/A.png"
                        },
                        {
                            name: "P",
                            srcs: "./assets/P.png"
                        },
                    ]
                }
            ],
        };

        await Assets.init({ manifest });
        await Assets.loadBundle(["assets"]);
    }
}