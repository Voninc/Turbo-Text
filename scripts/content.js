function boldCharactersInWords(text) {
    const words = text.split(/\s+/);
    const modifiedWords = words.map((word) => {
        if (word.length > 1) {
            const charsToBold = Math.ceil(word.length * 0.35);
            const boldedPart = `<strong>${word.slice(0, charsToBold)}</strong>`;
            const remainingPart = word.slice(charsToBold);
            return boldedPart + remainingPart;
        }
        return word;
    });

    return modifiedWords.join(' ');
}

document.body.innerHTML = boldCharactersInWords(document.body.innerText);
