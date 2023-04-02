const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d",
    "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`",
    "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}",
    "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];



function generateRandomNumber() {
    return Math.floor(Math.random() * characters.length);
}

function generatePasswords() {
    let messageWindow = document.getElementById("message-box");
    messageWindow.textContent = "";
    let passwordLengthWindow = document.getElementById("passwordLenght");
    let passwordLength = passwordLengthWindow.value;
    let firstPasswordWindow = document.getElementById("firstPassword");
    let seconPasswordWindow = document.getElementById("secondPassword");
    let checkBoxValues = getValuesFromCheckBox();

    if (validateInputBox(messageWindow, checkBoxValues, passwordLength)) {
        firstPasswordWindow.value = generateNewPassword(passwordLength, checkBoxValues);
        seconPasswordWindow.value = generateNewPassword(passwordLength, checkBoxValues);
    }

}

function generateNewPassword(passwordLenght, checkBoxValues) {
    let password = "";
    let typeOfChar = "";
    for (let i = 0; i < passwordLenght; i++) {
        let charFromArray = characters[generateRandomNumber()];
        typeOfChar = checkTypeOfChar(charFromArray);
        if (checkIfCharCanBeAddedToPassword(typeOfChar, checkBoxValues)) {
            password += charFromArray
        }
        else {
            i -= 1
        }
    }
    return password;
}

function copyInputBoxValue(inputBoxID) {
    let inputBox = document.getElementById(inputBoxID);
    inputBox.select();
    document.execCommand("copy");
    alert("Password was copied")
}

function getValuesFromCheckBox() {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    let values = {};

    checkboxes.forEach((checkbox) => {
        values[checkbox.name] = checkbox.checked;
    });
    return values;
}

function checkTypeOfChar(char) {
    //isNaN() check if number
    //isFinite() check if it is infinite
    if (!isNaN(char) && isFinite(char)) {
        return "Number";
    } else if (char.match(/[a-z]/i)) {
        return "Letter";
    } else {
        return "specialChar";
    }
}

function checkIfCharCanBeAddedToPassword(typeOfChar, checkBoxValues) {
    if (typeOfChar in checkBoxValues) {
        return checkBoxValues[typeOfChar]
    }
    return false;
}

function validateInputBox(messageWindow, checkBoxValues, passwordLength) {
    let lengthOfPasswordIsOK = false;
    let checkBoxIsOK = false;

    if (passwordLength <= 0) {
        messageWindow.innerHTML = `Password Length should be longer than 0 <br>`

    } else {
        lengthOfPasswordIsOK = true;
    }

    if (Object.values(checkBoxValues).every(value => value !== true)) {
        messageWindow.innerHTML += `\n At least 1 check box must be marked`
    } else {
        checkBoxIsOK = true;
    }

    return lengthOfPasswordIsOK && checkBoxIsOK;
}