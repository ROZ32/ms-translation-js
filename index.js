class TranslationService {
	constructor(client_secret) {
		if (!client_secret || client_secret == '') console.warn('Not valid client secret');
		this.client_secret = client_secret;
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
				lang: 'Italian',
				langCode: 'it'
			}, 
			{
				lang: 'Spanish', 
				langCode: 'sp'
			},
			{
				lang: 'French',
				langCode: 'sp'
			}
		];
	}

	getToken() {
		return this.token;
	}

	getAccessToken(callback) {
		var _self = this;
		var now = new Date();
		if (!_self.token || now.getTime() < _self.token_expiration) {
			var token_service_url = 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken';
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
				if (xhttp.readyState === 4){   //if complete
					if(xhttp.status === 200){  //check if 'OK' (200)
						_self.token = xhttp.responseText;
						_self.reuse_token_until = now.getTime() + (5 * 60 * 1000);
						callback();
					} else {
						callback(false);
						console.error(xhttp.statusText);
					}
				} 
			}
			
			xhttp.open('POST', token_service_url, true);
			xhttp.setRequestHeader('Ocp-Apim-Subscription-Key', _self.client_secret);
			xhttp.send();
		}
	}

	getTranslatedText(text, language) {
		var _self = this;
		if (!text || text == '') console.warn('No text to translate');
		if (language) {
			var selectedLangCode = 'en';
			for(var i = 0; i < _self.validLanguages.length; i++) {
				if (_self.validLanguages[i].lang == language) {
					selectedLangCode = _self.validLanguages[i].langCode;
				}
			}

			var callMS = function(status) {
				if (status === false) return;
				console.log(_self);
				if (!_self.token) {
					console.error('Not valid request token');
					return;
				}

				var token_service_url = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?text=' + text + '&to=' + selectedLangCode;
				var xhttp = new XMLHttpRequest();

				xhttp.onreadystatechange = function() {
					if (xhttp.readyState === 4){   //if complete
						if(xhttp.status === 200){  //check if 'OK' (200)
							console.log(xhttp);
						} else {
							console.error(xhttp);
						}
					} 
				}
				
				xhttp.open('GET', token_service_url, true);
				xhttp.setRequestHeader('Authorization', 'Bearer ' + _self.token);
				xhttp.send();
			}

			_self.getAccessToken(callMS);
		} else {
			console.warn('Not valid language');
		}
	}
}