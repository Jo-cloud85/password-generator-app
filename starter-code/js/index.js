// ---------- Changing SVG element on hover ---------- //
const copyBtn = document.querySelector("#copy-btn"),
      copyPathElement = copyBtn.querySelector("svg path"),
      generateBtn = document.querySelector("#generate-btn"),
      pathElement = generateBtn.querySelector("svg path");

copyBtn.addEventListener("mouseover", () => { //const copyBtn already defined at the top 
    copyPathElement.style.fill = "var(--almost-white)";
});

copyBtn.addEventListener("mouseout", () => {
    copyPathElement.style.fill = "";
});

generateBtn.addEventListener("mouseover", () => {
    generateBtn.style.backgroundColor = "transparent";
    generateBtn.style.color = "var(--neon-green)";
    pathElement.style.fill = "var(--neon-green)";
});

generateBtn.addEventListener("mouseout", () => {
    generateBtn.style.backgroundColor = "";
    generateBtn.style.color = "";
    pathElement.style.fill = "";
});


// -------------- Customize noUiSlider -------------- //
const stepSlider = document.getElementById('slider');

noUiSlider.create(stepSlider, {
    start: 8,
    connect: [true, false],
    step: 1,
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 16
    },
    
});

let stepSliderValueElement = document.querySelector('#slider-value');

stepSlider.noUiSlider.on('update', function (values, handle) {
    stepSliderValueElement.innerHTML = values[handle];
});


// ---------------- Password generator -------------- //
let password = document.querySelector('#password');

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercaseLetters = "abcdefghijklmnopqrstuvwxyz",
      numbers = "0123456789",
      symbols = "!@#$%&*()-_+={}[]\\|;:\"',./?";

generateBtn.addEventListener("click", () => { //const generateBtn already defined at the top 
    let options = [], //to be inside addEventListener, instead of outside, to reset this list
        charList = [],
        checkboxesChecked = document.querySelectorAll("input[type=checkbox]:checked");
    //add in all the type of checkbox checked into the options list e.g. ['uppercase', 'symbols'] 
    for (const checkboxChecked of checkboxesChecked) {
        options.push(checkboxChecked.value);
        // console.log(options);
    }

    for (let x = 0; x < options.length; x++) {
        if (options[x] === "uppercase") {
            charList.push(uppercaseLetters);
        }
        if (options[x] === "lowercase") {
            charList.push(lowercaseLetters);
        }
        if (options[x] === "numbers") {
            charList.push(numbers);
        }
        if (options[x] === "symbols") {
            charList.push(symbols);
        }
    }

    charsToSelectFrom = charList.join("");

    password.value = generatePassword(charsToSelectFrom); // console.log(password.textContent); //password is an input, not span or p, thus .value has to used
    
    checkPasswordStrength(password.value.length, options.length);
})


function generatePassword(chars) {
    let passwordOutput = []; 

    for (let i = 0; i < Number(stepSliderValueElement.innerHTML); i++) {
        const indexOfChar = Math.floor(Math.random() * chars.length);
        passwordOutput.push(chars[indexOfChar]);
    }

    return passwordOutput.join("");
}

function checkPasswordStrength(length, complexity) {
    const strengthSection = document.querySelector("#password-strength-section"),
          strengthText = document.querySelector("#password-strength span"),
          strengthBar = document.querySelectorAll(".indicator"),
          redStrength = document.querySelectorAll(".indicator:nth-child(-n+1)"),
          orangeStrength = document.querySelectorAll(".indicator:nth-child(-n+2)"),
          yellowStrength = document.querySelectorAll(".indicator:nth-child(-n+3)"),
          greenStrength = document.querySelectorAll(".indicator:nth-child(-n+4)");
    
    let strength = length * complexity; //as a guide to determine password strength

    strengthSection.classList.remove('na'); //to reset the strengthSection classes

    strengthBar.forEach(element => { //to reset the strengthBar classes
        element.classList.remove('red', 'orange', 'yellow', 'green');
    });

    if (strength < 1) {
        strengthText.textContent = "N.A.";
        strengthSection.classList.add('na');

    } else if (strength >= 1 && strength < 8) {
        redStrength.forEach(element => {
            element.classList.add('red');
        });
        strengthText.textContent = "TOO WEAK!";

    } else if (strength >= 8 && strength < 16) {
        orangeStrength.forEach(element => {
            element.classList.add('orange');
        });
        strengthText.textContent = "WEAK";
        
    } else if (strength >= 16 && strength < 32) {
        yellowStrength.forEach(element => {
            element.classList.add('yellow');
        });
        strengthText.textContent = "MEDIUM";

    } else {
        greenStrength.forEach(element => {
            element.classList.add('green');
        });
        strengthText.textContent = "STRONG";
    }
}


// ------------------- Copy feature ----------------- //
const copyWord = document.querySelector('#text-copied');

copyBtn.addEventListener("click", () => { //copyBtn already defined at the top 
    if (copyWord.style.display === "none") {
        copyWord.style.display = "block";
        password.select(); //password already defined at the top 
        password.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(password.value);
    } else {
        copyWord.style.display = "none";
    }
});

