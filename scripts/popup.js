document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');

  chrome.storage.sync.get('isEnabled', function (data) {
      const isEnabled = data.isEnabled || false;

      if (isEnabled) {
          toggleButton.textContent = 'Off';
          toggleButton.classList.add('off');
      } else {
          toggleButton.textContent = 'On';
      }
  });

  toggleButton.addEventListener('click', function () {
      chrome.runtime.sendMessage({ action: 'toggle' }, function (response) {
          const isCurrentlyEnabled = toggleButton.classList.contains('off');

          if (isCurrentlyEnabled) {
              toggleButton.textContent = 'On';
              toggleButton.classList.remove('off');
          } else {
              toggleButton.textContent = 'Off';
              toggleButton.classList.add('off');
          }
      });
  });
});
