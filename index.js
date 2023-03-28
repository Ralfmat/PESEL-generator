document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM is loaded.");

    const form = document.getElementById("pesel-form");

    form.addEventListener("input", (event) => {
        event.preventDefault();

        const pesel = document.getElementById("pesel-value").value;
    
        finalCheck(pesel);
    })

    const button = document.getElementById("generate-button");

    button.addEventListener("click", (event) => {
        event.preventDefault();
        generatedPeselOutput();
    });
});


const birthdayCheck = (pesel) => {
    //01250403313
    let year = pesel.substring(0,2);
    let month = parseInt(pesel.substring(2,4));
    let day = parseInt(pesel.substring(4,6));
    let months = {1: "styczeń", 2: "luty", 3: "marzec", 4: "kwiecień",
    5: "maj", 6: "czerwiec", 7: 'lipiec', 8: "sierpień",
    9: "wrzesień", 10: "październik", 11: "listopad", 12: "grudzień"};
    
    if (day > 0) {
        return monthCheck(day, month, year);
    }
    else {
        return false;
    }

}

const monthCheck = (day, month, year) => {
    monthCorrect = false;
    if (month > 20) {
        month = month - 20;
    }
    switch (month) {
        case 2:
            if (leapYearCheck(year)) {
                if (day > 29) {
                    monthCorrect = false;
                    break;
                }
                else {
                    monthCorrect = true;
                    break;
                }
            }
            else {
                if (day > 28) {
                    monthCorrect = false;
                    break;
                }
                else {
                    monthCorrect = true;
                    break;
                }
            }
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            if (day > 31) {
                monthCorrect = false;
                break;
            }
            else {
                monthCorrect = true;
                break;
            }
        case 4:
        case 6:
        case 9:
        case 11:
            if (day > 30) {
                monthCorrect = false;
                break;
            }
            else {
                monthCorrect = true;
                break;
            }
        default:
            monthCorrect = false;
            break;
    }
    return monthCorrect;
}

const leapYearCheck = (year) => {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true
    } else {
        return false
    }
}

const birthdayString = (pesel) => {
    let year = pesel.substring(0,2);
    let month = parseInt(pesel.substring(2,4));
    let day = parseInt(pesel.substring(4,6));

    const months = {1: "styczeń", 2: "luty", 3: "marzec", 4: "kwiecień",
    5: "maj", 6: "czerwiec", 7: 'lipiec', 8: "sierpień",
    9: "wrzesień", 10: "październik", 11: "listopad", 12: "grudzień"};
    if (month > 20) {
        month = month - 20;
        return `${day} ${months[month]} 20${year}`;
    }
    else {
        
        return `${day} ${months[month]} 19${year}`;
    }

}

const birthdayOutput = (pesel) => {
    let birthdayElement = document.getElementById("birthday");

    if (birthdayCheck(pesel)) {
        birthdayElement.innerHTML = birthdayString(pesel);
        birthdayElement.style.color = "green";
    }
    else {
        birthdayElement.innerHTML = "Niepoprawna!";
        birthdayElement.style.color = "red";
    }
}

const sexCheck = (pesel) => {
    if (pesel.length >= 10) {
        return true;
    }
    else {
        return false;
    }
}

const sexOutput = (pesel) => {
    let sex = parseInt(pesel.substring(9,10));
    let sexOutput = document.getElementById("sex");
    if (sexCheck(pesel)) {
        if (sex % 2 == 0) {
            sexOutput.innerHTML = "kobieta";
            sexOutput.style.color = "green";
        }
        else if (sex % 2 != 0) {
            sexOutput.innerHTML = "mężczyzna";
            sexOutput.style.color = "green";
        }
    }
    else {
        sexOutput.innerHTML = "błąd";
        sexOutput.style.color = "red";
    }
        
}

const controlNumberCheck = (pesel) => {
    let weights = [1,3,7,9,1,3,7,9,1,3];
    let controlNumberValue = 0;

    for (let i = 0; i < 10; i++) {
        let j = parseInt(pesel[i]) * weights[i];
        if (j >= 10) {
            j = parseInt(j.toString()[1]);
        }
        controlNumberValue += j;
        
    }

    if (controlNumberValue >= 10) {
        controlNumberValue = parseInt(controlNumberValue.toString()[1]);
    }
    controlNumberValue = 10 - controlNumberValue;
    if (pesel[10] == controlNumberValue) return true;
    else return false;
}

const controlNumberOutput = (pesel) => {
    let isCorrect = document.getElementById("isCorrect");

    if (controlNumberCheck(pesel)) {
        isCorrect.innerHTML = "Pesel prawidłowy!"
        isCorrect.style.color = "green";
    }
    else {
        isCorrect.innerHTML = "Pesel nieprawidłowy!"
        isCorrect.style.color = "red";
    }
}

const finalCheck = (pesel) => {
    controlNumberOutput(pesel);
    sexOutput(pesel);
    birthdayOutput(pesel);
}

const peselGenerating = () => {
    let range = "0123456789";
    let pesel = "";

    for (let i = 0; i < 11; i++) {
        pesel += range.charAt(Math.floor(Math.random() * range.length));
    }
    
    return pesel;
}

const generatedPeselOutput = () => {
    let pesel = peselGenerating();

    while (true) {
        if(birthdayCheck(pesel) && controlNumberCheck(pesel)) {
            break;
        }
        else {
            pesel = peselGenerating();
        }
    }
    let ul = document.getElementById("pesel-list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${pesel}`));
    ul.appendChild(li);
}