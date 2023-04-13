import { PetAnimations } from "../pet_animation/PetAnimation";
import { Pet } from "../entities/Pet";
import star from "../assets/star";
import "./PetUI.css";
import { getDesignInteraction } from "../canva_api/design_interaction";
import { DesignInteraction } from "../canva_api/design_interaction.d";
import { ImageType, getImageFromElement } from "../utils/image2base64";

type AppElementData = {
  dataUrl: string;
  width: number;
  height: number;
};

type UIState = AppElementData;
export class PetUI {
  petSvgClassName = "pet_ui__pet_svg";
  di: DesignInteraction<any>;

  constructor(
    private appElement: HTMLElement,
    private pet: Pet,
    private petSvg: string
  ) {
    this.di = getDesignInteraction();
    this.di.registerRenderAppElement((data: UIState) => {
      return [{ type: "IMAGE", ...data, top: 0, left: 0 }];
    });
  }

  render() {
    const petContainer = document.createElement("div");
    petContainer.className = "pet_ui__pet_container";

    this.renderTitle(petContainer);
    this.renderPetImageContainer(petContainer);
    this.renderActionButtons(petContainer);
    this.renderStatistics(petContainer);
    this.renderDesignInteractionButton(petContainer);

    this.appElement.replaceChildren(petContainer);
  }

  public update() {
    this.updateLevel();
    this.updateStatistics();
  }

  private renderTitle(petContainer: HTMLElement) {
    const title = document.createElement('h1');
    title.textContent = 'Your Pet';
    petContainer.appendChild(title);
  }

  private renderPetImageContainer(petContainer: HTMLElement) {
    const petImageContainer = document.createElement("div");
    petImageContainer.className = "pet_ui__image_container";

    this.renderPetSvg(petImageContainer);
    this.renderStar(petImageContainer);

    petContainer.appendChild(petImageContainer);
  }

  private renderPetSvg(petImageContainer: HTMLElement) {
    const petElement = document.createElement("div");
    petElement.className = this.petSvgClassName;
    petElement.innerHTML = this.petSvg;
    petImageContainer.appendChild(petElement);
  }

  private renderStar(petImageContainer: HTMLElement) {
    const starElement = document.createElement("div");
    starElement.className = "pet_ui__star";

    const levelSVG = star.replace("LEVEL", "1");
    starElement.innerHTML = levelSVG;
    petImageContainer.appendChild(starElement);
  }

  private renderActionButtons(petContainer: HTMLElement) {
    const petElement = petContainer.querySelector(
      `.${this.petSvgClassName}`
    ) as HTMLElement;

    const actionsContainer = document.createElement("div");
    actionsContainer.className = "pet_ui__actions_container";

    const feedButton = document.createElement("button");
    feedButton.textContent = "🍴 Feed";
    feedButton.classList.add("button", "secondary");
    feedButton.addEventListener("click", async () => {
      this.disableActions(actionsContainer);
      this.pet!.feed();
      this.update();
      await PetAnimations.eating(petElement);
      this.enableActions(actionsContainer);
    });
    actionsContainer.appendChild(feedButton);

    const playButton = document.createElement("button");
    playButton.textContent = "⚽ Play";
    playButton.classList.add("button", "secondary");
    playButton.addEventListener("click", async () => {
      this.disableActions(actionsContainer);
      this.pet!.play();
      this.update();
      await PetAnimations.playing(petElement);
      this.enableActions(actionsContainer);
    });
    actionsContainer.appendChild(playButton);

    const sleepButton = document.createElement("button");
    sleepButton.textContent = "💤 Sleep";
    sleepButton.classList.add("button", "secondary");
    sleepButton.addEventListener("click", async () => {
      this.disableActions(actionsContainer);
      this.pet!.sleep();
      this.update();
      await PetAnimations.sleeping(petElement);
      this.enableActions(actionsContainer);
    });
    actionsContainer.appendChild(sleepButton);

    petContainer.appendChild(actionsContainer);
  }

