const ContactModel = (function() {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    function save() { localStorage.setItem("contacts", JSON.stringify(contacts)); }
    function getAll() { return contacts; }
    function add(contact) { contacts.push(contact); save(); }
    function update(index, contact) { if (contacts[index]) { contacts[index] = contact; save(); } }
    function deleteContact(index) { if (contacts[index]) { contacts.splice(index, 1); save(); } }

    return { getAll, add, update, delete: deleteContact };
})();