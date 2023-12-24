document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
  
    chrome.storage.sync.get('isEnabled', function (data) {
      const isEnabled = data.isEnabled || false;
  
      if (isEnabled) {
        toggleButton.textContent = 'Turn Off';
      } else {
        toggleButton.textContent = 'Turn On';
      }
    });
  
    toggleButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'toggle' }, function (response) {
        if (response.isEnabled) {
          toggleButton.textContent = 'Turn Off';
        } else {
          toggleButton.textContent = 'Turn On';
        }
      });
    });
  });
  