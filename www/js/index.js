document.addEventListener("DOMContentLoaded", loadContacts);

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let currentIndex = null;

// Sauvegarder contacts
function saveToStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
    let html = "";

    contacts.forEach((c, index) => {
        let avatar = c.avatar && c.avatar.trim() !== "" ? c.avatar : "img/avatar1.jpg";
        let mobile = c.phones?.mobile || "";
        html += `
        <li>
            <a href="#profilePage" onclick="showContact(${index})">
                <img src="${avatar}" />
                <h2>${c.fullName || "Sans nom"}</h2>
                <p>${mobile}</p>
            </a>
        </li>`;
    });

    const $list = $("#contactList");
    $list.html(html);

    if ($list.hasClass("ui-listview")) {
        $list.listview("refresh");
    } else {
        $list.listview();
    }
}

// Ajouter contact
function addContact() {
    let contact = {
        fullName: fullName.value,
        avatar: avatar.value,
        phones: {
            mobile: mobile.value,
            work: workPhone.value,
            home: homePhone.value
        },
        emails: {
            personal: personalEmail.value,
            work: workEmail.value
        },
        organization: organization.value
    };

    contacts.push(contact);
    saveToStorage();

    $.mobile.changePage("#homePage");
    setTimeout(() => {
        loadContacts();
    }, 50);
}

// Afficher contact sélectionné
function showContact(index) {
    currentIndex = index;
    let c = contacts[index];

    let html = `
        <li style="text-align:center;">
            <img src="${c.avatar && c.avatar.trim() !== '' ? c.avatar : 'img/avatar1.jpg'}"
                style="width:100px;height:100px;border-radius:50%;" />
            <h2>${c.fullName}</h2>
        </li>
        ${c.phones.mobile || c.phones.work || c.phones.home ? `<li><strong>Téléphones</strong></li>` : ''}
        ${c.phones.mobile ? `<li>📱 Mobile : ${c.phones.mobile}</li>` : ""}
        ${c.phones.work ? `<li>💼 Professionnel : ${c.phones.work}</li>` : ""}
        ${c.phones.home ? `<li>☎ Fixe : ${c.phones.home}</li>` : ""}
        ${c.emails.personal || c.emails.work || c.organization ? `<li><strong>Emails / Organisation</strong></li>` : ''}
        ${c.emails.personal ? `<li>📧 Personnel : ${c.emails.personal}</li>` : ""}
        ${c.emails.work ? `<li>🏢 Professionnel : ${c.emails.work}</li>` : ""}
        ${c.organization ? `<li>🏫 Organisation : ${c.organization}</li>` : ""}
    `;

    const $list = $("#contactDetails");
    $list.html(html);

    if ($list.hasClass("ui-listview")) {
        $list.listview("refresh");
    } else {
        $list.listview();
    }
}

// Supprimer contact avec confirmation
function deleteContact() {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
        contacts.splice(currentIndex, 1);
        saveToStorage();
        loadContacts();
        $.mobile.changePage("../index.html");
    }
}

// Modifier contact
function prepareEdit() {
    let c = contacts[currentIndex];

    editFullName.value = c.fullName;
    editAvatar.value = c.avatar;
    editMobile.value = c.phones.mobile;
    editWorkPhone.value = c.phones.work;
    editHomePhone.value = c.phones.home;
    editPersonalEmail.value = c.emails.personal;
    editWorkEmail.value = c.emails.work;
    editOrganization.value = c.organization;
}

function resetAddForm() {
    fullName.value = "";
    avatar.value = "";
    mobile.value = "";
    workPhone.value = "";
    homePhone.value = "";
    personalEmail.value = "";
    workEmail.value = "";
    organization.value = "";
}


// Mettre à jour contact
function updateContact() {
    contacts[currentIndex] = {
        fullName: editFullName.value,
        avatar: editAvatar.value,
        phones: {
            mobile: editMobile.value,
            work: editWorkPhone.value,
            home: editHomePhone.value
        },
        emails: {
            personal: editPersonalEmail.value,
            work: editWorkEmail.value
        },
        organization: editOrganization.value
    };

    saveToStorage();

    setTimeout(() => {
        loadContacts();
        $.mobile.changePage("../index.html");
    }, 50);
}