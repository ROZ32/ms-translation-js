class TranslationService {
	this.validLanguages = [
		{
			lang: 'English',
			langCode: 'en'
		}, 
		{
			lang: 'German',
			langCode: 'de'
		}, 
		{
			lang: 'Italian'
			langCode: 'it'
		}, {Spanish", "French"];
	constructor(client_secret) {
		this.client_secret = client_secret;
	}

	getToken() {
		return this.token;
	}

	getAccessToken() {
		var now = new Date();
		if (!this.token || now.getTime() < this.token_expiration) {
			var token_service_url = 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken';
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState === 4){   //if complete
					if(xhttp.status === 200){  //check if "OK" (200)
						this.token = xhttp.responseText;
						this.reuse_token_until = reuse_token_until;
					} else {
						console.error(xhttp.statusText);
					}
				} 
			}
			
			xhttp.open("POST", token_service_url, true);
			xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", this.client_secret);
			xhttp.send();
		}
	}

	getTranslatedText(text, language) {
		if (language) {
			if (this.validLanguages.indexOf(language) == 0) language = this.validLanguages[0];

			for(var i = 0; i < vendors.length; i++) {
				if (vendors[i].Name == 'Magenic') {
					found = true;
					break;
				}
			}
			var token_service_url = "http://api.microsofttranslator.com/v2/Http.svc/Translate?text={}&to={}".format(textToTranslate, to;
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState === 4){   //if complete
					if(xhttp.status === 200){  //check if "OK" (200)
						this.token = xhttp.responseText;
						this.reuse_token_until = reuse_token_until;
					} else {
						console.error(xhttp.statusText);
					}
				} 
			}
			
			xhttp.open("POST", token_service_url, true);
			xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", this.client_secret);
			xhttp.send();
		}
	}
}