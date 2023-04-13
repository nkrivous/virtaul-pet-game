import { VirtualPetGame } from "./game/VirtualPetGame";

const appElement = document.getElementById("root")!;

const virtualPetGame = new VirtualPetGame(appElement);
virtualPetGame.start();
