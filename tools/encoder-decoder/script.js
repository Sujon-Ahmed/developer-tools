document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const btnConvert = document.getElementById('btn-convert');
  const btnClearInput = document.getElementById('btn-clear-input');
  const btnPasteInput = document.getElementById('btn-paste-input');
  const btnCopyOutput = document.getElementById('btn-copy-output');
  const inputStats = document.getElementById('input-stats');
  const outputStats = document.getElementById('output-stats');

  // Stats updating logic
  function updateStats() {
    const text = inputText.value;
    const chars = text.length;
    const lines = text ? text.split('\n').length : 0;
    inputStats.textContent = `Chars: ${chars} | Lines: ${lines}`;

    const outText = outputText.value;
    outputStats.textContent = `Chars: ${outText.length}`;
  }

  inputText.addEventListener('input', updateStats);

  // Conversion operations
  function doConversion() {
    const mode = document.querySelector('input[name="mode"]:checked').value;
    const algo = document.querySelector('input[name="algo"]:checked').value;
    const value = inputText.value;

    if (!value) {
      outputText.value = '';
      updateStats();
      return;
    }

    try {
      if (mode === 'encode') {
        if (algo === 'base64') {
          // UTF-8 safe base64 encoding
          outputText.value = btoa(unescape(encodeURIComponent(value)));
        } else {
          outputText.value = encodeURIComponent(value);
        }
      } else {
        if (algo === 'base64') {
          try {
            outputText.value = decodeURIComponent(escape(atob(value.trim())));
          } catch (e) {
            outputText.value = `Error: Invalid Base64 character sequence. Please check your input.`;
          }
        } else {
          try {
            outputText.value = decodeURIComponent(value.replace(/\+/g, ' '));
          } catch (e) {
            outputText.value = `Error: Invalid URI formatting. Please check your input.`;
          }
        }
      }
    } catch (err) {
      outputText.value = `Error: Conversion failed. ${err.message}`;
    }
    updateStats();
  }

  btnConvert.addEventListener('click', doConversion);
  
  // Real-time conversion on change of settings
  document.querySelectorAll('input[name="mode"], input[name="algo"]').forEach(input => {
    input.addEventListener('change', doConversion);
  });

  // Buttons actions
  btnClearInput.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    updateStats();
    inputText.focus();
  });

  btnPasteInput.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      inputText.value = text;
      updateStats();
      doConversion();
    } catch (err) {
      // Fallback
      alert('Click inside the input box and use Ctrl+V to paste your content.');
    }
  });

  btnCopyOutput.addEventListener('click', () => {
    if (!outputText.value || outputText.value.startsWith('Error:')) return;
    navigator.clipboard.writeText(outputText.value).then(() => {
      const originalText = btnCopyOutput.textContent;
      btnCopyOutput.textContent = 'Copied!';
      btnCopyOutput.style.borderColor = 'var(--success)';
      btnCopyOutput.style.color = '#10b981';
      setTimeout(() => {
        btnCopyOutput.textContent = originalText;
        btnCopyOutput.style.borderColor = '';
        btnCopyOutput.style.color = '';
      }, 1500);
    });
  });

  updateStats();
});
