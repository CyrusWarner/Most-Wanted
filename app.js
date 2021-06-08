'use strict';

// Variables that need to be declared.
let firstNameInput; // Input for first name
let lastNameInput; // Input for last name
let genderInput; // Input for gender
let eyeColorInput; // Input for eye color
let occupationInput; // Input for occupation

let filteredPeople;
let filteredGender;
let filteredEyeColor;
let filteredOccupation;

let grand; // The grandchildren
let criteria; // Search by function

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


// Advance search of specific people with two or more criteria
function searchByName() {
    // Grabbing the values from our nameForm form and inputs.
    firstNameInput = document.forms['nameForm']['fname'].value;
    lastNameInput = document.forms['nameForm']['lname'].value;

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

// "Advanced search"
function searchBy(){
    genderInput = document.forms['nameForm']['gender'].value;
    eyeColorInput = document.forms.nameForm.eyeColor.value;   
    occupationInput = document.forms.nameForm.occupation.value;
    filteredGender = people.filter(function (criteria){
        if(criteria.gender.toLowerCase() === genderInput.toLowerCase() 
        && criteria.eyeColor.toLowerCase() === eyeColorInput.toLowerCase() && criteria.occupation.toLowerCase() === occupationInput.toLowerCase()){
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
    });
}

// Gender button
function searchByGender(){
    genderInput = document.forms['nameForm']['gender'].value;
    filteredGender = people.filter(function (maleOrFemale){
        if(genderInput.toLowerCase() === maleOrFemale.gender.toLowerCase()){
            document.getElementById("mostWanted").innerHTML += `<tr>
            <td>${maleOrFemale.id}</td>
            <td>${maleOrFemale.firstName}</td>
            <td>${maleOrFemale.lastName}</td>
            <td>${maleOrFemale.gender}</td>
            <td>${maleOrFemale.dob}</td>
            <td>${maleOrFemale.height}</td>
            <td>${maleOrFemale.weight}</td>
            <td>${maleOrFemale.eyeColor}</td>
            <td>${maleOrFemale.occupation}</td>
            <td>${maleOrFemale.parents}</td>
            <td>${maleOrFemale.currentSpouse}</td>
            </tr>`
        }
    })
}

// Eye color button
function searchByEyeColor(){
    eyeColorInput = document.forms['nameForm']['eyeColor'].value;
    filteredEyeColor = people.filter(function (eyeColors){
        if(eyeColors.eyeColor.toLowerCase() === eyeColorInput.toLowerCase()){
            document.getElementById("mostWanted").innerHTML += `<tr>
            <td>${eyeColors.id}</td>
            <td>${eyeColors.firstName}</td>
            <td>${eyeColors.lastName}</td>
            <td>${eyeColors.gender}</td>
            <td>${eyeColors.dob}</td>
            <td>${eyeColors.height}</td>
            <td>${eyeColors.weight}</td>
            <td>${eyeColors.eyeColor}</td>
            <td>${eyeColors.occupation}</td>
            <td>${eyeColors.parents}</td>
            <td>${eyeColors.currentSpouse}</td>
            </tr>`
        }
    })
}

// Occupation button
function searchByOccupation(){
    occupationInput = document.forms['nameForm']['occupation'].value;
    filteredOccupation = people.filter(function (job){
        if(job.occupation.toLowerCase() === occupationInput.toLowerCase()){
            document.getElementById("mostWanted").innerHTML += `<tr>
            <td>${job.id}</td>
            <td>${job.firstName}</td>
            <td>${job.lastName}</td>
            <td>${job.gender}</td>
            <td>${job.dob}</td>
            <td>${job.height}</td>
            <td>${job.weight}</td>
            <td>${job.eyeColor}</td>
            <td>${job.occupation}</td>
            <td>${job.parents}</td>
            <td>${job.currentSpouse}</td>
            </tr>`
        }
    })
}

// Needs further work
function searchByParents(){
    people.map(function(el){
        if (el.parents[0] === undefined && el.parents[1] === undefined) {
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
    })   
}

// Search by decendants button
function searchByChildren(){
    // let currentPerson = searchByName();
    lastNameInput = document.forms['nameForm']['lname'].value;
    personObject = create()
    let tempPerson;

    people.map(function(el) { 
        if ((lastNameInput.toLowerCase() === el.lastName.toLowerCase()  && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)
        || (lastNameInput.toLowerCase() !== el.lastName.toLowerCase() && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)){
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
            tempPerson = el;
            grand = findGrandChildren(tempPerson); // Uses helper function findGrandChildren(...)
            
        }
        else if(grand !== undefined){
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

// Search by family button
function searchFamily(){
    lastNameInput = document.forms['nameForm']['lname'].value;
    personObject = create()
    people.filter(function (person) {
        if (person.lastName.toLowerCase() === lastNameInput.toLowerCase() && person.parents[0] !== personObject.id && person.parents[1] !== personObject.id){
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
    })
}

// Creates the person object to be referenced against.
function create(){
    people.filter(function (person){

    firstNameInput = document.forms['nameForm']['fname'].value;
    lastNameInput = document.forms['nameForm']['lname'].value;
    if (person.firstName.toLowerCase() === firstNameInput.toLowerCase() 
        && person.lastName.toLowerCase() === lastNameInput.toLowerCase()) {
        personObject =  {
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
            }
        }
    })
    return personObject;
}

// Helper function for searchByChildren
function findGrandChildren(el){
    let parent = el
    let grandChild;
    people.filter(function (children){
        if(children.parents[0] === parent.id || children.parents[1] === parent.id){
            grandChild = children;
        }
    })
    return grandChild;
}