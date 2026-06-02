document.addEventListener('DOMContentLoaded', () => {
  // Password elements
  const passOutput = document.getElementById('pass-output');
  const btnGenPass = document.getElementById('btn-gen-pass');
  const btnCopyPass = document.getElementById('btn-copy-pass');
  const passLength = document.getElementById('pass-length');
  const lengthVal = document.getElementById('length-val');
  const passUpper = document.getElementById('pass-upper');
  const passLower = document.getElementById('pass-lower');
  const passNumbers = document.getElementById('pass-numbers');
  const passSymbols = document.getElementById('pass-symbols');
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');

  // UUID elements
  const uuidQty = document.getElementById('uuid-quantity');
  const uuidQtyVal = document.getElementById('uuid-qty-val');
  const uuidUppercase = document.getElementById('uuid-uppercase');
  const uuidHyphens = document.getElementById('uuid-hyphens');
  const btnGenUuid = document.getElementById('btn-gen-uuid');
  const btnCopyUuids = document.getElementById('btn-copy-uuids');
  const uuidsOutput = document.getElementById('uuids-output');

  // 1. PASSWORD GENERATOR LOGIC
  const CHARSETS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  // Update slider labels
  passLength.addEventListener('input', () => {
    lengthVal.textContent = passLength.value;
  });

  uuidQty.addEventListener('input', () => {
    uuidQtyVal.textContent = uuidQty.value;
  });

  function calculateStrength(password, length, setsCount) {
    if (!password) return { class: '', text: 'Password Strength' };
    
    // Simple entropy score
    const entropy = length * Math.log2(setsCount * 15 || 1);
    
    if (entropy < 40 || length < 8) {
      return { class: 'weak', text: 'Weak Password' };
    } else if (entropy < 75 || setsCount < 3) {
      return { class: 'medium', text: 'Medium Password' };
    } else {
      return { class: 'strong', text: 'Strong Password' };
    }
  }

  function generatePassword() {
    let charset = '';
    let setsCount = 0;
    
    if (passUpper.checked) { charset += CHARSETS.upper; setsCount++; }
    if (passLower.checked) { charset += CHARSETS.lower; setsCount++; }
    if (passNumbers.checked) { charset += CHARSETS.numbers; setsCount++; }
    if (passSymbols.checked) { charset += CHARSETS.symbols; setsCount++; }

    if (!charset) {
      passOutput.value = '';
      strengthBar.className = 'strength-bar';
      strengthLabel.textContent = 'Select at least 1 checkbox!';
      return;
    }

    const length = parseInt(passLength.value, 10);
    let password = '';
    
    // Secure random generation fallback to Math.random
    const array = new Uint32Array(length);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = array[i] ? (array[i] % charset.length) : Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    passOutput.value = password;
    
    // Update Strength UI
    const strength = calculateStrength(password, length, setsCount);
    strengthBar.className = `strength-bar ${strength.class}`;
    strengthLabel.textContent = strength.text;
  }

  btnGenPass.addEventListener('click', generatePassword);

  // 2. UUID GENERATOR LOGIC
  function generateUUIDv4() {
    // Generate secure UUID RFC 4122 v4
    let uuid = '';
    if (window.crypto && window.crypto.randomUUID) {
      uuid = crypto.randomUUID();
    } else {
      // Fallback
      uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    const includeHyphens = uuidHyphens.checked;
    const isUppercase = uuidUppercase.checked;

    if (!includeHyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    if (isUppercase) {
      uuid = uuid.toUpperCase();
    }
    return uuid;
  }

  function generateUUIDBatch() {
    const quantity = parseInt(uuidQty.value, 10);
    const results = [];
    for (let i = 0; i < quantity; i++) {
      results.push(generateUUIDv4());
    }
    uuidsOutput.value = results.join('\n');
  }

  btnGenUuid.addEventListener('click', generateUUIDBatch);

  // 3. COPY BUTTONS
  function setupCopyButton(btn, targetField, isTextArea = false) {
    btn.addEventListener('click', () => {
      const val = isTextArea ? targetField.value : targetField.value;
      if (!val) return;

      navigator.clipboard.writeText(val).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--success)';
        btn.style.color = '#10b981';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1500);
      });
    });
  }

  setupCopyButton(btnCopyPass, passOutput, false);
  setupCopyButton(btnCopyUuids, uuidsOutput, true);

  // Initial runs
  generatePassword();
  generateUUIDBatch();
});
