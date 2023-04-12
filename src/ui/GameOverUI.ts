export class GameOverUI {
  constructor(private appElement: HTMLElement, private onRestart: () => void) {}

  render() {
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game_over__container");

    const gameOverTitle = document.createElement("h1");
    gameOverTitle.textContent = "Game Over";
    this.appElement.appendChild(gameOverContainer);

    const gameOverMessage = document.createElement("p");
    gameOverMessage.textContent = "Your pet has died.";
    gameOverContainer.appendChild(gameOverMessage);

    const restartButton = document.createElement("button");
    restartButton.classList.add("game_over__button");
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", () => {
      this.onRestart();
    });
    gameOverContainer.appendChild(restartButton);

    this.appElement.replaceChildren(gameOverContainer);
  }
}
