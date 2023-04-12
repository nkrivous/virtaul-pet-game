import { VirtualPetGame } from "./game/VirtualPetGame";

const appElement = document.getElementById("app")!;

const virtualPetGame = new VirtualPetGame(appElement);
virtualPetGame.start();
