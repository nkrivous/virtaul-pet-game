import { Pet, PetState } from "../entities/Pet";
import { MainMenuUI } from "../ui/MainMenuUI";
import { PetUI } from "../ui/PetUI";
import { getRandomFromList } from "../utils/common";
import { GameOverUI } from "../ui/GameOverUI";

export enum GameState {
  MainMenu,
  InGame,
  GameOver,
}

export class VirtualPetGame {
  private currentState: GameState;
  private pet: Pet | null = null;
  private petSvg: string | null = null;

  constructor(private appElement: HTMLElement) {
    this.currentState = GameState.MainMenu;
  }

  start() {
    this.updateUI();
  }

  private updateUI() {
    switch (this.currentState) {
      case GameState.MainMenu: {
        const mainMenu = new MainMenuUI(
          this.appElement,
          this.fetchVirtualPet.bind(this),
          this.handlePetSelection.bind(this)
        );
        mainMenu.render();
        break;
      }
      case GameState.InGame: {
        const petUI = new PetUI(this.appElement, this.pet!, this.petSvg!);
        petUI.render();
        this.decayPet(this.pet!, petUI);
        break;
      }
      case GameState.GameOver: {
        const gameOverUI = new GameOverUI(
          this.appElement,
          this.handleRestart.bind(this)
        );
        gameOverUI.render();
        break;
      }
    }
  }

  private async fetchVirtualPet(appearanceDescription: string) {
    let svg: string;
    try {
      const svgRezult = await fetch(import.meta.env.VITE_SVG_CREATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: appearanceDescription }),
      });
      const svgData = (await svgRezult.json()) as string;
      const svgMatches = /<svg[\s\S]*<\/svg>/.exec(svgData);
      if (!svgMatches) {
        throw new Error("SVG not found");
      }
      svg = svgMatches[0];
    } catch (error) {
      const fileName = getRandomFromList(["alien", "creature", "robot"]);
      svg = (await import(`../assets/${fileName}`)).default;
    }
    return svg;
  }

  private handlePetSelection(name: string, petSvg: string) {
    this.pet = new Pet(name);
    this.petSvg = petSvg;
    this.currentState = GameState.InGame;
    this.updateUI();
  }

  private handleRestart() {
    this.pet = null;
    this.petSvg = null;
    this.currentState = GameState.MainMenu;
    this.updateUI();
  }

  private decayPet(pet: Pet, petUI: PetUI) {
    const interval = setInterval(() => {
      if (pet) {
        pet.decay();
        petUI.update();
        if (pet.status === PetState.DEAD) {
          clearInterval(interval);
          this.currentState = GameState.GameOver;
          this.updateUI();
        }
      }
    }, 5000);
  }
}
