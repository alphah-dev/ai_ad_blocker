chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      const url = details.url;
      const blockList = [
        /doubleclick\.net/,
        /adsense\.google\.com/,
        /googlesyndication\.com/,
        /youtube\.com\/.*[\?&]adformat=/,
        /youtube\.com\/.*[\?&]ad_unit/,
        /youtube\.com\/get_video_info.*[\?&]ad/
      ];
      const shouldBlock = blockList.some(regex => regex.test(url));
      if (shouldBlock) console.log(`Blocked: ${url}`);
      return { cancel: shouldBlock };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );