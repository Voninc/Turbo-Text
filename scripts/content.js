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
  
  // Apply bolding to the entire document body
  boldCharactersInWords(document.body);
  