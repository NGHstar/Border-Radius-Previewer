// variables
let cssText = "";
let isLocked = false;

// elements
const inputs = document.querySelectorAll("input[type='number']");
const copyButton = document.querySelector(".js-copy-button");
const card = document.querySelector(".card");
const copyMessage = document.querySelector(".copy-message");
const isLockedElement = document.querySelector(".js-is-locked");

// listeners
isLockedElement.addEventListener("change", (v) => {
  isLocked = v.target.checked;

  if (isLocked) {
    syncInputs(inputs[0].value);
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    if (isLocked) {
      syncInputs(event.target.value);
    }
    changeBorderRadius();
  });
});

copyButton.addEventListener("click", copyCssToClipBoard);

// functions
function syncInputs(value) {
  inputs.forEach((input) => {
    input.value = value;
  });
  changeBorderRadius();
}

function changeBorderRadius() {
  const values = Array.from(inputs).map((input) =>
    input.value ? `${input.value}px` : "0px"
  );
  cssText = values.join(" ");
  card.style.borderRadius = cssText;
}

let timeoutId;
function copyCssToClipBoard() {
  if (isLocked) {
    navigator.clipboard.writeText(`border-radius: ${inputs[0].value}px;`);
  } else {
    navigator.clipboard.writeText(`border-radius: ${cssText};`);
  }

  copyMessage.classList.remove("hidden");

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    copyMessage.classList.add("hidden");
  }, 1200);
}
