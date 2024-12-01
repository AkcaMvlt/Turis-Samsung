"use strict";
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var youtubePlayer;
function onYouTubeIframeAPIReady() {
  youtubePlayer = new YT.Player("player", {
    events: {
      onReady: youtubePlayerReady,
      onStateChange: youtubePlayerStateChange
    },
    playerVars: {
      controls: 0,
      modestbranding: 0,
      rel: 0,
      showinfo: 0,
      loop: 0,
      iv_load_policy: 3,
      enablejsapi: 1
    }
  });
}
var youtubePlayerReady = function () {
  youtubePlayer.loadVideoById({ videoId: "hfx8H7YrmTw" });
  $("#controller .play").toggleClass("hidden");
  $("#controller .pause").toggleClass("hidden");
};
var youtubePlayerStateChange = function () {
  console.log(youtubePlayer.getDuration());
  $("#controller .seek .scrubber").attr("max", youtubePlayer.getDuration());
  $("#controller .seek .elapsed").attr("max", youtubePlayer.getDuration());
  if (
    youtubePlayer.getPlayerState() == 2 &&
    $("#controller .play").hasClass("hidden")
  ) {
    $("#controller .play").toggleClass("hidden");
    $("#controller .pause").toggleClass("hidden");
  } else if (
    youtubePlayer.getPlayerState() == 1 &&
    $("#controller .pause").hasClass("hidden")
  ) {
    $("#controller .play").toggleClass("hidden");
    $("#controller .pause").toggleClass("hidden");
  } else {
    return !1;
  }
};
var salad_buildButtons = function (dest, fa_slug) {
  var address = "https://maxcdn.bootstrapcdn.com/font-awesome",
    uri = address + "/4.7.0/css/font-awesome.min.css",
    id = fa_slug.split("-")[1];
  if ($("head").find("link").attr("href") != uri) {
    $("head").prepend('<link rel="stylesheet" href="' + uri + '"/>');
  }
  $(dest).append('<button class="' + id + '"></button>');
  $(dest + " ." + id).addClass("fa " + fa_slug);
  if (fa_slug == "fa-pause") {
    $(dest + " ." + id).addClass("hidden");
  }
};
var salad_buildSeekbar = function (dest, time) {
  $(dest).append('<div class="seek"></div>');
  $(dest + " .seek").append(
    '<progress min="0" value="0" class="elapsed"></progress>'
  );
  $(dest + " .seek").append(
    '<input type="range" min="0" value="0" class="scrubber"/>'
  );
  if ((time = !0 || "time")) {
    $(dest).append('<div class="time"></div>');
  } else {
    return (time = !1);
  }
};
var salad_watchForEvents = function () {
  var range = $(".scrubber"),
    progress = $(".elapsed");
  range.on("click", function () {
    console.log($(this).val());
    progress.val($(this).val());
    youtubePlayer.seekTo($(this).val());
  });
  var play = $(".play"),
    pause = $(".pause");
  play.on("click", function (event) {
    event.preventDefault();
    youtubePlayer.playVideo();
    play.toggleClass("hidden");
    pause.toggleClass("hidden");
  });
  pause.on("click", function (event) {
    event.preventDefault();
    youtubePlayer.pauseVideo();
    pause.toggleClass("hidden");
    play.toggleClass("hidden");
  });
  window.setInterval(function () {
    $(".time").text(
      convertsec(youtubePlayer.getCurrentTime()) +
        " / " +
        convertsec(youtubePlayer.getDuration())
    );
    function convertsec(time) {
      var h = Math.floor(time / 3600),
        m = Math.floor((time % 3600) / 60),
        s = Math.floor((time % 3600) % 60);
      return (
        (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") +
        m +
        ":" +
        (s < 10 ? "0" : "") +
        s
      );
    }
    progress.val(youtubePlayer.getCurrentTime());
  }, 1000);
  var volume = $(".volume");
  volume.on("click", function (event) {
    event.preventDefault();
    console.log($("this").hasClass("fa-volume-up"));
    if ($(this).hasClass("fa-volume-up")) {
      $(this).toggleClass("fa-volume-up");
      $(this).toggleClass("fa-volume-down");
      youtubePlayer.setVolume(50);
    } else if ($(this).hasClass("fa-volume-down")) {
      $(this).toggleClass("fa-volume-down");
      $(this).toggleClass("fa-volume-off");
      youtubePlayer.setVolume(0);
    } else {
      $(this).toggleClass("fa-volume-off");
      $(this).toggleClass("fa-volume-up");
      youtubePlayer.setVolume(100);
    }
  });
};
salad_buildButtons("#controller", "fa-backward");
salad_buildButtons("#controller", "fa-play");
salad_buildButtons("#controller", "fa-pause");
salad_buildButtons("#controller", "fa-forward");
salad_buildSeekbar("#controller", "time");
salad_buildButtons("#controller", "fa-volume-up");
salad_watchForEvents();