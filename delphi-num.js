const letters = Array.from(document.querySelectorAll('.letter'));
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const meaningBtn = document.getElementById('meaningBtn');
const finalNumberEl = document.getElementById('finalNumber');
const meaningTextEl = document.getElementById('meaningText');

const CAD1 = '*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CAD2 = '01234567891234567891234567812345678912345678912345678';

let lastNumber = 0;

const sanitizeChar = (value) => {
  if (!value) return '*';
  const char = value.charAt(0);
  return CAD1.includes(char) ? char : '*';
};

const charToDigit = (char) => {
  const idx = CAD1.indexOf(char);
  if (idx < 0) return 0;
  return Number(CAD2.charAt(idx));
};

const reduceNumber = (n) => {
  if (n <= 0) return 0;
  return ((n - 1) % 9) + 1;
};

const calculate = () => {
  const chars = letters.map((input) => {
    input.value = sanitizeChar(input.value);
    return input.value;
  });

  const total = chars.reduce((sum, char) => sum + charToDigit(char), 0);
  const totalText = String(total);

  const first = Number(totalText.charAt(0) || '0');
  const second = Number(totalText.charAt(1) || '0');
  const pairSum = first + second;

  const final = second === 0 ? first : reduceNumber(pairSum);
  lastNumber = final;
  finalNumberEl.textContent = String(final);
};

const resetFields = () => {
  letters.forEach((input) => {
    input.value = '*';
  });
  lastNumber = 0;
  finalNumberEl.textContent = '0';
  meaningTextEl.textContent = 'Digite alguma coisa';
  letters[0].focus();
};

const showMeaning = () => {
  if (lastNumber >= 1 && lastNumber <= 9) {
    meaningTextEl.textContent = `voce e o numero ${lastNumber}`;
    return;
  }
  meaningTextEl.textContent = 'Digite alguma coisa';
};

letters.forEach((input, index) => {
  input.addEventListener('input', () => {
    input.value = sanitizeChar(input.value);
    if (input.value.length >= 1 && index < letters.length - 1) {
      letters[index + 1].focus();
    }
  });
});

startBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', resetFields);
meaningBtn.addEventListener('click', showMeaning);
