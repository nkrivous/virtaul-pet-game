import { normalizeSum } from "../utils/common";

export enum PetState {
  HAPPY = "happy",
  HUNGRY = "hungry",
  TIRED = "tired",
  DEAD = "dead",
}

export class Pet {
  private hunger = 100;
  private happiness = 100;
  private energy = 100;
  private experience = 0;

  constructor(public name: string) {}

  feed(): void {
    this.hunger = normalizeSum(this.hunger, 20);
    this.energy = normalizeSum(this.energy, -10);
    this.happiness = normalizeSum(this.happiness, 5);

    this.experience += 10;
  }

  play(): void {
    this.hunger = normalizeSum(this.hunger, -10);
    this.energy = normalizeSum(this.energy, -20);
    this.happiness = normalizeSum(this.happiness, 20);

    this.experience += 20;
  }

  sleep(): void {
    this.hunger = normalizeSum(this.hunger, -5);
    this.energy = normalizeSum(this.hunger, 30);
    this.happiness = normalizeSum(this.hunger, 10);

    this.experience += 5;
  }

  decay(): void {
    this.hunger = normalizeSum(this.hunger, -5);
    this.energy = normalizeSum(this.energy, -5);
    this.happiness = normalizeSum(this.happiness, -5);
  }

  private calcLevel(): number {
    return Math.floor(this.experience / 100) + 1;
  }

  get status(): PetState {
    if (this.hunger <= 0 || this.energy <= 0) {
      return PetState.DEAD;
    }
    if (this.hunger <= 30) {
      return PetState.HUNGRY;
    }
    if (this.energy <= 30) {
      return PetState.TIRED;
    }
    return PetState.HAPPY;
  }

  get state() {
    return {
      hunger: this.hunger,
      happiness: this.happiness,
      energy: this.energy,
      experience: this.experience,
      level: this.calcLevel(),
    };
  }
}
