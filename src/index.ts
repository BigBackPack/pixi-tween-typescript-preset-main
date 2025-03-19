import "./style.css";
import { Game } from "./Game";
import { AssetsLoader } from "./AssetsLoader";

window.onload = async (): Promise<void> =>
{
    await AssetsLoader.loadGameAssets();
    new Game();
};