document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the email input value
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;

    // Replace 'YOUR_MAILCHIMP_API_KEY' and 'YOUR_MAILCHIMP_AUDIENCE_ID' with your actual Mailchimp API key and audience ID
    const apiKey = 'abb38f61f344730ff21c5840d240368c-us21';
    const audienceId = ' 8a9225de73';

    // Subscribe to the newsletter using Mailchimp API
    subscribeToNewsletter(email, apiKey, audienceId);
});

function subscribeToNewsletter(email, apiKey, audienceId) {
    const endpoint = `https://<us21>.api.mailchimp.com/3.0/lists/${audienceId}/members`; // Replace <dc> with your Mailchimp data center code

    const data = {
        email_address: email,
        status: 'subscribed', // 'subscribed' adds the user to the list
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`apikey:${apiKey}`)}`,
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        // Replace the alert with your actual success or error handling logic
        if (result.status === 'subscribed') {
            alert('Thank you for subscribing!');
        } else {
            alert('Failed to subscribe. Please try again.');
        }

        // Optionally, you can reset the form after successful submission
        document.getElementById('signupForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to subscribe. Please try again.');
    });
}
