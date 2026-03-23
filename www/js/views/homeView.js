const HomeView = (function () {
    function render() {
        const contacts = ContactModel.getAll();
        let html = "";

        if (contacts.length === 0) {
            html = '<li>Aucun contact. Ajoutez-en un !</li>';
        } else {
            contacts.forEach((c, index) => {
                if (!c) return;
                
                let avatar = c.avatar?.trim() || "avatar1.jpg";
                
                if (!avatar.includes('/') && !avatar.includes('http')) {
                    avatar = 'img/' + avatar;
                }
                
                const fullName = c.fullName || "Sans nom";
                const mobile = c.phones?.mobile || "";

                html += `<li>
                            <a href="#" data-index="${index}" class="contact-link">
                                <img src="${avatar}" alt="Avatar" onerror="this.src='img/avatar1.jpg'">
                                <h2>${fullName}</h2>
                                <p>${mobile}</p>
                            </a>
                        </li>`;
            });
        }

        $("#contactList").html(html).listview("refresh");
        
        $(".contact-link").off("click").on("click", function(e) {
            e.preventDefault();
            const index = $(this).data("index");
            console.log("Contact cliqué, index:", index);
            ContactController.showContact(index);
        });
    }

    return { render };
})();