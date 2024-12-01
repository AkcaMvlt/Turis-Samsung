/***********************
	YouTube iFrame API
	Source: https://developers.google.com/youtube/iframe_api_reference
***********************/
// Loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replaces the 'ytplayer' element with an <iframe> and YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player("ytplayer", {
		height: "560",
		width: "315",
		videoId: "hfx8H7YrmTw" //Insert your YouTube video ID
	});
}

/***********************
	THE MODAL
***********************/
var modal = document.getElementById("videoModal");
var playBtn = document.getElementById("playBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, Open the modal
playBtn.onclick = function() {
	modal.style.display = "block";
	player.playVideo();
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
	player.stopVideo();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
		player.stopVideo();
	}
};