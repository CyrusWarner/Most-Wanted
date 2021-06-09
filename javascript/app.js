'use strict';

// Variables that need to be declared.
let firstNameInput; // Input for first name
let lastNameInput; // Input for last name
let genderInput; // Input for gender
let eyeColorInput; // Input for eye color
let occupationInput; // Input for occupation

// Holds the filtered results from running a
// filtered search
let filteredPeople;
let filteredGender;
let filteredEyeColor;
let filteredOccupation;
let filteredFirstName;
let filteredLastName;
let filteredSpouse;
let filteredParents;
let filteredSibilings;
let grand;

// Holds an empty data.js people object
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

// Search button used for one or more criteria
function searchBy(){
    let results = people;
    if(document.forms.nameForm.fname.value != ""){
        results = searchByFirstName(results);
    }
    if(document.forms.nameForm.lname.value != ""){
        results = searchByLastName(results);
    }
    if(document.forms.nameForm.gender.value != ""){
        results = searchByGender(results);
    }
    if(document.forms.nameForm.eyeColor.value != ""){
        results = searchByEyeColor(results);
    }
    if(document.forms.nameForm.occupation.value != ""){
        results = searchByOccupation(results);
    }
    // After filtering the results, the table will be built.
    buildTable(results);
}

// Helper function to searchBy() - First Name
function searchByFirstName(peopleToSearch){
    firstNameInput = document.forms['nameForm']['fname'].value;
    filteredFirstName = peopleToSearch.filter(function (name){
        if(firstNameInput.toLowerCase() === name.firstName.toLowerCase()){
            return true;
        }
    })
    return filteredFirstName;
}

// Helper function to searchBy() - Last Name
function searchByLastName(peopleToSearch){
    lastNameInput = document.forms['nameForm']['lname'].value;
    filteredLastName = peopleToSearch.filter(function (name){
        if(lastNameInput.toLowerCase() === name.lastName.toLowerCase()){
            return true;
        }
    })
    return filteredLastName;
}

// Helper function to searchBy() - Gender
function searchByGender(peopleToSearch){
    genderInput = document.forms['nameForm']['gender'].value;
    filteredGender = peopleToSearch.filter(function (maleOrFemale){
        if(genderInput.toLowerCase() === maleOrFemale.gender.toLowerCase()){
            return true
        }
    })
    return filteredGender
}

// Helper function to searchBy() - Eye color
function searchByEyeColor(peopleToSearch){
    eyeColorInput = document.forms['nameForm']['eyeColor'].value;
    filteredEyeColor = peopleToSearch.filter(function (eyeColors){
        if(eyeColors.eyeColor.toLowerCase() === eyeColorInput.toLowerCase()){
           return true;
        }
    })
    return filteredEyeColor;
}

// Helper function to searchBy() - Occupation
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
    let descendants = [];
    people.map(function(el) { 
        if ( el.parents[0] === personToSearch|| el.parents[1] === personToSearch){
            descendants.push(el);
            // finds decendants using findGrandChildren(... , ...) helper function
            descendants = findGrandChildren(el, descendants); // Uses helper function findGrandChildren(...)
        }
    });
    buildTable(descendants)
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

// Search by family button
function searchByFamily(idNumber, spouseNumber, last){
    console.log(idNumber + " " + spouseNumber + " " + last); // Good.
    let results = people;
    let tempSpouse = findSpouse(idNumber);
    let tempParents = findParents(spouseNumber);
    let tempSibilings = findSibilings(last);
    
    if(tempSpouse != ""){
        results = tempSpouse;
    }
    if(tempParents != ""){
        results = tempParents;
    }
    if(tempSibilings != ""){
        results = tempSibilings;
    }
    buildTable(results);
}

// Helper function to searchByFamily - Spouse
function findSpouse(peopleToSearch){
    filteredOccupation = people.filter(function (partner){
        if(partner.currentSpouse === peopleToSearch){
            return true;
        }
    })
    return filteredSpouse;
}

// Helper function to searchByFamily - Parents
function findParents(peopleToSearch){
    filteredParents = people.filter(function (parent){
        if(parent.parents.includes(peopleToSearch)){
            return true;
        }
    })
    return filteredParents;
}

// Helper function to searchByFamily - Sibilings
function findSibilings(last){
    filteredSibilings = people.filter(function (hermano){
        if(last === hermano.lastName && (hermano.parents[0] === undefined && hermano.parents[1] === undefined)){
            return true;
        }
    })
    return filteredSibilings;
}

// View all people button - builds table with help of createTable(..) helper function
function buildTable(peopleToPopulate){
    let Table = document.getElementById("mostWanted");
    Table.innerHTML = "";
    peopleToPopulate.map(function(el){
        createTable(el)
    })
}

// Creates a table based off of buildTable(parameter). 
function createTable(el){
        document.getElementById("table-header").innerHTML = `<h1 style="font-weight: bold;">
        Wanted: Dead Or Alive
        </h1>`
        document.getElementById("table-top-row").innerHTML = `<tr>
        <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Gender</th>
        <th>DOB</th>
        <th>Height</th>
        <th>Weight</th>
        <th>Eye Color</th>
        <th>Occupation</th>
        <th>Parents</th>
        <th>Current Spouse</th>
        </tr>`
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
        <td><button onclick="searchByFamily(${el.id}, ${el.currentSpouse}, '${el.lastName}')">
        Display Family
        </button></td>
        </tr>`

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