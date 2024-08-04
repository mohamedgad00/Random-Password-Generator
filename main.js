// Selecting the necessary elements from the DOM
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// The character sets that will be used to generate the password
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~",
};

// The function that generates the password based on the selected options and length
const generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  const passLength = lengthSlider.value;

  // Loop through the options to build the "static" portion of the password
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}`;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // Loop through the length of the password to build the "random" portion of the password
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // Check if the random character has already been added to the password
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--; // Decrement i if the random character is a duplicate
    } else {
      randomPassword += randomChar;
    }
  }

  // Set the value of the password input field to the generated password
  passwordInput.value = randomPassword;
};

// Updates the strength indicator based on the password length
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// Updates the slider value and generates a new password and updates the strength indicator
const updateSlider = () => {
  document.querySelector(".pass-length .details span").textContent =
    lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};

// Initializes the slider and generates a new password and updates the strength indicator
updateSlider();

// Copies the password to the clipboard when the copy icon is clicked
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.textContent = "check";
  setTimeout(() => (copyIcon.textContent = "copy_all"), 3000);
};

// Add event listeners to the copy icon, slider, and generate button
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
