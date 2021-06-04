'use strict';

function searchByName() {
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;
    
    correctCasing(firstNameInput, lastNameInput); // Correct casing check

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        if (person.firstName === firstNameInput && person.lastName === lastNameInput) {
            return true;
        }
        return false;
    });

    // Rather than console logging, you need to append the filteredPeople to a table.
    if (filteredPeople.length > 0) {
        console.log(filteredPeople);
    } else {
        console.log('Sorry, looks like there is no one with that name.');
    }
}

//Correct casing
function correctCasing(firstName, lastName) {
    people.map(function (el) {
        if (el.firstName.toLowerCase() === firstName.toLowerCase()
            && el.lastName.toLowerCase() === lastName.toLowerCase()) {
            document.getElementById("validOrNot").innerHTML = "<h1>Valid</h1>"
        }
        else {
            console.log("Invalid first or last name");
        }

    })
}