// 1. Handle auto-playing videos
function handleVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video.dataset.extensionManaged) return;
    video.dataset.extensionManaged = "true";
    
    video.addEventListener('play', () => {
      if (video.dataset.userAllowed !== "true") {
        video.pause();
      }
    });
    
    const container = video.closest('[class^="YlePlayer__VideoContainer"]');
    if (container) {
      const playButton = container.querySelector('.background-video-play-button');
      if (playButton) {
        playButton.addEventListener('click', () => {
          video.dataset.userAllowed = "true";
        });
      }
    }
  });
}

// 2. Nuke the word game banner
function nukeSanapyramidi() {
  const headlines = document.querySelectorAll('h2');
  headlines.forEach(headline => {
    if (headline.textContent.includes('Sanapyramidi')) {
      const container = headline.closest('[class^="Group__Container"]');
      if (container) container.remove();
    }
  });
}

// 3. Nuke the Shorts carousel
function nukeShorts() {
  const headlines = document.querySelectorAll('h2');
  headlines.forEach(headline => {
    if (headline.textContent.includes('Lyhyet')) {
      // Traverse up to the main GridCell so it doesn't leave an empty space in the layout
      const container = headline.closest('[class^="GridSystem__GridCell"]');
      if (container) container.remove();
    }
  });
}

// --- Main Execution ---

function runAllManipulations() {
  handleVideos();
  nukeSanapyramidi();
  nukeShorts();
}

// Run once immediately when the script injects
runAllManipulations();

// Watch the DOM for any new elements loaded by scrolling
const observer = new MutationObserver(() => {
  runAllManipulations();
});

observer.observe(document.body, { childList: true, subtree: true });