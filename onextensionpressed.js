

document.addEventListener('DOMContentLoaded', function () {

	let checkbox = document.querySelector('input[id="extensionActive"]');
	
	if(checkbox.id == 'extensionActive')
	{
		chrome.storage.sync.get(['extensionActive'], function(result) {
		
			// Default to true..
			if(result && result.extensionActive == false)
				checkbox.checked = false;
			
			else
				checkbox.checked = true;

		});
		
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({extensionActive: checkbox.checked}, function() {});
		});
	}
});

/*


document.addEventListener('DOMContentLoaded', function () {

	let checkbox = document.querySelector('input[id="femOfSwitch"]');
	
	if(checkbox.id == 'femOfSwitch')
	{
		chrome.storage.sync.get(['femOfSwitch'], function(result) {
			
			if(result && result.femOfSwitch == true)
				checkbox.checked = true;
			
			else
				checkbox.checked = false;

		});
		
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({femOfSwitch: checkbox.checked}, function() {});
		});
	}
});
*/

document.addEventListener('DOMContentLoaded', function () {

	let checkbox = document.querySelector('input[id="selectionUI"]');
	
	if(checkbox.id == 'selectionUI')
	{
		chrome.storage.sync.get(['selectionUI'], function(result) {
		
			// Default to true..
			if(result && result.selectionUI == false)
				checkbox.checked = false;
			
			else
				checkbox.checked = true;

		});
		
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({selectionUI: checkbox.checked}, function() {});
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {

	let checkbox = document.querySelector('input[id="cardLogging"]');
	
	if(checkbox.id == 'cardLogging')
	{
		chrome.storage.sync.get(['cardLogging'], function(result) {
		
			// Default to true..
			if(result && result.cardLogging == false)
				checkbox.checked = false;
			
			else
				checkbox.checked = true;

		});
		
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({cardLogging: checkbox.checked}, function() {});
		});
	}
});

document.addEventListener('DOMContentLoaded', function () {

	let checkbox = document.querySelector('input[id="randomRPS"]');
	
	if(checkbox.id == 'randomRPS')
	{
		chrome.storage.sync.get(['randomRPS'], function(result) {
			
			if(result && result.randomRPS == true)
				checkbox.checked = true;
			
			else
				checkbox.checked = false;

		});
		
		checkbox.addEventListener('change', function () {
			chrome.storage.sync.set({randomRPS: checkbox.checked}, function() {});
		});
	}
});

/*
function conLog(text)
{
	let cons = document.getElementById('consoleLog');
	
	cons.innerHTML = "a" + text;
}
*/
function getIndexByValue(options, value)
{
	for(let abc=0;abc < options.length;abc++)
	{
		if(options[abc].value == value)
			return options[abc].index;
	}
	
	return -1;
}