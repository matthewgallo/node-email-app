document.addEventListener("DOMContentLoaded", () => {
	const submitButton = document.querySelectorAll('#submit-email-button');
	const emailMessage = document.querySelectorAll('#email-message-text-area');
	if (submitButton) {
		submitButton[0].addEventListener('click', (event) => {
			event.preventDefault();
			const data = {
				emailMessageValue: emailMessage[0].value,
			}
			(async () => {
				const rawResponse = await fetch('/send', {
				  method: 'POST',
				  headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				  },
				  body: JSON.stringify(data)
				});
				const content = await rawResponse;
			  
				console.log(content);
				if (content.status === 200) {
					const emailForm = document.querySelectorAll('#email-form');
					const appContainer = document.querySelectorAll('#app-container');
					const successMessageElement = document.createElement("P");
					const successMessage = document.createTextNode("Congratulations, your email sent successfully!");
					successMessageElement.appendChild(successMessage);
					appContainer[0].appendChild(successMessageElement);   
					emailForm[0].style.display = 'none';
				} else {
					const appContainer = document.querySelectorAll('#app-container');
					const successMessageElement = document.createElement("P");
					const successMessage = document.createTextNode("Uh oh, something went wrong!");
					successMessageElement.appendChild(successMessage);
					appContainer[0].appendChild(successMessageElement);   
				}
			  })();
		});
	}
});