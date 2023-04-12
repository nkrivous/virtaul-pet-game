import foxSvg from "../assets/fox";
import dogSvg from "../assets/dog";
import "./MainMenuUI.css";

export class MainMenuUI {
  private menuElement: HTMLElement;

  constructor(
    private appElement: HTMLElement,
    private onFetchPet: (appearanceDescription: string) => Promise<string>,
    private onPetSelected: (petName: string, svg: string) => void
  ) {
    this.menuElement = document.createElement("div");
    this.menuElement.classList.add("main-menu");
  }

  render() {
    const petSelectionContainer = this.composePetSelectionContainer();
    this.menuElement.appendChild(petSelectionContainer);

    const randomizerContainer = this.composeRandomizerContainer();
    this.menuElement.appendChild(randomizerContainer);
    this.appElement.replaceChildren(this.menuElement);
  }

  private composePetSelectionContainer(): HTMLElement {
    const title = document.createElement("h1");
    title.textContent = "Tamagotchi Game";
    this.menuElement.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.className = "main_menu__subtitle";
    subtitle.textContent = "Choose your pet";
    this.menuElement.appendChild(subtitle);

    const petSelectionContainer = document.createElement("div");
    petSelectionContainer.classList.add("main_menu__pet_selection_container");

    const catButton = document.createElement("button");
    catButton.classList.add("main_menu__button");
    catButton.innerHTML = foxSvg;
    catButton.addEventListener("click", () => {
      this.onPetSelected("cat", foxSvg);
    });

    const dogButton = document.createElement("button");
    dogButton.classList.add("main_menu__button");
    dogButton.innerHTML = dogSvg;
    dogButton.addEventListener("click", () => {
      this.onPetSelected("dog", dogSvg);
    });

    petSelectionContainer.appendChild(catButton);
    petSelectionContainer.appendChild(dogButton);
    return petSelectionContainer;
  }

  private composeRandomizerContainer(): HTMLElement {
    const randomizerContainer = document.createElement("div");

    const randomizerTitle = document.createElement("h2");
    randomizerTitle.textContent = "Randomizer";
    randomizerContainer.appendChild(randomizerTitle);

    const subtitle = document.createElement("p");
    subtitle.className = "main_menu__subtitle";
    subtitle.textContent = "Or create a unique appearance";
    randomizerContainer.appendChild(subtitle);

    const randomizerForm = document.createElement("form");
    randomizerForm.className = "main_menu__randomizer_form";
    randomizerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const petSvg = await this.onFetchPet(randomizerInput.value);

      randomizerInput.value = "";

      const randomPetButton = document.createElement("button");
      randomPetButton.classList.add("main_menu__button");
      randomPetButton.innerHTML = petSvg;
      randomPetButton.addEventListener("click", async () => {
        this.onPetSelected("random", petSvg);
      });
      randomPetContainer.childNodes.forEach((child) => {
        randomPetContainer.removeChild(child);
      });
      randomPetContainer.appendChild(randomPetButton);
    });

    const randomizerInput = document.createElement("textarea");
    randomizerInput.classList.add("main_menu__randomizer_input");
    randomizerInput.placeholder = "Rainbow on forehead";

    const randomizerButton = document.createElement("button");
    randomizerButton.className = "main_menu__randomizer_submit";
    randomizerButton.textContent = "Imagine";
    randomizerForm.appendChild(randomizerInput);
    randomizerForm.appendChild(randomizerButton);
    randomizerContainer.appendChild(randomizerForm);

    const randomPetContainer = document.createElement("div");
    randomPetContainer.classList.add("main_menu__random_pet_container");
    randomizerContainer.appendChild(randomPetContainer);

    return randomizerContainer;
  }
}
