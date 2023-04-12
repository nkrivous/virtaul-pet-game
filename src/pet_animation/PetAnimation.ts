import "./PetAnimation.css";

export class PetAnimations {
  static async eating(element: HTMLElement) {
    await this.toggleAnimation(element, "eating");
  }

  static async playing(element: HTMLElement) {
    await this.toggleAnimation(element, "playing");
  }

  static async sleeping(element: HTMLElement) {
    await this.toggleAnimation(element, "sleeping");
  }

  private static toggleAnimation(element: HTMLElement, animationClass: string) {
    element.classList.add(animationClass);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        element.classList.remove(animationClass);
        resolve();
      }, 2000);
    });
  }
}
