// Import necessary modules
import { handleSubmit } from "./js/formHandler";

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('urlForm');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});

// Export for potential use in testing
export { handleSubmit };