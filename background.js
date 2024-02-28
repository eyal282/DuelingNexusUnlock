chrome.webNavigation.onCommitted.addListener(function(e) {
	keepAlive();
}, {url: [{hostSuffix: 'duelingnexus.com'}]});


const goatCards = [];
const edisonCards = [];
const negate_icon_blob = [];

let drawLimitedBlob = null;

function Eyal_BlobFileAsString(_path, _cb)
{
	let obj = {};
	
	fetch(_path, {mode:'same-origin'})   // <-- important
	
	.then(function(_res) {
		return _res.blob();
	})

	.then(function(_blob) {
		obj.blob = _blob;
		return obj.blob.text();
	})
	
	.then(function(_text) {
		obj.text = _text;
		return obj.blob.type;
	})
	
	.then(function(_type) {
		obj.type = _type;
		
		_cb(obj.text, obj.type);
	});
};

function Eyal_BlobFileAsSound(_path, _cb)
{
	let blob = new Blob([_path], { type: "audio/mpeg" })
	
	_cb(blob);
};

function Eyal_ReadFile(_path, _cb)
{

	fetch(_path, {mode:'same-origin'})   // <-- important

	.then(function(_res) {
		return _res.blob();
	})

	.then(function(_blob) {
		var reader = new FileReader();

		reader.addEventListener("loadend", function() {
			_cb(this.result);
		});

		reader.readAsText(_blob); 
	});
};

if(drawLimitedBlob == null)
{
	Eyal_BlobFileAsSound("./MD_Sounds/Draw_Limited.mp3", function(blob)
	{
		drawLimitedBlob = blob;
	});
}
	

setInterval(function () {
	performInjection();
}, 4500);

let Eyal_timestamp = 0;

setInterval(function () {
	Eyal_timestamp = Eyal_timestamp + 0.1;
	
	if(Eyal_timestamp >= 1.0)
	{
		Eyal_timestamp = 0.0;
		performFastInjection(true);
	}
	else
	{
		performFastInjection(false);
	}
}, 100);


setInterval(function () {
	
	performCensorInjection();
}, 500);

setInterval(function () {
	
	performBlitzInjection();
}, 100);

// This is a race

let intervalCounters = 50;

let raceInterval = setInterval(function () {
	if(intervalCounters > 0)
		intervalCounters--;
	
	else
		clearInterval(raceInterval);
	
	performInjection();
}, 250);


function performBlitzInjection()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0] && tabs[0].url && (tabs[0].url.search("www.duelingnexus.com") != -1 || tabs[0].url.search("https://duelingnexus.com") != -1))
		{
			if(typeof tabs[0].id !== 'undefined')
			{
				chrome.scripting.executeScript(
				{
					args: [],
					target: {tabId: tabs[0].id},
					world: "MAIN", // Main world is mandatory to edit other website functions
					func: blitzInjectFunction,
					//files: ['inject.js'],
				});
			}
		}
	}); 
}

function performFastInjection(bSecond)
{
	// Is the extension user dueling? "duel_active" is for dueling and watching, while "duelist" is only for dueling
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0] && tabs[0].url && (tabs[0].url.search("www.duelingnexus.com") != -1 || tabs[0].url.search("https://duelingnexus.com") != -1))
		{
			if(typeof tabs[0].id !== 'undefined')
			{
				chrome.storage.sync.get(['potOfSwitch', 'femOfSwitch', 'normalMusicDL', 'victoryMusicDL_V2', 'musicSliderDL', 'limitedCardsSound', 'cardLogging', 'randomRPS'], function(result)
				{
					let potOfSwitch = false;
					
					if(result && result.potOfSwitch == true)
						potOfSwitch = true;
				
					let femOfSwitch = false;
					
					if(result && result.femOfSwitch == true)
						femOfSwitch = true;
					
					let musicSliderDL = 0;
					
					if(result && result.musicSliderDL > 0)
						musicSliderDL = result.musicSliderDL;
					
					let limitedCardsSound = true;
					
					if(result && result.limitedCardsSound == false)
						limitedCardsSound = false;
					
					let cardLogging = true;
					
					if(result && result.cardLogging == false)
						cardLogging = false;
					
					let randomRPS = false;
					
					if(result && result.randomRPS == true)
						randomRPS = result.randomRPS;
						
					
					chrome.scripting.executeScript(
					{
						args: [potOfSwitch, femOfSwitch, musicSliderDL, limitedCardsSound, cardLogging, randomRPS, bSecond],
						target: {tabId: tabs[0].id},
						world: "MAIN", // Main world is mandatory to edit other website functions
						func: fastInjectFunction,
						//files: ['inject.js'],
					});
				});
			}
		}
	}); 
}

function performInjection()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0] && tabs[0].url && (tabs[0].url.search("www.duelingnexus.com") != -1 || tabs[0].url.search("https://duelingnexus.com") != -1))
		{
			if(typeof tabs[0].id !== 'undefined')
			{
				chrome.storage.sync.get(['extensionActive', 'femOfSwitch', 'selectionUI', 'cardLogging'], function(result)
				{
					let extensionActive = true;
					
					if(result && result.extensionActive == false)
						extensionActive = false;
				
					let femOfSwitch = false;
					
					if(result && result.femOfSwitch == true)
						femOfSwitch = true;

					let selectionUI = true;
					
					if(result && result.selectionUI == false)
						selectionUI = false;
					
					let cardLogging = true;
					
					if(result && result.cardLogging == false)
						cardLogging = false;
					
					chrome.scripting.executeScript(
					{
						args: [extensionActive, femOfSwitch, selectionUI, cardLogging],
						target: {tabId: tabs[0].id},
						world: "MAIN", // Main world is mandatory to edit other website functions
						func: injectFunction,
						//files: ['inject.js'],
					});
				});
			}
		}
	}); 
}

function performCensorInjection()
{
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		if(tabs[0] && tabs[0].url && (tabs[0].url.search("www.duelingnexus.com") != -1 || tabs[0].url.search("https://duelingnexus.com") != -1))
		{
			console.log(tabs[0].url);
			if(typeof tabs[0].id !== 'undefined')
			{
				chrome.storage.sync.get(['femOfSwitch'], function(result)
				{
				
					let femOfSwitch = false;
					
					if(result && result.femOfSwitch == true)
						femOfSwitch = true;
					
					chrome.scripting.executeScript(
					{
						args: [femOfSwitch],
						target: {tabId: tabs[0].id},
						world: "MAIN", // Main world is mandatory to edit other website functions
						func: censorInjectFunction,
						//files: ['inject.js'],
					});
				});
			}
		}
	}); 
}

let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive();
  }
}









/*
====================================
======= Start of inject.js =========
====================================
*/

/*
=== List of Effects that generate mechanics ===

1. This card can attack from your Pendulum Scale
2. This card can attack during your opponent's battle phase
3. This card can attack while in face-up Defense Position
4. You can Set this card from your hand to your Spell
5. each player swaps the cards in their graveyard with the cards in their deck
6. swap the cards in your graveyard with the cards in your deck
7. Shuffle this card face-up into your opponent's Deck
8. Shuffle 1 "Archetype" card face-up into your opponent's Deck.
9. Shuffle 1 "Archetype" monster face-up into your opponent's Deck.
10. pay half your LP
11. Special Summon 1 "Gorz Token"
12. Special Summon 4 "Named Tokens"
13. Special Summon as many "Named Tokens" (Stats Here!!!) as possible
14. Excavate the top 5 cards
15. Excavate the top card of
16. You can Special Summon this card (from your hand) to your opponent's field
17. Special Summoned (from your hand) to your opponent's field
18. Normal Summon to that side of the field
*/

function blitzInjectFunction()
{
}

