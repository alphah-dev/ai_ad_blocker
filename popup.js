document.getElementById('toggle').addEventListener('click', () => {
    chrome.storage.local.get(['enabled'], (result) => {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState }, () => {
        chrome.runtime.sendMessage({ action: 'toggle', enabled: newState });
        document.getElementById('toggle').textContent = `Toggle ${newState ? 'Off' : 'On'}`;
      });
    });
  });
  
  chrome.storage.local.get(['enabled'], (result) => {
    document.getElementById('toggle').textContent = `Toggle ${result.enabled === false ? 'On' : 'Off'}`;
  });