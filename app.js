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
let filteredFirstName;
let filteredLastName;
let grand;

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

// "Advanced search" two or more criteria
function searchBy(){
    let results = people;
    if(document.forms.nameForm.fname.value != ""){
        results = searchByFirstName(results)
    }
    if(document.forms.nameForm.lname.value != ""){
        results = searchByLastName(results)
    }
    if(document.forms.nameForm.gender.value != ""){
        results = searchByGender(results)
    }
    if(document.forms.nameForm.eyeColor.value != ""){
        results = searchByEyeColor(results);
    }
    if(document.forms.nameForm.occupation.value != ""){
        results = searchByOccupation(results);
    }




    buildTable(results)

}


function searchByFirstName(peopleToSearch){
    firstNameInput = document.forms['nameForm']['fname'].value;
    filteredFirstName = peopleToSearch.filter(function (name){
        if(firstNameInput.toLowerCase() === name.firstName.toLowerCase()){
            return true;
        }
    })
    return filteredFirstName;
}

function searchByLastName(peopleToSearch){
    lastNameInput = document.forms['nameForm']['lname'].value;
    filteredLastName = peopleToSearch.filter(function (name){
        if(lastNameInput.toLowerCase() === name.lastName.toLowerCase()){
            return true;
        }
    })
    return filteredLastName;
}

// Gender button
function searchByGender(peopleToSearch){
    genderInput = document.forms['nameForm']['gender'].value;
    filteredGender = peopleToSearch.filter(function (maleOrFemale){
        if(genderInput.toLowerCase() === maleOrFemale.gender.toLowerCase()){
            return true
        }
    })
    return filteredGender
}

// Eye color button
function searchByEyeColor(peopleToSearch){
    eyeColorInput = document.forms['nameForm']['eyeColor'].value;
    filteredEyeColor = peopleToSearch.filter(function (eyeColors){
        if(eyeColors.eyeColor.toLowerCase() === eyeColorInput.toLowerCase()){
           return true;
        }
    })
    return filteredEyeColor;
}

// Occupation button
function searchByOccupation(peopleToSearch){
    occupationInput = document.forms['nameForm']['occupation'].value;
    filteredOccupation = peopleToSearch.filter(function (job){
        if(job.occupation.toLowerCase() === occupationInput.toLowerCase()){
            return true;
        }
    })
    return filteredOccupation;
}

// Search by decendants button
function searchByChildren(personToSearch){
    console.log(personToSearch)
    let grand;
    let descendants = [];
    let tempPerson;
    people.map(function(el) { 
        if ( el.parents[0] === personToSearch|| el.parents[1] === personToSearch){
            descendants.push(el)
            descendants = findGrandChildren(el, descendants); // Uses helper function findGrandChildren(...)
            
        }
    });
    buildTable(descendants)
}

// Search by family button
function searchByFamily(personToSearch){
    // let currentPerson = searchByName();
    let family =[];
    let grand;
    lastNameInput = document.forms['nameForm']['lname'].value;
    let tempPerson;
    people.map(function(el) { 
         if ((lastNameInput.toLowerCase() === el.lastName.toLowerCase() || el.parents.includes(personToSearch))){
             family.push(el)
             family = findGrandChildren(el, family); // Uses helper function findGrandChildren(...)
         }
         else if(grand !== undefined){
            console.log("we working");
         }
    });
    buildTable(family)
}

let id = searchByFamily(el.id)

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
function findGrandChildren(el, descendants){
    let parent = el
    people.filter(function (children){
        if(children.parents[0] === parent.id || children.parents[1] === parent.id){
          grand = descendants.push(children)
        }
    })
    return descendants;
}

//View all button builds table in bottom function
function buildTable(peopleToPopulate){
    let Table = document.getElementById("mostWanted");
    Table.innerHTML = "";
    peopleToPopulate.map(function(el){
        createTable(el)
    })
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
        <td><button onclick="searchByChildren(${el.id})">Display Descendants</button></td>
        </tr>`

}
