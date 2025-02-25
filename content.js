const worker = new Worker(chrome.runtime.getURL('worker.js'));

// Feature extraction for AI model
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

// Main scanning and blocking function
async function scanPage() {
  // Quick YouTube-specific ad removal
  if (location.hostname === 'www.youtube.com') {
    // Remove overlay and banner ads
    const adElements = document.querySelectorAll(
      '.ytp-ad-module, .ytp-ad-overlay, .video-ads, .ytp-ad-text, .ytp-ad-image'
    );
    adElements.forEach(el => {
      el.style.display = 'none';
      console.log(`Removed YouTube ad element: ${el.className}`);
    });

    // Auto-skip skippable video ads
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
    if (skipButton) {
      skipButton.click();
      console.log('Skipped video ad');
    }

    // Attempt to detect and skip non-skippable ads (experimental)
    const videoPlayer = document.querySelector('video');
    if (videoPlayer && document.querySelector('.ytp-ad-player-overlay')) {
      // Fast-forward if ad is playing (works inconsistently due to YouTube restrictions)
      videoPlayer.currentTime = videoPlayer.duration || Number.MAX_SAFE_INTEGER;
      console.log('Attempted to skip non-skippable ad');
    }
  }

  // AI-based scanning for remaining elements
  const elements = document.querySelectorAll('div, iframe, img, .ytp-ad-module, .video-ads');
  for (const el of elements) {
    // Immediate block for known YouTube ad classes
    if (el.className.includes('ytp-ad') || el.className.includes('video-ads')) {
      el.style.display = 'none';
      console.log(`Blocked YouTube ad: ${el.className}`);
      continue;
    }
    // Send to AI model for prediction
    const features = getFeatures(el);
    worker.postMessage({ features, id: el.id || Math.random().toString() });
  }
}

// Handle AI predictions from worker
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

// Run on page load and monitor DOM changes
window.addEventListener('load', scanPage);
new MutationObserver(scanPage).observe(document.body, { childList: true, subtree: true });

// Continuous monitoring for YouTube ads (runs every second)
if (location.hostname === 'www.youtube.com') {
  setInterval(() => {
    scanPage(); // Re-run to catch dynamically loaded ads
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button');
    if (skipButton) skipButton.click();
  }, 1000);
}