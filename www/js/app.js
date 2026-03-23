$(document).ready(function() {
    console.log("ContactModel disponible:", typeof ContactModel !== 'undefined');
    console.log("ContactController disponible:", typeof ContactController !== 'undefined');

    // -------- PAGE ACCUEIL --------
    if ($("#homePage").length) {
        HomeView.render();
    }

    $(document).on("pagebeforeshow", "#homePage", function() {
        HomeView.render();
    });

    // -------- PAGE PROFIL --------
    $(document).on("pagebeforeshow", "#profilePage", function() {
        
        const contactStr = sessionStorage.getItem("currentContact");
        if (contactStr) {
            const contact = JSON.parse(contactStr);
            ProfileView.render(contact);
        }

        // Supprimer contact
        $("#deleteContactBtn").off("click").on("click", function(e) {
            e.preventDefault();
            ContactController.deleteContact();
        });

        // Modifier contact
        $("#editContactBtn").off("click").on("click", function(e) {
            e.preventDefault();
            $.mobile.changePage("edit.html", { transition: "slide" });
        });
    });

    // -------- PAGE ÉDITION --------
    $(document).on("pageshow", "#editPage", function() {
        ContactController.prepareEdit();
    });

    // Bouton Mettre à jour
    $(document).on("click", "#updateContactBtn", function(e) {
        e.preventDefault();
        ContactController.updateContact();
    });

    // -------- PAGE AJOUT --------
    $(document).on("pagebeforeshow", "#addPage", function() {
        $("#fullName, #avatar, #mobile, #workPhone, #homePhone, #personalEmail, #workEmail, #organization").val("");
    });

    $(document).on("click", "#addContactBtn", function(e) {
        e.preventDefault();
        ContactController.addContact();
    });
});