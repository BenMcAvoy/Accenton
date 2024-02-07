// Create a list of alt+char to type accented characters
const charMap = {
  'a': 'á',
  'e': 'é',
  'i': 'í',
  'o': 'ó',
  'u': 'ú',
  'n': 'ñ',
  '?': '¿',
  '/': '¿',
  '!': '¡',
  '1': '¡',
  '<': '«',
  '>': '»',
  ',': '«',
  '.': '»',
};

document.addEventListener("keydown", function (keysDown) {
  // Get our basic variables and references to the textarea
  const text = document.getElementById('text');
  const startPos = text.selectionStart;
  const endPos = text.selectionEnd;
  const currentLine = text.value.substring(0, startPos).split('\n').pop();

  if (keysDown.altKey) {
    keysDown.preventDefault();

    // Get the accented version of the key
    const char = charMap[keysDown.key];

    if (char) {
      const newText = text.value.substring(0, startPos)
        + char
        + text.value.substring(endPos, text.value.length);

      const newCursorPos = startPos + char.length;

      text.value = newText;
      text.selectionStart = newCursorPos;
      text.selectionEnd = newCursorPos;
    }
  }

  // If our cursor is on a list item, add a new list item on newline
  if (currentLine.match(/^\d+\./) && keysDown.key == "Enter") {
    keysDown.preventDefault();

    // Get the next number
    const nextNumber = parseInt(currentLine) + 1;

    // Create a new line with the same indentation as the current line
    const currentLineIndentation = currentLine.match(/^\s*/)?.[0] || '';
    const addText = `${currentLineIndentation}${nextNumber}. `;


    // Calculate the new cursor position
    const newCursorPos = endPos + addText.length +  1;

    // Insert the new item below the current line
    text.value = `${text.value.slice(0, endPos)}\n${addText}${text.value.slice(endPos)}`;

    text.selectionStart = text.selectionEnd = newCursorPos;
  }

  // If our cursor is on a number (list item), remove the whole list item
  if (currentLine.match(/^\d+\.?\s?$/) && keysDown.key == "Backspace") {
    keysDown.preventDefault();

    var cursorPos = text.selectionStart;

    if (cursorPos >= 3) {
      var textBefore = text.value.substring(0, cursorPos -  3);
      var textAfter = text.value.substring(cursorPos);
      text.value = textBefore + textAfter;

      text.selectionStart = text.selectionEnd = cursorPos -  3;
    }
  }

  localStorage.setItem('text', text.value);
});


// On the window loading, load the text from storage to synchronise with the
// last instance of Accenton that was loaded.
window.onload = function () {
  const text = document.getElementById('text');
  const savedValue = localStorage.getItem('text');

  if (savedValue) {
    text.value = savedValue;
  }
};
