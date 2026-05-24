document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitButton = document.getElementById('submitBtn');
    const responseMessage = document.getElementById('responseMsg');
    
    // Web App URL generated from Google Apps Script deployment
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL';
  
    // Update button visual states to indicate progress
    submitButton.disabled = true;
    submitButton.innerText = "Processing Pipeline...";
  
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value
    };
  
    fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors', // Gracefully passes data across distinct domains
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
        // Handle interface response state updates
        document.getElementById('leadForm').style.display = 'none';
        responseMessage.style.display = 'block';
        responseMessage.innerText = "Queue placement confirmed. A confirmation message has been dispatched to your email address.";
    })
    .catch(error => {
        console.error('Submission pipeline error:', error);
        submitButton.disabled = false;
        submitButton.innerText = "Retry Priority Access";
        alert("Transmission anomaly detected. Please review your network connectivity and try again.");
    });
});
