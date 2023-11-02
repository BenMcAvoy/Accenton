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

document.addEventListener("keydown", function (event) {
  // Get our basic variables and references to the textarea
  const text = document.getElementById('text');
  const startPos = text.selectionStart;
  const endPos = text.selectionEnd;
  const currentLine = text.value.substring(0, startPos).split('\n').pop();

  // If we are holding alt
  if (event.altKey) {
    // Don't press the normal key
    event.preventDefault();

    // Get the accented version of the key
    const char = charMap[event.key];

    // If we got one
    if (char) {
      // Create the new text to set
      const newText = text.value.substring(0, startPos) 
        + char 
        + text.value.substring(endPos, text.value.length);

      // Get the new cursor position
      const newCursorPos = startPos + char.length;

      // Set all the values
      text.value = newText;
      text.selectionStart = newCursorPos;
      text.selectionEnd = newCursorPos;
    }
  }

  if (currentLine.match(/^\d+\./) && event.key == "Enter") {
    // Don't create a new line (we will make one manually)
    event.preventDefault();
    
    // Get the next number
    const nextNumber = parseInt(currentLine) + 1;

    // Get the text to make a new number
    const addText = "\n" + nextNumber + ". ";
    
    // Fill out the rest of the text
    const newText = text.value.substring(0, startPos) + addText;

    // Get the new cursor position
    const newCursorPos = startPos + addText.length;
    
    // text.value = newText.slice(0, -1);

    // Set all the values
    text.value = newText;
    text.selectionStart = newCursorPos;
    text.selectionEnd = newCursorPos;
  }

  // Save our current text
  localStorage.setItem('text', text.value);
});

// On the window loading
window.onload = function () {
  // Get the texarea and saved text
  const text = document.getElementById('text');
  const savedValue = localStorage.getItem('text');

  // Set the text from storage
  if (savedValue) {
    text.value = savedValue;
  }
};
