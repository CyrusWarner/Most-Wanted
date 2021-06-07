'use strict';

let filteredPeople;

function searchByName() {
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;
    
    correctCasing(firstNameInput, lastNameInput); // Correct casing check

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    filteredPeople = people.filter(function (person) {
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
            
            //Build the table if the correct name is inputted into the form.
            buildTable(el); // Populate table
        }
        else {
            console.log("Invalid first or last name");
        }

    })
}

//Builds the table based off the specific person
function buildTable(){
    people.map(function(el){
    document.getElementById("mostWanted").innerHTML += `<tr>
    <td>${el.id}</td>
    <td>${el.firstName}</td>
    <td>${el.lastName}</td>
    <td>${el.gender}</td>
    <td>${el.dob}</td>
    <td>${el.height}</td>
    <td>${el.weight}</td>
    <td>${el.eyeColor}</td>
    <td>${el.occupation}</td>
    <td>${el.parents}</td>
    <td>${el.currentSpouse}</td>
    </tr>`
})
}

let criteria;

function searchBy(){
    let genderInput = document.forms['nameForm']['gender'].value;
    let eyeColorInput = document.forms.nameForm.eyeColor.value;   
    let flag = false;
    filteredGender = people.filter(function (criteria) {
        if(genderInput.length > 0){
            flag = true;
        }
        if(criteria.gender === genderInput && criteria.eyeColor === eyeColorInput && flag){
            document.getElementById("mostWanted").innerHTML += `<tr>
            <td>${criteria.id}</td>
            <td>${criteria.firstName}</td>
            <td>${criteria.lastName}</td>
            <td>${criteria.gender}</td>
            <td>${criteria.dob}</td>
            <td>${criteria.height}</td>
            <td>${criteria.weight}</td>
            <td>${criteria.eyeColor}</td>
            <td>${criteria.occupation}</td>
            <td>${criteria.parents}</td>
            <td>${criteria.currentSpouse}</td>
            </tr>`
        }
        else{
        }
    });
        if(filteredGender > 0){
            console.log(filteredGender);
        }
}