'use strict';

let filteredPeople;
let personObject = {
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    eyeColor: "",
    occupation: "",
    parents: [],
    currentSpouse: ""
};;

function searchByName() {
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    filteredPeople = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstNameInput.toLowerCase() 
        && person.lastName.toLowerCase() === lastNameInput.toLowerCase()) {
            document.getElementById("mostWanted").innerHTML += `<tr>
            <td>${person.id}</td>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.gender}</td>
            <td>${person.dob}</td>
            <td>${person.height}</td>
            <td>${person.weight}</td>
            <td>${person.eyeColor}</td>
            <td>${person.occupation}</td>
            <td>${person.parents}</td>
            <td>${person.currentSpouse}</td>
            </tr>`
        }
    });

    // Rather than console logging, you need to append the filteredPeople to a table.
    if (filteredPeople.length > 0) {
        console.log(filteredPeople);
    } else {
        console.log('Sorry, looks like there is no one with that name.');
    }

    return personObject;
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


//Search by specific criteria
let criteria;

function searchBy(){
    let genderInput = document.forms['nameForm']['gender'].value;
    let eyeColorInput = document.forms.nameForm.eyeColor.value;   
    let flag = false;
    let filteredGender = people.filter(function (criteria) {
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


//Search by decendants
function searchByChildren(){
    // let currentPerson = searchByName();
    let theFirstName = document.forms['nameForm']['fname'].value;
    let theLastName = document.forms['nameForm']['lname'].value;
    
    people.filter(function (person) {
        if (person.firstName.toLowerCase() === theFirstName.toLowerCase() 
        && person.lastName.toLowerCase() === theLastName.toLowerCase()) {
            personObject =  
            {
                "id": person.id,
                "firstName": person.firstName,
                "lastName": person.lastName,
                "gender": person.gender,
                "dob": person.dob,
                "height": person.height,
                "weight": person.weight,
                "eyeColor": person.eyeColor,
                "occupation": person.occupation,
                "parents": person.parents,
                "currentSpouse": person.currentSpouse
            };
        }
    });

    people.map(function(el) { 
        if (theLastName === el.lastName 
            && el.parents[0] === personObject.id
            || el.parents[1] === personObject.id){
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
        }
    });
}