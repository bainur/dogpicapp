import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["breed", "name", "image"]

  connect() {
  }

  async fetch() {
    event.preventDefault();
    const breed = this.breedTarget.value;
    try {
      const response = await fetch(`/home/fetch_image?breed=${breed}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch image for ${breed}`);
      }

      const data = await response.json();

      this.nameTarget.textContent = breed;

      if (data.status === 'error') {
        this.nameTarget.textContent = breed + ' not found.';
        this.imageTarget.removeAttribute('src');
      } else {
        this.imageTarget.src = data.message;
      }
    } catch (error) {
      this.nameTarget.textContent = breed + ' not found.';
      this.imageTarget.removeAttribute('src');
    }
  }
}
