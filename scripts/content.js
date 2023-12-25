function boldCharactersInWords(node) {
  if (node.nodeType === Node.TEXT_NODE) {
      const words = node.nodeValue.split(/\s+/);
      const modifiedWords = words.map((word) => {
          if (word.length > 1) {
              const charsToBold = Math.ceil(word.length * 0.35);
              const boldedPart = `<strong>${word.slice(0, charsToBold)}</strong>`;
              const remainingPart = word.slice(charsToBold);
              return boldedPart + remainingPart;
          }
          return word;
      });

      const modifiedText = modifiedWords.join(' ');
      const newElement = document.createElement('span');
      newElement.innerHTML = modifiedText;

      // Replace the original text node with the modified HTML
      node.parentNode.replaceChild(newElement, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Recursively process child nodes for element nodes
      node.childNodes.forEach((childNode) => boldCharactersInWords(childNode));
  }
}

// Function to remove bolding from the entire document body
function removeBolding(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
      node.querySelectorAll('strong').forEach((strongElement) => {
          const textNode = document.createTextNode(strongElement.textContent);
          strongElement.parentNode.replaceChild(textNode, strongElement);
      });
  }
}

// Initial bolding on page load
boldCharactersInWords(document.body);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggle') {
      // Toggle the extension on/off
      if (request.isEnabled) {
          // If enabled, remove bolding
          removeBolding(document.body);
      } else {
          // If disabled, apply bolding
          boldCharactersInWords(document.body);
      }
  }
});
