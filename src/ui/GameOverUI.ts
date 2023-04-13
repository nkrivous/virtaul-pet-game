import './GameOverUI.css';

export class GameOverUI {
  constructor(private appElement: HTMLElement, private onRestart: () => void) {}

  render() {
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game_over__container");

    const gameOverTitle = document.createElement("h1");
    gameOverTitle.textContent = "Game Over";
    gameOverContainer.appendChild(gameOverTitle);

    const message = document.createElement("p");
    message.classList.add("paragraph");
    message.textContent = "Your pet has passed away unfortunately ):";
    gameOverContainer.appendChild(message);

    const gif = document.createElement("img");
    gif.src="https://media0.giphy.com/media/BEob5qwFkSJ7G/giphy.gif";
    gameOverContainer.appendChild(gif);

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.classList.add("button", "secondary", "game_over__restart_button");
    restartButton.addEventListener("click", () => {
      this.onRestart();
    });
    gameOverContainer.appendChild(restartButton);

    this.appElement.replaceChildren(gameOverContainer);
  }
}
