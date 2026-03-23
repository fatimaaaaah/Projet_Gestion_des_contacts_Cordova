const ContactController = (function () {
  let currentIndex = null;

  // Afficher un contact
  function showContact(index) {

    currentIndex = parseInt(index);
    const contacts = ContactModel.getAll();
    const contact = contacts[currentIndex];

    if (contact) {
      // Stockage
      sessionStorage.setItem("currentContactIndex", currentIndex);
      sessionStorage.setItem("currentContact", JSON.stringify(contact));

      $.mobile.changePage("pages/profile.html", { transition: "slide" });
    } else {
      console.error(" Contact non trouvé");
    }
  }

  // Editer un contact
  function prepareEdit() {
    console.log("prepareEdit - DÉBUT");

    const indexStr = sessionStorage.getItem("currentContactIndex");
    console.log("1. Index sessionStorage:", indexStr);

    if (!indexStr) {
      console.error(" Pas d'index en session");
      return;
    }

    const contacts = ContactModel.getAll();
    const contact = contacts[parseInt(indexStr)];
    console.log("2. Contact du modèle:", contact);

    if (!contact) {
      console.error(" Contact non trouvé dans le modèle");
      return;
    }

    setTimeout(function () {
      console.log("4. Remplissage après 300ms");

      $("#editFullName").val(contact.fullName || "");
      $("#editMobile").val(contact.phones?.mobile || "");
      $("#editWorkPhone").val(contact.phones?.work || "");
      $("#editHomePhone").val(contact.phones?.home || "");
      $("#editPersonalEmail").val(contact.emails?.personal || "");
      $("#editWorkEmail").val(contact.emails?.work || "");
      $("#editOrganization").val(contact.organization || "");
      $("#editAvatar").val(contact.avatar || "img/avatar1.jpg");

      if ($("#editFullName").val()) {
        console.log(" Remplissage réussi!");
      } else {
        console.log("Remplissage échoué - tentative avec délai plus long");

        $("#editFullName").val(contact.fullName || "");
        $("#editMobile").val(contact.phones?.mobile || "");
        $("#editWorkPhone").val(contact.phones?.work || "");
        $("#editHomePhone").val(contact.phones?.home || "");
        $("#editPersonalEmail").val(contact.emails?.personal || "");
        $("#editWorkEmail").val(contact.emails?.work || "");
        $("#editOrganization").val(contact.organization || "");
        $("#editAvatar").val(contact.avatar || "img/avatar1.jpg");
      }
    }, 300);
  }

  // Ajouter un contact
  function addContact() {

    const contact = {
      fullName: $("#fullName").val(),
      avatar: $("#avatar").val() || "img/avatar1.jpg",
      phones: {
        mobile: $("#mobile").val(),
        work: $("#workPhone").val(),
        home: $("#homePhone").val(),
      },
      emails: {
        personal: $("#personalEmail").val(),
        work: $("#workEmail").val(),
      },
      organization: $("#organization").val(),
    };

    if (!contact.fullName) {
      Swal.fire("Erreur", "Le nom est obligatoire", "error");
      return;
    }

    ContactModel.add(contact);

    Swal.fire({
      icon: "success",
      title: "Contact ajouté",
      timer: 1500,
    }).then(() => {
      $.mobile.changePage("../index.html", { transition: "slide" });
    });
  }

  // Supprimer un contact
  function deleteContact() {
    const index = sessionStorage.getItem("currentContactIndex");

    Swal.fire({
      title: "Supprimer ?",
      text: "Action irréversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
    }).then((result) => {
      if (result.isConfirmed) {
        ContactModel.delete(parseInt(index));
        sessionStorage.clear();
        $.mobile.changePage("../index.html", { transition: "slide" });
        Swal.fire("Supprimé !", "", "success");
      }
    });
  }

  // Mettre à jour
  function updateContact() {
    const index = sessionStorage.getItem("currentContactIndex");

    const updatedContact = {
      fullName: $("#editFullName").val(),
      avatar: $("#editAvatar").val() || "img/avatar1.jpg",
      phones: {
        mobile: $("#editMobile").val(),
        work: $("#editWorkPhone").val(),
        home: $("#editHomePhone").val(),
      },
      emails: {
        personal: $("#editPersonalEmail").val(),
        work: $("#editWorkEmail").val(),
      },
      organization: $("#editOrganization").val(),
    };

    ContactModel.update(parseInt(index), updatedContact);

    Swal.fire({
      icon: "success",
      title: "Contact modifié",
      timer: 1500,
    }).then(() => {
      sessionStorage.clear();
      $.mobile.changePage("../index.html", { transition: "slide" });
    });
  }

  return {
    showContact,
    addContact,
    deleteContact,
    prepareEdit,
    updateContact,
  };
})();

console.log(" ContactController chargé");
