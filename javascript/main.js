// soundcloud api call

var soundCloudAPI = {};

soundCloudAPI.init = function() {
	SC.initialize({
	client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

soundCloudAPI.init();

soundCloudAPI.getTracks = function(input) {
	// find all sounds of buskers licensed under 'creative commons share alike'

	// a PROMISE
	SC.get('/tracks', {
		q: input, license: 'cc-by-sa'
		}).then(function(tracks) {
		console.log(tracks);
		soundCloudAPI.renderCard(tracks);
	});
}

soundCloudAPI.renderCard = function(tracks) {

	tracks.forEach(function(track) {

		console.log(track);

		var card = document.createElement('div');
		card.classList.add('card');
		
		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);
		
		var divImg = document.createElement('div');
		divImg.classList.add('image');
		card.appendChild(divImg);

		if(track.artwork_url) {
			divImg.innerHTML = '<img class="image_img" src="' + track.artwork_url + '">';
		}
		else {
			divImg.innerHTML = '<img class="image_img" src="http://lorempixel.com/output/abstract-q-c-640-480-6.jpg">';
		}

		var content = document.createElement('div');
		content.classList.add('content');
		card.appendChild(content);

		var header = document.createElement('div');
		header.classList.add('header');

		var title = document.createElement('a');
		// header.innerHTML = '<a href="https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance" target="_blank">"Science Vs. Romance"</a>'
		header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">"' + track.title + '"</a>';
		content.appendChild(header);
		// content.appendChild(title);
		// document.write('<a href="https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance" target="_blank">"Science Vs. Romance"</a>')

		var button = document.createElement('div');
		button.classList.add('ui','bottom','js-button','button','attached');

		var icon = document.createElement('i');
		icon.classList.add('add','icon');

		var span = document.createElement('span');
		span.innerHTML = 'Add to playlist';
		button.appendChild(icon);
		button.appendChild(span);
		card.appendChild(button);

		button.addEventListener('click',function() {
			soundCloudAPI.playSong(track.permalink_url);	
		});

	});
	
}

// search

document.querySelector('.js-submit').addEventListener('click', function() {
	var input = document.querySelector('input').value;
	console.log(typeof input);
	// console.log("yooo: " + soundCloudAPI.getTracks(input));
	soundCloudAPI.getTracks(input);
});

document.querySelector('.js-search').addEventListener('keyup', function(e) {
	var input = document.querySelector('input').value;
	if(e.keyCode === 13) {
		soundCloudAPI.getTracks(input);
	}
});

// add to playlist



// play songs

soundCloudAPI.playSong = function(url) {
	SC.oEmbed(url, {
	auto_play: true
	}).then(function(embed){
	console.log('oEmbed response: ', embed);
	var playlist = document.querySelector('.js-playlist');
	var box = document.createElement('div');
	box.innerHTML = embed.html;
	playlist.insertBefore(box, playlist.firstChild);  // put box before firstChild

	// local storage
	localStorage.setItem('key',playlist.innerHTML);

	});
}

var playlist = document.querySelector('.js-playlist');
playlist.innerHTML = localStorage.getItem('key');

