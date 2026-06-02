document.addEventListener('DOMContentLoaded', () => {
  const jsonInput = document.getElementById('json-input');
  const jsonOutput = document.getElementById('json-output');
  const indentSize = document.getElementById('indent-size');
  const btnFormat = document.getElementById('btn-format');
  const btnMinify = document.getElementById('btn-minify');
  const btnClearInput = document.getElementById('btn-clear-input');
  const btnSampleJson = document.getElementById('btn-sample-json');
  const btnCopyOutput = document.getElementById('btn-copy-output');
  const validationAlert = document.getElementById('validation-alert');

  // Sample JSON
  const sampleData = {
    "appName": "Developer Tools Suite",
    "version": "1.0.0",
    "active": true,
    "features": [
      "Encoders & Decoders",
      "Formatters & Parsers",
      "Generators"
    ],
    "author": {
      "name": "Sujon Ahmed",
      "github": "https://github.com/Sujon-Ahmed"
    },
    "metadata": null
  };

  // Validation function
  function validateJSON() {
    const rawVal = jsonInput.value.trim();
    if (!rawVal) {
      validationAlert.className = 'validation-bar';
      validationAlert.textContent = 'JSON is ready to validate';
      return false;
    }

    try {
      JSON.parse(rawVal);
      validationAlert.className = 'validation-bar valid';
      validationAlert.textContent = '✓ Valid JSON syntax!';
      return true;
    } catch (e) {
      validationAlert.className = 'validation-bar invalid';
      validationAlert.textContent = `✗ Invalid JSON: ${e.message}`;
      return false;
    }
  }

  // Handle Input change for validation
  jsonInput.addEventListener('input', validateJSON);

  // Formatting operations
  function formatJSON() {
    const rawVal = jsonInput.value.trim();
    if (!rawVal) return;

    if (validateJSON()) {
      try {
        const parsed = JSON.parse(rawVal);
        const indent = indentSize.value;
        const spacing = indent === 'tab' ? '\t' : parseInt(indent, 10);
        jsonOutput.value = JSON.stringify(parsed, null, spacing);
      } catch (e) {
        jsonOutput.value = `Error parsing JSON during format operation.`;
      }
    } else {
      jsonOutput.value = `Cannot format: Input is invalid JSON.`;
    }
  }

  // Minifying operations
  function minifyJSON() {
    const rawVal = jsonInput.value.trim();
    if (!rawVal) return;

    if (validateJSON()) {
      try {
        const parsed = JSON.parse(rawVal);
        jsonOutput.value = JSON.stringify(parsed);
      } catch (e) {
        jsonOutput.value = `Error minifying JSON.`;
      }
    } else {
      jsonOutput.value = `Cannot minify: Input is invalid JSON.`;
    }
  }

  // Button Listeners
  btnFormat.addEventListener('click', formatJSON);
  btnMinify.addEventListener('click', minifyJSON);

  btnClearInput.addEventListener('click', () => {
    jsonInput.value = '';
    jsonOutput.value = '';
    validateJSON();
    jsonInput.focus();
  });

  btnSampleJson.addEventListener('click', () => {
    jsonInput.value = JSON.stringify(sampleData, null, 2);
    validateJSON();
  });

  btnCopyOutput.addEventListener('click', () => {
    if (!jsonOutput.value || jsonOutput.value.startsWith('Error') || jsonOutput.value.startsWith('Cannot')) return;
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
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
});
