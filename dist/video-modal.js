function addCss(fileName) {
  var head = document.head;
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  head.appendChild(link);
}

function createModalDiv() {
  var videoModalElement = document.createElement('div');
  videoModalElement.classList.add('video--modal');
  videoModalElement.innerHTML =
    '<div class="video--modal--content"><div class="video--modal--content--video"></div></div>';
  document.body.appendChild(videoModalElement);
}

function playVideo(videoId) {
  var videoEl = document.querySelector('.video--modal--content--video');
  var htmlObject = document.createElement('div');
  htmlObject.classList.add('video--modal--responsive');
  var videosrc = 'https://www.youtube.com/embed/' + videoId + '?rel=0&amp;showinfo=0&autoplay=1';
  var videoIframe = '<iframe width="560" height="315" src="' + videosrc + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  var bgVideo = videoIframe;
  htmlObject.innerHTML = bgVideo;
  videoEl.appendChild(htmlObject);
}

function stopVideo() {
  var videoEl = document.querySelector('.video--modal--content--video');
  videoEl.innerHTML = '';
}

function getVideoModalScriptPath(scripts) {
  var scriptUrl, cssUrl;
  for (var i=0; i< scripts.length; i++) {
    if (scripts[i].src.startsWith('https://unpkg.com/video-modal') || scripts[i].src.indexOf('dist/video-modal.min.js') != -1 ) {
      scriptUrl = scripts[i].src;
      break;
    }
  }
  // check if the script contains the entire path. Note: You dont need the entire path to get the latest version from unpkg.com
  if (scriptUrl.indexOf('video-modal.min.js') != -1) {
    cssUrl = scriptUrl.replace('video-modal.min.js', 'video-modal.css');
  } else {
    cssUrl = scriptUrl + '/dist/video-modal.min.css';
  }
  return cssUrl;
}

document.addEventListener('DOMContentLoaded', function () {
  var scripts = document.getElementsByTagName("script");
  var cssUrl = getVideoModalScriptPath(scripts);
  addCss(cssUrl);
  createModalDiv.call(this);
  var modalElement = document.querySelector('.video--modal');
  var watchVideoBtn = document.querySelector('[data-video-id]');
  var videoId = watchVideoBtn.dataset.videoId;
  // When the user clicks the button, open the modal 
  watchVideoBtn.onclick = function () {
    modalElement.style.display = "block";
    playVideo(videoId);
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modalElement) {
      modalElement.style.display = "none";
      stopVideo();
    }
  }
});

