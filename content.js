const worker = new Worker(chrome.runtime.getURL('worker.js'));

function getFeatures(element) {
  const isYouTubeAd = element.className.includes('ytp-ad') || 
                     element.className.includes('video-ads') || 
                     element.id.includes('ad');
  return [
    element.offsetWidth || 0,
    element.offsetHeight || 0,
    element.innerText.includes('sponsored') || 
    element.innerText.includes('ad') || 
    isYouTubeAd ? 1 : 0
  ];
}

async function scanPage() {
  if (location.hostname === 'www.youtube.com') {
    const adElements = document.querySelectorAll(
      '.ytp-ad-module, .ytp-ad-overlay, .video-ads, .ytp-ad-text, .ytp-ad-image'
    );
    adElements.forEach(el => {
      el.style.display = 'none';
      console.log(`Removed YouTube ad element: ${el.className}`);
    });

    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
    if (skipButton) {
      skipButton.click();
      console.log('Skipped video ad');
    }

    const videoPlayer = document.querySelector('video');
    if (videoPlayer && document.querySelector('.ytp-ad-player-overlay')) {
      videoPlayer.currentTime = videoPlayer.duration || Number.MAX_SAFE_INTEGER;
      console.log('Attempted to skip non-skippable ad');
    }
  }

  const elements = document.querySelectorAll('div, iframe, img, .ytp-ad-module, .video-ads');
  for (const el of elements) {
    if (el.className.includes('ytp-ad') || el.className.includes('video-ads')) {
      el.style.display = 'none';
      console.log(`Blocked YouTube ad: ${el.className}`);
      continue;
    }
    const features = getFeatures(el);
    worker.postMessage({ features, id: el.id || Math.random().toString() });
  }
}

worker.onmessage = (e) => {
  const { id, isAd } = e.data;
  console.log(`Element ${id}: isAd = ${isAd}`);
  if (isAd) {
    const element = document.getElementById(id) || 
                    Array.from(document.querySelectorAll('*')).find(el => el.id === id);
    if (element) {
      element.style.display = 'none';
      console.log(`AI blocked element: ${id}`);
    }
  }
};

window.addEventListener('load', scanPage);
new MutationObserver(scanPage).observe(document.body, { childList: true, subtree: true });

if (location.hostname === 'www.youtube.com') {
  setInterval(() => {
    scanPage(); 
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
    if (skipButton) skipButton.click();
  }, 1000);
}
