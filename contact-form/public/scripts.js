document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const submitButton = document.getElementById('submit-button');
    const submitText = document.getElementById('submit-text');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
  
    // Show loading spinner
    submitText.textContent = 'Sending...';
    loadingSpinner.classList.remove('hidden');
    submitButton.disabled = true;
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Show success message
        successMessage.classList.remove('hidden');
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 3000); // Hide after 3 seconds
        e.target.reset(); // Clear form
      } else {
        // Show error message
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
          errorMessage.classList.add('hidden');
        }, 3000); // Hide after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      errorMessage.classList.remove('hidden');
      setTimeout(() => {
        errorMessage.classList.add('hidden');
      }, 3000); // Hide after 3 seconds
    } finally {
      // Reset button
      submitText.textContent = 'Send Message';
      loadingSpinner.classList.add('hidden');
      submitButton.disabled = false;
    }
  });