function fastInjectFunction(potOfSwitch, femOfSwitch, musicSliderDL, limitedCardsSound, cardLogging, randomRPS, bSecond)
{
	if(typeof Game === "undefined" || typeof Game.players === "undefined" || Game.players.length <= 1)
		return;
	
	window.Eyal_getRandomInt = function(min, max)
	{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * ((max + 1) - min) + min);
	}
	
	let objectRock = null;
	let objectPaper = null;
	let objectScissors = null;
	
	if(Game.players[0].name == Game.username)
	{
		objectRock = "#game-rps-container-player1 #game-rps-rock";
		objectPaper = "#game-rps-container-player1 #game-rps-paper";
		objectScissors = "#game-rps-container-player1 #game-rps-scissors";
	}
	else if(Game.players[1].name == Game.username)
	{
		objectRock = "#game-rps-container-player2 #game-rps-rock";
		objectPaper = "#game-rps-container-player2 #game-rps-paper";
		objectScissors= "#game-rps-container-player2 #game-rps-scissors";
	}
	
	
	if(randomRPS && objectRock != null && $(objectRock).length > 0 && $(objectRock).css("display") != "none")
	{
		let arr = [$(objectRock)[0], $(objectPaper)[0], $(objectScissors)[0]]
		arr[Eyal_getRandomInt(0, arr.length-1)].click()
	}	
}

function censorInjectFunction(potOfSwitch, femOfSwitch)
{
	/*
	window.loadThumbnails = function(data) {
		$('#' + currentLabel + ' .prev_thumb_btn').hide();
		$('#' + currentLabel + ' .next_thumb_btn').hide();
		$('#' + currentLabel + ' .thumbs .thumbnail').css("opacity", 0);
		$('#' + currentLabel + ' .thumbs .thumbnail .nsfw').hide();
		totalThumbs = data.pics.length;
		var thumbs = $('#' + currentLabel + ' .thumbs .thumbnail');
		for (var i = 0; i < thumbs.length; i++) {
			var thumb = thumbs.eq(i);
			thumb.off("click", uploadAvatarE);
			thumb.off("click", onThumbClick);
			if (data.pics.length >= i + 1) {
				thumb.data("index", i);
				thumb.data("id", data.ids[i]);
				thumb.data("nsfw", data.nsfws[i]);
				
				
				thumb.find('img').attr("src", IMAGES_START + "loading.gif");
				if (!data.nsfws[i] || always_show_nsfw)
				{
					thumb.find('img').attr("src", getAvatarStart(data.pics[i]));
				}
				
				thumb.click(onThumbClick);
				if (selectedThumb > 1) {
					$('#' + currentLabel + ' .prev_thumb_btn').show();
				}
				if (i < data.pics.length - 1) {
					$('#' + currentLabel + ' .next_thumb_btn').show();
				}
				if (data.pic == data.pics[i]) {
					$('#' + currentLabel + ' .profile_avatar').data("id", data.ids[i]);
				}
				thumb.find('.no_image').hide();
			}
			else {
				thumb.find('img').attr("src", IMAGES_START + "blank.png");
				thumb.find('.no_image').show();
				thumb.click(uploadAvatarE);
			}
			thumb.data("index", i);
			TweenMax.to(thumb, (i * 200 + 342) / 1000, {onComplete:function(){
				$(this.target).css("opacity", 1);
			}});
		}
		$('#' + currentLabel + ' .thumbs').show();
	}
	window.Avatar = function(data)
	{
		if (data.p) {
			data.pic = data.p;
		}
		if (data.u) {
			data.username = data.u;
		}
		
		var avatar = $('<div class="avatar"></div>');
		if (data.pic)
		{
			if(!data.nsfw || always_show_nsfw)
			{
				avatar.data("pic", getAvatarStart(data.pic));
			}
			else
			{
				avatar.data("pic", IMAGES_START + "loading.gif");
			}
		}
		avatar.click(function(){
			loadProfile(data.username);
		});
		
		var frame = $('<img class="avatar_frame" src="' + IMAGES_START + 'svg/avatar_red.svg" />');
		if (data.username == username) {
			frame.attr("src", IMAGES_START + "svg/avatar_teal.svg");
		}
		
		var img = $('<img class="image" width="256" height="256" />');
		if (data.delay || !data.pic) {
			img.attr("src", IMAGES_START + "loading.gif");
			avatar.data("started", false);
		}
		else {
			if(!data.nsfw || always_show_nsfw)
			{
				img.attr("src", getAvatarStart(data.pic));
			}
			avatar.data("started", true);
		}
		
		
		avatar.append(frame);
		if (!data.nsfw || always_show_nsfw)
		{
			avatar.append(img);
		}
		
		return avatar;
	}
	
	window.Eyal_checkCensors = function()
	{
		if(typeof deck_arr === "undefined")
			return;
		
		if(typeof window.Eyal_TextImages === "undefined")
		{
			window.Eyal_TextImages = [];
		}
		
		let Eyal_cards = [];
		
		for(let abc=0;abc < deck_arr.length;abc++)
		{
			Eyal_cards.push(deck_arr[abc]);
		}
		
		for(let abc=0;abc < side_arr.length;abc++)
		{
			Eyal_cards.push(side_arr[abc]);
		}
		
		for(let abc=0;abc < extra_arr.length;abc++)
		{
			Eyal_cards.push(extra_arr[abc]);
		}
		
		for(let abc=0;abc < search_arr.length;abc++)
		{
			Eyal_cards.push(search_arr[abc]);
		}
		
		if(typeof player1 !== 'undefined' && player1 != null && typeof player1.all_cards_arr !== 'undefined')
		{
			for(let abc=0;abc < player1.all_cards_arr.length;abc++)
			{
				Eyal_cards.push(player1.all_cards_arr[abc]);
			}
		}
		
		if(typeof player2 !== 'undefined' && player2 != null && typeof player2.all_cards_arr !== 'undefined')
		{
			for(let abc=0;abc < player2.all_cards_arr.length;abc++)
			{
				Eyal_cards.push(player2.all_cards_arr[abc]);
			}
		}
		
		if(typeof player3 !== 'undefined' && player3 != null && typeof player3.all_cards_arr !== 'undefined')
		{
			for(let abc=0;abc < player3.all_cards_arr.length;abc++)
			{
				Eyal_cards.push(player3.all_cards_arr[abc]);
			}
		}
		
		if(typeof player4 !== 'undefined' && player4 != null && typeof player4.all_cards_arr !== 'undefined')
		{
			for(let abc=0;abc < player4.all_cards_arr.length;abc++)
			{
				Eyal_cards.push(player4.all_cards_arr[abc]);
			}
		}
		
	
		if(femOfSwitch && typeof Eyal_femaleCards !== "undefined")
		{
			for(let abc=0;abc < Eyal_cards.length;abc++)
			{
				if(typeof Eyal_cards[abc].data === 'undefined')
					continue;
				
				if(Eyal_cards[abc].data("cardfront"))
					Eyal_cards[abc] = Eyal_cards[abc].data("cardfront");
				
				if(Eyal_femaleCards.indexOf(Eyal_cards[abc].data("name")) != -1 && (Eyal_cards[abc].find('.pic').attr("src").indexOf("card-pics") >= 0 || Eyal_cards[abc].find('.pic').attr("src").indexOf("low-res") >= 0))
				{
					Eyal_cards[abc].removeImage();
					
					let obj = Eyal_TextImages.find(o => o.name === Eyal_cards[abc].data("name"));
					
					if(obj)
					{
						Eyal_cards[abc].find('.pic').attr("src", obj.pic);
						continue;
					}
					
					let imageURL = Eyal_textToImage(Eyal_cards[abc].data("name"));
					
					Eyal_cards[abc].find('.pic').attr("src", imageURL);
					
					// We already created obj above.
					obj = {};
					
					obj.name = Eyal_cards[abc].data("name");
					obj.pic = imageURL;
					
					Eyal_TextImages.push(obj);
					
					console.log("If this is spammed more than 100 times we have a serious issue.");
				}
			}
		}
		for(let abc=0;abc < Eyal_cards.length;abc++)
		{
			if(typeof Eyal_cards[abc].data === 'undefined')
				continue;
			
			if(Eyal_cards[abc].data("cardfront"))
				Eyal_cards[abc] = Eyal_cards[abc].data("cardfront");
			
			if(typeof Eyal_OnGetCardVisualsPost !== "undefined")
			{
				if(Eyal_cards[abc].data("effect") || Eyal_cards[abc].data("card_type"))
				{
					Eyal_OnGetCardVisualsPost(Eyal_cards[abc], Eyal_cards[abc]);
				}
			}
		}
	}
	
	Eyal_checkCensors();
	*/
}