  public renderStatistics(petContainer: HTMLElement) {
    let statisticsContainer = document.querySelector(
      ".pet_ui__statistics_container"
    );

    statisticsContainer = document.createElement("div");
    statisticsContainer.className = "pet_ui__statistics_container";

    const hungerContainer = document.createElement("div");
    hungerContainer.className = "pet_ui__progress_container";
    const hungerLabel = document.createElement("span");
    hungerLabel.textContent = "Hunger: ";
    hungerContainer.appendChild(hungerLabel);

    const hungerBar = document.createElement("progress");
    hungerBar.id = "hungerBar";
    hungerBar.value = 100;
    hungerBar.max = 100;
    hungerContainer.appendChild(hungerBar);
    statisticsContainer.appendChild(hungerContainer);

    const energyContainer = document.createElement("div");
    energyContainer.className = "pet_ui__progress_container";
    const energyLabel = document.createElement("span");
    energyLabel.textContent = "Energy: ";
    energyContainer.appendChild(energyLabel);

    const energyBar = document.createElement("progress");
    energyBar.id = "energyBar";
    energyBar.value = 100;
    energyBar.max = 100;
    energyContainer.appendChild(energyBar);
    statisticsContainer.appendChild(energyContainer);

    const happinessContainer = document.createElement("div");
    happinessContainer.className = "pet_ui__progress_container";
    const happinessLabel = document.createElement("span");
    happinessLabel.textContent = "Happiness: ";
    happinessContainer.appendChild(happinessLabel);

    const happinessBar = document.createElement("progress");
    happinessBar.id = "happinessBar";
    happinessBar.value = 100;
    happinessBar.max = 100;
    happinessContainer.appendChild(happinessBar);
    statisticsContainer.appendChild(happinessContainer);

    const experienceDisplay = document.createElement("div");
    experienceDisplay.id = "experienceDisplay";
    experienceDisplay.textContent = `Experience: ${this.pet?.state.experience}`;
    statisticsContainer.appendChild(experienceDisplay);

    petContainer.appendChild(statisticsContainer);
  }

  private renderDesignInteractionButton(petContainer: HTMLElement) {
    const designInteractionButton = document.createElement("button");
    designInteractionButton.classList.add("button", "secondary");
    designInteractionButton.textContent = "🎨 Add to design";
    designInteractionButton.addEventListener("click", async () => {
      try {
        const image = await getImageFromElement({
          element: document.querySelector(
            `.${this.petSvgClassName}`
          ) as HTMLElement,

          type: ImageType.SVG,
        });

        this.di.addNativeElement({
          type: "IMAGE",
          dataUrl: image.base64Encode(),
          top: 100,
          left: 100,
          width: image.width,
          height: image.height,
        });

        const image2 = await getImageFromElement({
          element: document.querySelector(`.pet_ui__star`) as HTMLElement,

          type: ImageType.SVG,
        });

        this.di.addNativeElement({
          type: "IMAGE",
          dataUrl: image2.base64Encode(),
          top: 100,
          left: 100 + (image.width / 5) * 4,
          width: image2.width,
          height: image2.height,
        });
      } catch (e) {
        console.log(e);
      }
    });
    petContainer.appendChild(designInteractionButton);
  }

  private enableActions(actionsContainer: HTMLElement) {
    actionsContainer.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
      button.classList.remove("pet_ui__button--disabled");
    });
  }

  private disableActions(actionsContainer: HTMLElement) {
    actionsContainer.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      button.classList.add("pet_ui__button--disabled");
    });
  }

  private updateLevel() {
    const starElement = document.querySelector(".pet_ui__star")!;
    const levelSVG = star.replace(
      "LEVEL",
      this.pet?.state.level.toString() || "1"
    );
    starElement.innerHTML = levelSVG;
  }

  private updateStatistics() {
    const hungerBar = document.querySelector(
      "#hungerBar"
    ) as HTMLProgressElement;
    hungerBar.value = this.pet.state.hunger;

    const energyBar = document.querySelector(
      "#energyBar"
    ) as HTMLProgressElement;
    energyBar.value = this.pet.state.energy;

    const happinessBar = document.querySelector(
      "#happinessBar"
    ) as HTMLProgressElement;
    happinessBar.value = this.pet.state.happiness;

    const experienceDisplay = document.querySelector(
      "#experienceDisplay"
    ) as HTMLDivElement;
    experienceDisplay.textContent = `Experience: ${this.pet?.state.experience}`;
  }
}
