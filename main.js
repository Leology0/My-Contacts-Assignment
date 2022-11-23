// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();
displayContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    findByEmail();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  loadContacts();
  let outputStr = ''
  for (i = 0; i < contacts.length; i++) {
    outputStr += getContactHtmlStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr
  saveContacts();
}

function addContact() {
  let name = prompt('enter contact name');
  let email = prompt('enter contacts email');
  let phone = prompt('enter contacts phone number');
  let country = prompt('enter contacts country');
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  outputEl.innerHTML = "contact has been added."
}

function removeContact() {
  let index = +prompt("Enter # of Contact");
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
    outputEl.innerHTML = "contact has been removed";
  } else {
    alert('Invalid Contact #')
  }
}

function displayByName() {
  loadContacts();
  let searchName = prompt('Enter contact name');
  let outputStr = ''
  for (i = 0; i < contacts.length; i++) {
    if (searchName === contacts[i].name) {
      outputStr += getContactHtmlStr(contacts[i], i)
    }
  }
  outputEl.innerHTML = outputStr
}

function displayByCountry() {
  loadContacts();
  let searchCountry = prompt('Enter contact country');
  let outputStr = ''
  for (i = 0; i < contacts.length; i++) {
    if (searchCountry === contacts[i].country) {
      outputStr += getContactHtmlStr(contacts[i], i)
    }
  }
  outputEl.innerHTML = outputStr
}

function findByEmail(searchEmail) {
  loadContacts();
  searchEmail = prompt('Enter contact email')
  let outputStr = ''
  for (i = 0; i < contacts.length; i++) {
    if (searchEmail === contacts[i].email) {
      outputStr += getContactHtmlStr(contacts[i], i)
    // } else if (searchEmail !== contacts[i].email) {
      
    }
  }
  outputEl.innerHTML = outputStr
}

// Return contact object
function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry
  }
}

// Get html for contact
function getContactHtmlStr(contact, i) {
  return `
    <div>
      ${i}: ${contact.name} 
      <hr>
      ${contact.email} 
      <br>
      ${contact.phone} 
      (${contact.country})
    </div>
    `
}

// Save Global contacts to Local Storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load Tasks from Local Storage
function loadContacts() {
  let contactStr = localStorage.getItem('contacts');
  return JSON.parse(contactStr) ?? [];
}