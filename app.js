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
};


//Builds the table based off the specific person
function buildTable(element = personObject){
    people.map(function(el){
        createTable(el)
    })
}

// Name search
function searchByName() {
    // Grabbing the values from our nameForm form and inputs.
    firstNameInput = document.forms['nameForm']['fname'].value;
    lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    filteredPeople = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstNameInput.toLowerCase() 
        && person.lastName.toLowerCase() === lastNameInput.toLowerCase()) {
         createTable(person)
        }
    });
    return personObject;
}

// "Advanced search" two or more criteria
function searchBy(){
  
    if(document.forms.nameForm.gender.value === undefined){
        genderInput = ""
    }
    else{
        genderInput = document.forms.nameForm.gender.value.toLowerCase()
    }

    if(document.forms.nameForm.eyeColor.value === undefined){
        eyeColorInput = ""
    }
    else{
        eyeColorInput = document.forms.nameForm.eyeColor.value.toLowerCase()
    }

    if(document.forms.nameForm.occupation.value === undefined){
        occupationInput = ""
    }
    else{
        occupationInput = document.forms.nameForm.occupation.value.toLowerCase()
    }

    filteredGender = people.filter(function (criteria){
        if(genderInput === "" && (eyeColorInput.toLowerCase() === criteria.eyeColor.toLowerCase() 
        && occupationInput.toLowerCase() === criteria.occupation.toLowerCase())){
            createTable(criteria)
        }
        else if(eyeColorInput === "" && (genderInput.toLowerCase() === criteria.gender.toLowerCase()
             && occupationInput.toLowerCase() === criteria.occupation.toLowerCase())){
                createTable(criteria)
        }
        else if(occupationInput === "" && (eyeColorInput.toLowerCase() === criteria.eyeColor.toLowerCase() 
        && genderInput.toLowerCase() === criteria.gender.toLowerCase())){
            createTable(criteria)
        }
        else if(eyeColorInput.toLowerCase() === criteria.eyeColor.toLowerCase() 
            && genderInput.toLowerCase() === criteria.gender.toLowerCase()
             && occupationInput.toLowerCase() === criteria.occupation.toLowerCase()){
                createTable(criteria)
        }
    });
}

// Gender button
function searchByGender(){
    genderInput = document.forms['nameForm']['gender'].value;
    filteredGender = people.filter(function (maleOrFemale){
        if(genderInput.toLowerCase() === maleOrFemale.gender.toLowerCase()){
            createTable(maleOrFemale)
        }
    })
}

// Eye color button
function searchByEyeColor(){
    eyeColorInput = document.forms['nameForm']['eyeColor'].value;
    filteredEyeColor = people.filter(function (eyeColors){
        if(eyeColors.eyeColor.toLowerCase() === eyeColorInput.toLowerCase()){
            createTable(eyeColors)
        }
    })
}

// Occupation button
function searchByOccupation(){
    occupationInput = document.forms['nameForm']['occupation'].value;
    filteredOccupation = people.filter(function (job){
        if(job.occupation.toLowerCase() === occupationInput.toLowerCase()){
            createTable(job)
        }
    })
}

// Search by decendants button
function searchByChildren(){
    let grand;
    lastNameInput = document.forms['nameForm']['lname'].value;
    personObject = create()
    let tempPerson;
    people.map(function(el) { 
        if ((lastNameInput.toLowerCase() === el.lastName.toLowerCase()  && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)
        || (lastNameInput.toLowerCase() !== el.lastName.toLowerCase() && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)){
            createTable(el)
            tempPerson = el;
            grand = findGrandChildren(tempPerson); // Uses helper function findGrandChildren(...)
            
        }
        else if(grand !== undefined){
            createTable(el)
        }
    });
}

// Search by family button
function searchFamily(){
    // let currentPerson = searchByName();
    let grand;
    lastNameInput = document.forms['nameForm']['lname'].value;
    personObject = create()
    let tempPerson;
    people.map(function(el) { 
         if ((lastNameInput.toLowerCase() === el.lastName.toLowerCase()  && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)
         || (lastNameInput.toLowerCase() !== el.lastName.toLowerCase() && el.parents[0] === personObject.id|| el.parents[1] === personObject.id)){
             createTable(el)
             tempPerson = el;
             grand = findGrandChildren(tempPerson); // Uses helper function findGrandChildren(...)
         }
         else if(grand !== undefined){
            //  do nothing...
         }
    });
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


function createTable(el){
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