// Function is called inside itself during Game.onGameWin and Game.onGameStart
function injectFunction(extensionActive, femOfSwitch, selectionUI, cardLogging)
{
//	let Eyal_blob = new Blob([negate_icon_blob[0].text], {type: negate_icon_blob[0].type});
	
	Eyal_extensionActive = extensionActive;
	Eyal_femOfSwitch = femOfSwitch;
	Eyal_selectionUI = selectionUI;
	Eyal_cardLogging = cardLogging;
	
	if(!Eyal_extensionActive)
	{
		Eyal_femOfSwitch = false;
		Eyal_selectionUI = false;
		Eyal_cardLogging = false;
	}
	
	// Don't inject until jQuery is added.
	if(typeof window.jQuery === "undefined")
		return;
	
	// Start of anti window close
	let PAGESTATE_NORMAL = 0;
	let PAGESTATE_DECK_EDITOR = 1;
	let PAGESTATE_DUEL = 2;
	let PAGESTATE_REPLAY = 3;
	
	let Eyal_pageState = PAGESTATE_NORMAL;
	
	if(typeof Game !== "undefined")
	{
		Eyal_pageState = PAGESTATE_DUEL;
		
		if(Game.isReplay)
		{
			Eyal_pageState = PAGESTATE_REPLAY;
		}
		else if($("#game-not-ready-button").length == 0)
		{
			Eyal_pageState = PAGESTATE_DECK_EDITOR;
		}
	}
	
	if(Eyal_pageState == PAGESTATE_DECK_EDITOR)
	{
		window.onbeforeunload = function() { return true }
	}
	else if(Eyal_pageState == PAGESTATE_DUEL)
	{	
		if(Game.isStarted && !Game.hasGameEnded)
		{
			window.onbeforeunload = function() { return true }
		}
		else
		{
			window.onbeforeunload = undefined
		}
	}
	else if(Eyal_pageState == PAGESTATE_REPLAY)
	{
		Eyal_yourIndex = 0;
		Eyal_yourOpponentIndex = 1;
	}
	
	if(Eyal_pageState == PAGESTATE_DUEL || Eyal_pageState == PAGESTATE_REPLAY)
	{
		console.log("ba");
		Game.isTag ? 2 > Game.position || 4 <= Game.position ? (Eyal_yourIndex = Game.tagPlayer[0],
        Eyal_yourOpponentIndex = Game.tagPlayer[1] + 2) : (Eyal_yourIndex = Game.tagPlayer[0] + 2,
        Eyal_yourOpponentIndex = Game.tagPlayer[1]) : (Eyal_yourIndex = 2 > Game.position ? Game.position : 0,
        Eyal_yourOpponentIndex = 1 - Eyal_yourIndex);
        if (Game.isSpectator) {
            let dummy = Eyal_yourIndex
            Eyal_yourIndex = Eyal_yourOpponentIndex;
            Eyal_yourOpponentIndex = dummy;
        }
		
		console.log("ab");
	}
	if(typeof Eyal_originalOnGameWin === "undefined" && typeof Game.onGameWin !== "undefined")
	{
		Function.prototype.clone = function()
		{
			var that = this;
			var temp = function temporary() { return that.apply(this, arguments); };
			for(var key in this) {
				if (this.hasOwnProperty(key)) {
					temp[key] = this[key];
				}
			}
			return temp;
		};
		Eyal_originalOnGameWin = Game.onGameWin.clone();
	}
	Game.onGameWin = function(a)
	{
		Eyal_originalOnGameWin(a);
		
		injectFunction(Eyal_extensionActive, Eyal_femOfSwitch, Eyal_selectionUI, Eyal_cardLogging);
	}
	

	if(typeof Eyal_originalOnGameStart === "undefined" && typeof Game.onGameStart !== "undefined")
	{
		Function.prototype.clone = function()
		{
			var that = this;
			var temp = function temporary() { return that.apply(this, arguments); };
			for(var key in this) {
				if (this.hasOwnProperty(key)) {
					temp[key] = this[key];
				}
			}
			return temp;
		};
		Eyal_originalOnGameStart = Game.onGameStart.clone();
	}
	Game.onGameStart = function(a)
	{
		Eyal_originalOnGameStart(a);
		
		Eyal_fdBanishURL1 = undefined;
		Eyal_fdBanishURL2 = undefined;
		
		injectFunction(Eyal_extensionActive, Eyal_femOfSwitch, Eyal_selectionUI, Eyal_cardLogging);
	}
	// End of anti window close.
	
	if(typeof Mexp === "undefined" && document.readyState == "complete")
	{
		$('html > head').append($(`<style>.cards-selection-container {
            display: inline-block;
            background-color: #264391;
			opacity: 0.7;
            padding: 10px;
			margin: 10px;
			text-align: center;
        }</style>`));	
		// I suspect this causes bugs.
		/*
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://unpkg.com/default-passive-events';
		document.body.appendChild(script);
		*/
	
		// Expression eval. What is this black magic? How does it even work?
		// https://www.npmjs.com/package/math-expression-evaluator/v/2.0.2?activeTab=code
		
		!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Mexp=t()}(this,(function(){"use strict";function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},e.apply(this,arguments)}var t,n={0:11,1:0,2:3,3:0,4:0,5:0,6:0,7:11,8:11,9:1,10:10,11:0,12:11,13:0,14:-1};function a(e,t){for(var n=0;n<e.length;n++)e[n]+=t;return e}!function(e){e[e.FUNCTION_WITH_ONE_ARG=0]="FUNCTION_WITH_ONE_ARG",e[e.NUMBER=1]="NUMBER",e[e.BINARY_OPERATOR_HIGH_PRECENDENCE=2]="BINARY_OPERATOR_HIGH_PRECENDENCE",e[e.CONSTANT=3]="CONSTANT",e[e.OPENING_PARENTHESIS=4]="OPENING_PARENTHESIS",e[e.CLOSING_PARENTHESIS=5]="CLOSING_PARENTHESIS",e[e.DECIMAL=6]="DECIMAL",e[e.POSTFIX_FUNCTION_WITH_ONE_ARG=7]="POSTFIX_FUNCTION_WITH_ONE_ARG",e[e.FUNCTION_WITH_N_ARGS=8]="FUNCTION_WITH_N_ARGS",e[e.BINARY_OPERATOR_LOW_PRECENDENCE=9]="BINARY_OPERATOR_LOW_PRECENDENCE",e[e.BINARY_OPERATOR_PERMUTATION=10]="BINARY_OPERATOR_PERMUTATION",e[e.COMMA=11]="COMMA",e[e.EVALUATED_FUNCTION=12]="EVALUATED_FUNCTION",e[e.EVALUATED_FUNCTION_PARAMETER=13]="EVALUATED_FUNCTION_PARAMETER",e[e.SPACE=14]="SPACE"}(t||(t={}));var o={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,9:!0,12:!0,13:!0,14:!0},h={0:!0,1:!0,2:!0,3:!0,4:!0,5:!0,6:!0,7:!0,8:!0,9:!0,10:!0,11:!0,12:!0,13:!0},r={0:!0,3:!0,4:!0,8:!0,12:!0,13:!0},u={},s={0:!0,1:!0,3:!0,4:!0,6:!0,8:!0,12:!0,13:!0},p={1:!0},i=[[],["1","2","3","7","8","9","4","5","6","+","-","*","/","(",")","^","!","P","C","e","0",".",",","n"," ","&"],["pi","ln","Pi"],["sin","cos","tan","Del","int","Mod","log","pow"],["asin","acos","atan","cosh","root","tanh","sinh"],["acosh","atanh","asinh","Sigma"]];function l(e,t,n,a){for(var o=0;o<a;o++)if(e[n+o]!==t[o])return!1;return!0}function v(e){for(var a=0;a<e.length;a++){var o=e[a].token.length,h=-1;e[a].type===t.FUNCTION_WITH_N_ARGS&&void 0===e[a].numberOfArguments&&(e[a].numberOfArguments=2),i[o]=i[o]||[];for(var r=0;r<i[o].length;r++)if(e[a].token===i[o][r]){h=f(i[o][r],this.tokens);break}-1===h?(this.tokens.push(e[a]),e[a].precedence=n[e[a].type],i.length<=e[a].token.length&&(i[e[a].token.length]=[]),i[e[a].token.length].push(e[a].token)):(this.tokens[h]=e[a],e[a].precedence=n[e[a].type])}}function f(e,t){for(var n=0;n<t.length;n++)if(t[n].token===e)return n;return-1}var y=function(e,t){var n,v={value:this.math.changeSign,type:0,precedence:1,show:"-"},y={value:")",show:")",type:5,precedence:0},c={value:"(",type:4,precedence:0,show:"("},w=[c],m=[],E=e,g=o,N=0,d=u,A="";void 0!==t&&this.addToken(t);var k=function(e,t){for(var n,a,o,h=[],r=t.length,u=0;u<r;u++)if(!(u<r-1&&" "===t[u]&&" "===t[u+1])){for(n="",a=t.length-u>i.length-2?i.length-1:t.length-u;a>0;a--)if(void 0!==i[a])for(o=0;o<i[a].length;o++)l(t,i[a][o],u,a)&&(n=i[a][o],o=i[a].length,a=0);if(u+=n.length-1,""===n)throw new Error("Can't understand after "+t.slice(u));h.push(e.tokens[f(n,e.tokens)])}return h}(this,E);for(n=0;n<k.length;n++){var M=k[n];if(14!==M.type){var O,T=M.token,_=M.type,I=M.value,P=M.precedence,R=M.show,C=w[w.length-1];for(O=m.length;O--&&0===m[O];)if(-1!==[0,2,3,4,5,9,10,11,12,13].indexOf(_)){if(!0!==g[_])throw new Error(T+" is not allowed after "+A);w.push(y),g=h,d=s,m.pop()}if(!0!==g[_])throw new Error(T+" is not allowed after "+A);!0===d[_]&&(_=2,I=this.math.mul,R="&times;",P=3,n-=1);var S={value:I,type:_,precedence:P,show:R,numberOfArguments:M.numberOfArguments};if(0===_)g=o,d=u,a(m,2),w.push(S),4!==k[n+1].type&&(w.push(c),m.push(2));else if(1===_)1===C.type?(C.value+=I,a(m,1)):w.push(S),g=h,d=r;else if(2===_)g=o,d=u,a(m,2),w.push(S);else if(3===_)w.push(S),g=h,d=s;else if(4===_)a(m,1),N++,g=o,d=u,w.push(S);else if(5===_){if(!N)throw new Error("Closing parenthesis are more than opening one, wait What!!!");N--,g=h,d=s,w.push(S),a(m,1)}else if(6===_){if(C.hasDec)throw new Error("Two decimals are not allowed in one number");1!==C.type&&(C={show:"0",value:0,type:1,precedence:0},w.push(C)),g=p,a(m,1),d=u,C.value+=I,C.hasDec=!0}else 7===_&&(g=h,d=s,a(m,1),w.push(S));8===_?(g=o,d=u,a(m,M.numberOfArguments+2),w.push(S),4!==k[n+1].type&&(w.push(c),m.push(M.numberOfArguments+2))):9===_?(9===C.type?C.value===this.math.add?(C.value=I,C.show=R,a(m,1)):C.value===this.math.sub&&"-"===R&&(C.value=this.math.add,C.show="+",a(m,1)):5!==C.type&&7!==C.type&&1!==C.type&&3!==C.type&&13!==C.type?"-"===T&&(g=o,d=u,a(m,2).push(2),w.push(v),w.push(c)):(w.push(S),a(m,2)),g=o,d=u):10===_?(g=o,d=u,a(m,2),w.push(S)):11===_?(g=o,d=u,w.push(S)):12===_?(g=o,d=u,a(m,6),w.push(S),4!==k[n+1].type&&(w.push(c),m.push(6))):13===_&&(g=h,d=s,w.push(S)),a(m,-1),A=T}else if(n>0&&n<k.length-1&&1===k[n+1].type&&(1===k[n-1].type||6===k[n-1].type))throw new Error("Unexpected Space")}for(O=m.length;O--;)w.push(y);if(!0!==g[5])throw new Error("complete the expression");for(;N--;)w.push(y);return w.push(y),w};function c(e){for(var t,n,a,o=[],h=-1,r=-1,u=[{value:"(",type:4,precedence:0,show:"("}],s=1;s<e.length;s++)if(1===e[s].type||3===e[s].type||13===e[s].type)1===e[s].type&&(e[s].value=Number(e[s].value)),o.push(e[s]);else if(4===e[s].type)u.push(e[s]);else if(5===e[s].type)for(;4!==(null==(p=n=u.pop())?void 0:p.type);){var p;n&&o.push(n)}else if(11===e[s].type){for(;4!==(null==(i=n=u.pop())?void 0:i.type);){var i;n&&o.push(n)}u.push(n)}else{r=(t=e[s]).precedence,h=(a=u[u.length-1]).precedence;var l="Math.pow"==a.value&&"Math.pow"==t.value;if(r>h)u.push(t);else{for(;h>=r&&!l||l&&r<h;)n=u.pop(),a=u[u.length-1],n&&o.push(n),h=a.precedence,l="Math.pow"==t.value&&"Math.pow"==a.value;u.push(t)}}return o}function w(e,t){(t=t||{}).PI=Math.PI,t.E=Math.E;for(var n,a,o,h=[],r=void 0!==t.n,u=0;u<e.length;u++)if(1===e[u].type)h.push({value:e[u].value,type:1});else if(3===e[u].type)h.push({value:t[e[u].value],type:1});else if(0===e[u].type){var s=h[h.length-1];Array.isArray(s)?s.push(e[u]):s.value=e[u].value(s.value)}else if(7===e[u].type){var p=h[h.length-1];Array.isArray(p)?p.push(e[u]):p.value=e[u].value(p.value)}else if(8===e[u].type){for(var i=[],l=0;l<e[u].numberOfArguments;l++){var v=h.pop();v&&i.push(v.value)}h.push({type:1,value:e[u].value.apply(e[u],i.reverse())})}else if(10===e[u].type)n=h.pop(),a=h.pop(),Array.isArray(a)?((a=a.concat(n)).push(e[u]),h.push(a)):Array.isArray(n)?(n.unshift(a),n.push(e[u]),h.push(n)):h.push({type:1,value:e[u].value(a.value,n.value)});else if(2===e[u].type||9===e[u].type)n=h.pop(),a=h.pop(),Array.isArray(a)?((a=a.concat(n)).push(e[u]),h.push(a)):Array.isArray(n)?(n.unshift(a),n.push(e[u]),h.push(n)):h.push({type:1,value:e[u].value(a.value,n.value)});else if(12===e[u].type){n=h.pop();var f=void 0;f=!Array.isArray(n)&&n?[n]:n||[],a=h.pop(),o=h.pop(),h.push({type:1,value:e[u].value(o.value,a.value,f)})}else 13===e[u].type&&(r?h.push({value:t[e[u].value],type:3}):h.push([e[u]]));if(h.length>1)throw new Error("Uncaught Syntax error");return parseFloat(h[0].value.toFixed(15))}var m=function(){function t(){var t;this.toPostfix=c,this.addToken=v,this.lex=y,this.postfixEval=w,this.math=(t=this,{isDegree:!0,acos:function(e){return t.math.isDegree?180/Math.PI*Math.acos(e):Math.acos(e)},add:function(e,t){return e+t},asin:function(e){return t.math.isDegree?180/Math.PI*Math.asin(e):Math.asin(e)},atan:function(e){return t.math.isDegree?180/Math.PI*Math.atan(e):Math.atan(e)},acosh:function(e){return Math.log(e+Math.sqrt(e*e-1))},asinh:function(e){return Math.log(e+Math.sqrt(e*e+1))},atanh:function(e){return Math.log((1+e)/(1-e))},C:function(e,n){var a=1,o=e-n,h=n;h<o&&(h=o,o=n);for(var r=h+1;r<=e;r++)a*=r;var u=t.math.fact(o);return"NaN"===u?"NaN":a/u},changeSign:function(e){return-e},cos:function(e){return t.math.isDegree&&(e=t.math.toRadian(e)),Math.cos(e)},cosh:function(e){return(Math.pow(Math.E,e)+Math.pow(Math.E,-1*e))/2},div:function(e,t){return e/t},fact:function(e){if(e%1!=0)return"NaN";for(var t=1,n=2;n<=e;n++)t*=n;return t},inverse:function(e){return 1/e},log:function(e){return Math.log(e)/Math.log(10)},mod:function(e,t){return e%t},mul:function(e,t){return e*t},P:function(e,t){for(var n=1,a=Math.floor(e)-Math.floor(t)+1;a<=Math.floor(e);a++)n*=a;return n},Pi:function(e,n,a){for(var o=1,h=e;h<=n;h++)o*=Number(t.postfixEval(a,{n:h}));return o},pow10x:function(e){for(var t=1;e--;)t*=10;return t},sigma:function(e,n,a){for(var o=0,h=e;h<=n;h++)o+=Number(t.postfixEval(a,{n:h}));return o},sin:function(e){return t.math.isDegree&&(e=t.math.toRadian(e)),Math.sin(e)},sinh:function(e){return(Math.pow(Math.E,e)-Math.pow(Math.E,-1*e))/2},sub:function(e,t){return e-t},tan:function(e){return t.math.isDegree&&(e=t.math.toRadian(e)),Math.tan(e)},tanh:function(e){return t.math.sinh(e)/t.math.cosh(e)},toRadian:function(e){return e*Math.PI/180},and:function(e,t){return e&t}}),this.tokens=function(t){return[{token:"sin",show:"sin",type:0,value:t.math.sin},{token:"cos",show:"cos",type:0,value:t.math.cos},{token:"tan",show:"tan",type:0,value:t.math.tan},{token:"pi",show:"&pi;",type:3,value:"PI"},{token:"(",show:"(",type:4,value:"("},{token:")",show:")",type:5,value:")"},{token:"P",show:"P",type:10,value:t.math.P},{token:"C",show:"C",type:10,value:t.math.C},{token:" ",show:" ",type:14,value:" ".anchor},{token:"asin",show:"asin",type:0,value:t.math.asin},{token:"acos",show:"acos",type:0,value:t.math.acos},{token:"atan",show:"atan",type:0,value:t.math.atan},{token:"7",show:"7",type:1,value:"7"},{token:"8",show:"8",type:1,value:"8"},{token:"9",show:"9",type:1,value:"9"},{token:"int",show:"Int",type:0,value:Math.floor},{token:"cosh",show:"cosh",type:0,value:t.math.cosh},{token:"acosh",show:"acosh",type:0,value:t.math.acosh},{token:"ln",show:" ln",type:0,value:Math.log},{token:"^",show:"^",type:10,value:Math.pow},{token:"root",show:"root",type:0,value:Math.sqrt},{token:"4",show:"4",type:1,value:"4"},{token:"5",show:"5",type:1,value:"5"},{token:"6",show:"6",type:1,value:"6"},{token:"/",show:"&divide;",type:2,value:t.math.div},{token:"!",show:"!",type:7,value:t.math.fact},{token:"tanh",show:"tanh",type:0,value:t.math.tanh},{token:"atanh",show:"atanh",type:0,value:t.math.atanh},{token:"Mod",show:" Mod ",type:2,value:t.math.mod},{token:"1",show:"1",type:1,value:"1"},{token:"2",show:"2",type:1,value:"2"},{token:"3",show:"3",type:1,value:"3"},{token:"*",show:"&times;",type:2,value:t.math.mul},{token:"sinh",show:"sinh",type:0,value:t.math.sinh},{token:"asinh",show:"asinh",type:0,value:t.math.asinh},{token:"e",show:"e",type:3,value:"E"},{token:"log",show:" log",type:0,value:t.math.log},{token:"0",show:"0",type:1,value:"0"},{token:".",show:".",type:6,value:"."},{token:"+",show:"+",type:9,value:t.math.add},{token:"-",show:"-",type:9,value:t.math.sub},{token:",",show:",",type:11,value:","},{token:"Sigma",show:"&Sigma;",type:12,value:t.math.sigma},{token:"n",show:"n",type:13,value:"n"},{token:"Pi",show:"&Pi;",type:12,value:t.math.Pi},{token:"pow",show:"pow",type:8,value:Math.pow,numberOfArguments:2},{token:"&",show:"&",type:9,value:t.math.and}].map((function(t){return e({},t,{precedence:n[t.type]})}))}(this)}return t.prototype.eval=function(e,t,n){return this.postfixEval(this.toPostfix(this.lex(e,t)),n)},t}();return m.TOKEN_TYPES=t,m.tokenTypes=t,m}));
	}
	
	window.Eyal_FuncDoNothing = function()
	{
		return;
	}
	
	window.Eyal_ActionQueueDoNothing = function()
	{
		return;
	}
	
	if(typeof Eyal_checkHeartbeat !== "undefined")
		console.log("Beat");
	

	// Start of card tutor logger
	Game.getRarityType = function(a)
	{
		var b = Engine.getCardData(a);

		// Start of Eyal's code.
		if(Eyal_cardLogging)
		{
			let children = $("#game-event-log-content").children();
			
			for(let target=0;target < 100;target++)
			{
				let lastLog = $(children[children.length - 1 - target])				
				
				// Log starts with "A card ("
				if($(lastLog.children()[0]).text().indexOf("A card (") == 0)
					continue;
				
				if($(lastLog.children()[0]).text() == "A card" && (lastLog.text().search(/was added from the/i) >= 0 || (lastLog.text().search(/was set from/i) >= 0) || (lastLog.text().search(/was returned from/i) >= 0)))
				{   					
					let cardId = a;
					$(lastLog.children()[0]).text(`A card (${Engine.getCardData(cardId).name})`)
		
					$(lastLog.children()[0]).click(function() { Game.showLogCardInfo(cardId)})
					
					break;
				}
				else
				{
					break;
				}
			}
		}
		// End of Eyal's code
		a = "";
		b.type & CardType.LINK && (a = "-link");
		b.type & CardType.PENDULUM && (a = "-pendulum-normal",
		b = b.pendulumImageType,
		0 == b ? a = "-pendulum-small" : 2 == b && (a = "-pendulum-large"));
		return a
	}
	
	// Remove all card indicators at end of torn.
	Game.displayNextTurnText = function(a, b) {
		
		// Start of Eyal's code
		if(a.search(/turn/i) >= 0)
		{
			let children = $("#game-event-log-content").children();
			
			for(let i=0;i < children.length;i++)
			{
				let currentLog = $(children[i])
				
				// Log starts with "A card ("
				if($(currentLog.children()[0]).text().indexOf("A card (") == 0)
				{
					$(currentLog.children()[0]).text("A card");
					$(currentLog.children()[0]).off("click")
				}
			}
		}
		// End of Eyal's code
		$("#game-next-turn-text").text(a);
		$("#game-next-turn").css("left", "0%");
		$("#game-next-turn").css("opacity", 0);
		$("#game-next-turn").show();
		$("#game-next-turn").animate({
			left: "50%",
			opacity: 1
		}, {
			duration: 150 * Game.animationSpeedMultiplier
		}).delay(300 * Game.animationSpeedMultiplier).animate({
			left: "100%",
			opacity: 0
		}, {
			duration: 150 * Game.animationSpeedMultiplier,
			complete: function() {
				$("#game-next-turn").hide();
				b()
			}
		})
	}
	// End of card tutor logger

	// Start of master duel selection UI
	let heightDefeceit = 125
	
	if(typeof Eyal_lastHeightDefeceit === "undefined" || heightDefeceit != Eyal_lastHeightDefeceit)
	{
		Eyal_fdBanishURL1 = undefined;
		Eyal_fdBanishURL2 = undefined;
	}
	
	Eyal_lastHeightDefeceit = heightDefeceit;
	
	if(typeof Eyal_fdBanishURL1 === "undefined" && (Eyal_pageState == PAGESTATE_DUEL || Eyal_pageState == PAGESTATE_REPLAY))
	{
		async function loadImage(url)
		{
			return new Promise((resolve, reject) =>
			{
				const img = new Image();
				img.src = url;

				img.onload = () => resolve(img);
				img.onerror = (error) => reject(error);
			});
		}

		async function Eyal_getFDBanishURL(url, retriesLeft)
		{
			url = "https://duelingnexus.com/assets/images/cover.png";
			
			if(typeof retriesLeft === "undefined")
			{
				retriesLeft = 100;
			}

			retriesLeft--;

			let URL2;
			
			if(retriesLeft <= 0)
				return;

			let img;
			
			try
			{
				img = await loadImage(url)
			}
			catch(error) {
				console.log(error)
				return await retainBlackPart(url, retriesLeft)
			}
			
			// Create a canvas element dynamically
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			// Set canvas dimensions to match the image
			canvas.width = img.width;
			canvas.height = img.height;

			// Draw the image onto the canvas
			ctx.drawImage(img, 0, 0);

			// Define the coordinates for the diagonal line
			const startX = 0;
			const startY = canvas.height; // Start from the bottom left
			const endX = canvas.width;
			const endY = heightDefeceit; // End at the top right

			// Set the line style (color, thickness, etc.)
			// Draw the diagonal line
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.lineTo(0, endY);
			ctx.fill()
			ctx.clip()
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			URL2 = canvas.toDataURL();



			
			let img2 = await loadImage(URL2);
			
			canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d');

			// Set canvas dimensions to match the image
			canvas.width = img2.width;
			canvas.height = img2.height;

			// Draw the image onto the canvas
			ctx.drawImage(img2, 0, 0);
			
			// Fill everything above the line
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.moveTo(0, 0);
			ctx.lineTo(canvas.width, 0);
			ctx.lineTo(canvas.width, heightDefeceit);
			ctx.lineTo(0, heightDefeceit);
			ctx.clip()
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Create a clipping path based on the line

			// Clear the canvas (remove everything outside the clipping path)
			//ctx.clearRect(0, canvas.height, canvas.width, heightDefeceit);

			// Replace the original image with the edited canvas
			return canvas.toDataURL();
		}

		setTimeout(async function()
		{
			Eyal_fdBanishURL1 = await Eyal_getFDBanishURL(Game.getSleevePath(Eyal_yourIndex));
			Eyal_fdBanishURL2 = await Eyal_getFDBanishURL(Game.getSleevePath(Eyal_yourOpponentIndex));	
		}, 50);
		
	}
	if(typeof Eyal_originalOpenAdvancedSelection === "undefined" && typeof Game.openAdvancedSelection !== "undefined")
	{
		Function.prototype.clone = function()
		{
			var that = this;
			var temp = function temporary() { return that.apply(this, arguments); };
			for(var key in this) {
				if (this.hasOwnProperty(key)) {
					temp[key] = this[key];
				}
			}
			return temp;
		};
		Eyal_originalOpenAdvancedSelection = Game.openAdvancedSelection.clone();
	}
	Game.openAdvancedSelection = function(a, b)
	{
		Eyal_originalOpenAdvancedSelection(a, b);
		
		if(Eyal_selectionUI)
		{
			Eyal_masterDuelUI();
		}
	}
	
	window.Eyal_masterDuelUI = function()
	{
		let SELECTED_CARDS_NAME = "Selected Cards";
		let locations_arr = ["Monster Zone", "Spell/Trap Zone", "Extra Deck", "Deck", "Hand", "Graveyard", "GY", "Banish Pile", "Banished Zone", "Banishment", "Opponent's Monster Zone", "Opponent's Spell/Trap Zone", "Opponent's Extra Deck", "Opponent's Deck", "Opponent's Hand", "Opponent's Graveyard", "Opponent's GY", "Opponent's Banish Pile", "Opponent's Banished Zone", "Opponent's Banishment"];
		
		for(let abc=0;abc < locations_arr.length;abc++)
		{
			let div = $(`<div class="cards-selection-container">`);
			
			$("#game-selection-list").append(div);
			div.append(`<b><header>${locations_arr[abc]}</header></b>`);
			
			// Don't confuse Game.selectableCards with Game.selectedCards
			for(let def=0;def < Game.selectableCards.length;def++)
			{
				let cardRef = Game.selectableCards[def];
				let Eyal_card = Game.getCard(cardRef.controller, cardRef.location, cardRef.sequence, cardRef.position)
				
				let cardDiv = Eyal_card.advancedSelectionImage.parent()
				
				const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
				
				let color = cardDiv.find(".game-selection-card-text").css("color");
				
				let cardLocation = cardDiv.find(".game-selection-card-text").text();
				
				// Turns "Deck (50)" into "Deck"
				cardLocation = cardLocation.replace(/\s*\(\d+\)/, "");
				
				if(rgb2hex(color).toUpperCase() == "#ff0000")
				{
					cardLocation = `Opponent's ${cardLocation}`;
				}
				
				if(cardLocation == locations_arr[abc] && !Eyal_isIn(Game.selectedCards, Eyal_card))
				{
					div.append(cardDiv);
				}
				
				
			}
			
			let selected_cards_div = $(`<div class="cards-selection-container">`);
			
			$("#game-selection-list").append(selected_cards_div);
			selected_cards_div.append(`<b><header><font color="#ff0000">${SELECTED_CARDS_NAME}</header></b>`);
			
			// Don't confuse Game.selectableCards with Game.selectedCards
			for(let def=0;def < Game.selectedCards.length;def++)
			{
				let cardRef = Game.selectedCards[def];
				let Eyal_card = Game.getCard(cardRef.controller, cardRef.location, cardRef.sequence, cardRef.position)
				
				let cardDiv = Eyal_card.advancedSelectionImage.parent()
	
				selected_cards_div.append(cardDiv);
			}
		}
		
		$(".cards-selection-container").each(function()
		{
			let bFound = false;
			for(let i=0; i < $(this).children().length;i++)
			{
				let child = $(this).children()[i]
				
				if(child.className.search(/game-selection-card/i) >= 0)
				{
					bFound = true;
					break;
				}
			}
			
			
			if(!bFound)
			{
				$(this).hide();
			}
		});
		
		// Start of face-down banished visibility enhancers
		// Don't confuse Game.selectableCards with Game.selectedCards
		if(typeof Eyal_fdBanishURL1 !== "undefined")
		{
			for(let def=0;def < Game.selectableCards.length;def++)
			{
				let cardRef = Game.selectableCards[def];
				let Eyal_card = Game.getCard(cardRef.controller, cardRef.location, cardRef.sequence, cardRef.position)
				
				let cardDiv = Eyal_card.advancedSelectionImage.parent()

				let cardImage = cardDiv.find(".game-selection-card-image")
				
				if(Eyal_card.code != 0 && Eyal_card.position == CardPosition.FACEDOWN && Eyal_card.location == CardLocation.BANISHED)
				{
					let otherImage = cardImage.clone()
					
					otherImage.css("position", "absolute")
			
					otherImage.attr("src", Eyal_fdBanishURL1)
					
					otherImage.insertBefore(cardImage)
					Game.updateRarity(cardImage, Eyal_card.code);
					//Engine.setCardRarityImageElement(cardImage, Eyal_card.alias, Math.floor(Eyal_card.code / 1E11), Game.getRarityType(Eyal_card.alias));
				}
			}
		}
		// End of face-down banished visibility enhancers
	};
	
	window.Eyal_isIn = function(arr, thing)
	{
		return arr.indexOf(thing) >= 0;
	}
	// End of master duel selection UI
	
	// Start of PSCT highlighting
	Engine.ui.setCardInfo = function(a)
	{
		if (!(0 >= a) && this.currentCardId !== a && (this.currentCardId = a,
		a = Engine.getCardData(a))) {
			var b = "https://duelingnexus.com/wiki/" + a.name.replace(/ /g, "_").replace(/[^a-zA-Z0-9-_]/g, "");
			$("#card-name").html('<a id="card-name-link" href="' + b + '" target="_blank">' + a.name + "</a>");
			
			// Start of Eyal's code.
			if(Eyal_extensionActive)
			{
				var cardText = Engine.textToHtml(a.description);
				
				cardText = Eyal_MakePSCTColorOnEffect2(cardText);
			}
			// End of Eyal's code
			$("#card-description").html(cardText);
			$("#card-id").text(a.alias ? a.id + " [" + a.alias + "]" : a.id);
			1 === a.ot ? $("#card-id").append('<span style="color:rgb(99,247,0);"> (OCG)</span>') : 2 === a.ot ? $("#card-id").append('<span style="color:rgb(0, 176, 245);"> (TCG)</span>') : 3 === a.ot ? $("#card-id").append('<span style="color:rgb(214,54,79);"> (TCG/OCG)</span>') : 4 === a.ot && $("#card-id").append('<span style="color:rgb(187,34,249);"> (Rush)</span>');
			b = [];
			for (var c in CardType) {
				var d = CardType[c];
				a.type & d && !(4 === a.ot && d & CardType.UNION) && b.push(I18n.types[d])
			}
			for (c in CardCategory)
				d = CardCategory[c],
				a.category & d && b.push(I18n.categories[d]);
			$(".card-types").text(b.join("|"));
			a.type & CardType.MONSTER ? ($("#card-if-monster").show(),
			$("#card-if-spell").hide(),
			$("#card-race").text(I18n.races[a.race]),
			$("#card-attribute").text(I18n.attributes[a.attribute]),
			c = a.attack,
			-2 === c && (c = "?"),
			$("#card-atk").text(c),
			a.type & CardType.LINK ? ($("#card-def").text("LINK-" + a.level),
			c = "",
			a.defence & LinkMarker.TOP_LEFT && (c += "&#8598;"),
			a.defence & LinkMarker.TOP && (c += "&#8593;"),
			a.defence & LinkMarker.TOP_RIGHT && (c += "&#8599;"),
			a.defence & LinkMarker.LEFT && (c += "&#8592;"),
			a.defence & LinkMarker.RIGHT && (c += "&#8594;"),
			a.defence & LinkMarker.BOTTOM_LEFT && (c += "&#8601;"),
			a.defence & LinkMarker.BOTTOM && (c += "&#8595;"),
			a.defence & LinkMarker.BOTTOM_RIGHT && (c += "&#8600;"),
			$("#card-level").html(c)) : (c = a.defence,
			-2 === c && (c = "?"),
			$("#card-def").text(c),
			a = "&#9733;" + a.level,
			$("#card-level").html(a))) : ($("#card-if-monster").hide(),
			$("#card-if-spell").show())
		}
	}
		
	window.Eyal_MakePSCTColorOnEffect2 = function(text)
	{
		// Fixes text.replaceAll('&quot;', '"'); and text = text.replaceAll('&amp;', '&'); and friends.
		
		text = decodeHtmlStr(text);
		// 0 = nothing. 1 = cost. 2 = condition.
		let stateActive = 0;

		let stateColors = []
		stateColors.push(`</eyal>`)
		stateColors.push(`<eyal style="color:#d32e3e;">`)
		stateColors.push(`<eyal style="color:#1cca33;">`)

		let newText = [];

		for(let abc=text.length;abc >= 0;abc--)
		{
			newText.push(text[abc])
			
			if(stateActive != 0 && (abc == 0 || (text[abc-1] == "." && text[abc] == ")") || text[abc] == "]" || text[abc] == ">" || (text[abc] == "." && text[abc+1] == " ") || (text[abc] == ":" && !Eyal_IsCharacterInQuotes(text, abc)) || text[abc] == ";" || Eyal_isUltraSpecialCharacter(text[abc])))
			{
				if(abc == 0)
				{
					if(text[abc] == ">" || (text[abc] == "." && text[abc+1] == " ") || text[abc] == ":" || text[abc] == ";" || Eyal_isUltraSpecialCharacter(text[abc]))
					{
						newText.length = newText.length - 1
						newText.push(stateColors[stateActive])
						newText.push(text[abc])
					}
					else
						newText.push(stateColors[stateActive])
				}

				else
				{
					newText.length = newText.length - 1
					newText.push(stateColors[stateActive])
					newText.push(text[abc])
				}

				stateActive = 0;
			}
			if(text[abc] == ";" && !Eyal_IsCharacterInQuotes(text, abc))
			{
			  newText.push(stateColors[0])
			  stateActive = 1
			}

			else if(text[abc] == ":" && !Eyal_IsCharacterInQuotes(text, abc))
			{
			  newText.push(stateColors[0])
			  stateActive = 2
			}
		}

		let finalText = Eyal_MakePSCTColorOnLockEffect(newText.reverse().join(""));
		
		finalText = Eyal_simplifyHTML(finalText);
		
		return finalText;
	}
	
	String.prototype.insert = function(index, string)
	{
		if (index > 0)
		{
			return this.substring(0, index) + string + this.substring(index, this.length);
		}
		
		return string + this;
	}
	
	String.prototype.toDomElement = function () {

        var wrapper = document.createElement('div');
        wrapper.innerHTML = this;
		return wrapper;
	};
	
	window.Eyal_simplifyHTML = function(htmlString)
	{
		// Create a temporary div to hold the HTML
		var tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlString;

		// Recursive function to simplify an element
		function simplifyElement(element) {
			var child = element.firstChild;
			while (child) {
				var nextChild = child.nextSibling;
				if (child.nodeType === Node.ELEMENT_NODE) {
					simplifyElement(child);  // Recursively simplify children
					if (element.tagName === child.tagName && element.style.cssText === child.style.cssText) {
						while (child.firstChild) {
							element.insertBefore(child.firstChild, child);
						}
						element.removeChild(child);
					}
				}
				child = nextChild;
			}
		}

		// Simplify all elements in the body of the HTML document
		simplifyElement(tempDiv);

		// Convert the simplified HTML back to a string
		return tempDiv.innerHTML;

	}

	window.Eyal_MakePSCTColorOnLockEffect = function(text)
	{
		// 0 = nothing. 1 = lock
		let stateActive = 0;

		let positionsFormatting = [];
		
		let old_text = text.concat("");
		
		text = text.toLowerCase();
		
		let effects = [];
		
		effects.push("you can only Normal or Special Summon once");
		effects.push("you can only Special Summon from the Extra Deck once");
		effects.push("you cannot activate Spell Cards");
		effects.push("you cannot activate Trap Cards");
		effects.push("you cannot Special Summon monsters");
		effects.push("you cannot Pendulum Summon monsters");
		effects.push("You cannot activate monster effects");
		effects.push("you cannot use monsters as Fusion Material");
		effects.push("you cannot use monsters as Synchro Material");
		effects.push("you cannot use monsters as Xyz Material");
		effects.push("you cannot use monsters as Link Material");
		effects.push("You cannot Special Summon monsters from the Extra Deck, except Fusion Monsters");
		effects.push("You cannot Special Summon monsters from the Extra Deck, except Synchro Monsters");
		effects.push("You cannot Special Summon monsters from the Extra Deck, except Xyz Monsters");
		effects.push("You cannot Special Summon monsters from the Extra Deck, except Link Monsters");
		effects.push("you cannot Special Summon monsters");
		
		// Rampant Rampager...
		effects.push("you cannot Special Summon");
		effects.push("you cannot Special Summon monsters from the Extra Deck");
		effects.push("you cannot Normal or Special Summon monsters");
		effects.push("you cannot Normal Summon/Set or Special Summon monsters");
		effects.push("you cannot Normal Summon/Set");
		
		let appendedStatements = [];
		
		appendedStatements.push(" after this card resolves, ");
		appendedStatements.push(" during the turn you activate this card");
		appendedStatements.push("During the turn you activate this card, ");
		appendedStatements.push(" for the rest of this turn");
		appendedStatements.push("for the rest of this turn ");
		appendedStatements.push("for the rest of this turn, ");
		appendedStatements.push("For the rest of this turn after this card resolves, ");
		appendedStatements.push(" for the rest of this turn after this card resolves");
		appendedStatements.push(" the turn you activate this effect");
		appendedStatements.push(" the turn you activate this card");
		appendedStatements.push("the turn you activate this effect, ");
		appendedStatements.push("the turn you activate either of this card's effects ");
		appendedStatements.push(" the turn you activate either of this card's effects");
		
		appendedStatements.push("the turn you activate this card, ");
		//You cannot Normal Summon/Set
		
		
		let effects_v2 = [];
		let trueEffects = [];
		
		for(let abc=0;abc < effects.length;abc++)
		{
			for(let def=0;def < appendedStatements.length;def++)
			{
				effects_v2.push(effects[abc].concat(appendedStatements[def].toLowerCase()));
				effects_v2.push(appendedStatements[def].toLowerCase().concat(effects[abc]));
				effects_v2.push(effects[abc]);
			}
		}
		
		for(let abc=0;abc < effects_v2.length;abc++)
		{
			trueEffects.push(effects_v2[abc].concat(",").toLowerCase());
			trueEffects.push(effects_v2[abc].concat(".").toLowerCase());
			trueEffects.push(effects_v2[abc].toLowerCase());
		}
		
		Eyal_DebugArr = trueEffects;
		
		for(let abc=0;abc < trueEffects.length;abc++)
		{
			let position = -1;
			
			while((position = text.indexOf(trueEffects[abc], position + 1)) != -1)
			{
				positionsFormatting.push({format: `<eyal style="color:#0893d8;">`, position: position});
				positionsFormatting.push({format: `</eyal>`, position: position + trueEffects[abc].length});
			}
		}
		
		positionsFormatting.sort((a, b) => {
			return b.position - a.position;
		});
		
		for(let abc=0;abc < positionsFormatting.length;abc++)
		{
			old_text = old_text.insert(positionsFormatting[abc].position, positionsFormatting[abc].format);
		}
		
		return old_text;
		
		
	}	
	window.decodeHtmlStr = function(str)
	{
		let Eyal_temp = document.createElement("textarea");
		Eyal_temp.innerHTML = str;
	
		return Eyal_temp.value;
	};
	
	window.Eyal_isUltraSpecialCharacter = function(charac)
	{
		// Space is included in chars.
		
		let csgoConsole = "`"
		let chars = `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890 ~${csgoConsole}!#$%^&*+_=-()[]\';,./{}|":<>?`
		
		if(chars.indexOf(charac) == -1)
			return true;
		
		return false;
		
	}
	
	// This hard thing is solved by going right / left and checking if the amount of quotes to that direction are odd / even.
	window.Eyal_IsCharacterInQuotes = function(str, index)
	{
		let count = 0;
		for(let i=index;i < str.length;i++)
		{
			if(str[i] == `"`)
				count++;
		}
		
		return count % 2 == 1
	}
	
	// End of PSCT highlighting
}

