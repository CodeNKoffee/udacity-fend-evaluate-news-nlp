  // formHandler.js

  /**
   * Checks if a URL is valid.
   * @param {string} url - The URL to check.
   * @returns {boolean} - True if the URL is valid, false otherwise.
   */
  export function checkForURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Handles the form submission.
   * Prevents default form submission, validates the URL, and sends a request to the server.
   * @param {Event} event - The submit event.
   */
  export function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (checkForURL(formText)) {
      console.log("::: Form Submitted :::");

      // Send a POST request to the server with the URL
      fetch('http://localhost:8080/api/analyze', { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText })
      })
      .then(response => response.json())
      .then(data => {
        // Update the UI with the results from the server
        console.log('API Results:', data);
        document.getElementById('results').innerHTML = JSON.stringify(data); 
      })
      .catch(error => {
        console.error('Error:', error);
      });

    } else {
      alert('Please enter a valid URL');
    }
  }