/*
async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });
}

async function retainBlackPart(url, retriesLeft, skipStart) {
    if(typeof retriesLeft === "undefined")
    {
        retriesLeft = 100;
    }

    retriesLeft--;

    let URL2;
    
    if(retriesLeft <= 0)
        return;

    if(!skipStart)
    {
        let img;
        
        try
        {
            img = await loadImage(url)
        }
        catch(error) {
            console.log(error)
            return await retainBlackPart(url, retriesLeft)
        }
    
        console.log(img)
        // Create a canvas element dynamically
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
    
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0);
    
        const heightDefeceit = 100
    
        // Define the coordinates for the diagonal line
        const startX = 0;
        const startY = canvas.height; // Start from the bottom left
        const endX = canvas.width;
        const endY = heightDefeceit; // End at the top right
    
        // Set the line style (color, thickness, etc.)
        // Draw the diagonal line
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(0, endY);
        ctx.fill()
        ctx.clip()
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        URL2 = canvas.toDataURL();
    }
    else
    {
        URL2 = url;
    }

   let img2;
        
    try
    {
        img2 = await loadImage(url)
    }
    catch(error) {
        console.log(error)
        return await retainBlackPart(url, retriesLeft, true)
    }
    
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the image
    canvas.width = img2.width;
    canvas.height = img2.height;

    // Draw the image onto the canvas
    ctx.drawImage(img2, 0, 0);
    
    // Fill everything above the line
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, heightDefeceit);
    ctx.lineTo(0, heightDefeceit);
    ctx.clip()
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create a clipping path based on the line

    // Clear the canvas (remove everything outside the clipping path)
    //ctx.clearRect(0, canvas.height, canvas.width, heightDefeceit);

    // Replace the original image with the edited canvas
    return canvas.toDataURL();
}

// Don't confuse Game.selectableCards with Game.selectedCards
			for(let def=0;def < Game.selectableCards.length;def++)
			{
                let cardRef = Game.selectableCards[def];
				let Eyal_card = Game.getCard(cardRef.controller, cardRef.location, cardRef.sequence, cardRef.position)
console.log(Eyal_card)
                let cardDiv = Eyal_card.advancedSelectionImage.parent()

                let cardImage = cardDiv.find(".game-selection-card-image")
                
                if(Eyal_card.dataReceived && Eyal_card.position == CardPosition.FACEDOWN)
                {
                    let cloneCardImage = cardImage.clone();
                    cloneCardImage.css("top", "10px")

                    let url =  cardImage.attr("src")
                    
                    url = await retainBlackPart(url)
                    cardImage.attr("src", url)
                }
            }
			*/