const ProfileView = (function () {
    function render(contact) {
        console.log("ProfileView.render called with:", contact);
        
        if (!contact) {
            console.error("Contact is null");
            $("#contactDetails").html('<li>Contact introuvable</li>').listview("refresh");
            return;
        }

        let avatarPath = contact.avatar || 'avatar1.jpg';
        if (!avatarPath.includes('/') && !avatarPath.includes('http')) {
            avatarPath = '../img/' + avatarPath;
        } 
        else if (avatarPath.startsWith('img/')) {
            avatarPath = '../' + avatarPath;
        }
        
        console.log("Final avatar path:", avatarPath);
        
        let html = `
            <li style="text-align:center; list-style:none;">
                <img src="${avatarPath}" 
                     alt="Avatar de ${contact.fullName}"
                     style="width:120px; height:120px; border-radius:50%; margin:10px auto; display:block; object-fit:cover;"
                     onerror="this.src='../img/avatar1.jpg'; console.log('Image failed to load, using default');">
                <h2 style="margin:10px 0; font-size:1.2em;">${contact.fullName || 'Sans nom'}</h2>
            </li>`;

        // Section Téléphones
        if (contact.phones) {
            let hasPhone = false;
            let phoneHtml = '';
            
            if (contact.phones.mobile) {
                phoneHtml += `<li>📱 Mobile: ${contact.phones.mobile}</li>`;
                hasPhone = true;
            }
            if (contact.phones.work) {
                phoneHtml += `<li>💼 Travail: ${contact.phones.work}</li>`;
                hasPhone = true;
            }
            if (contact.phones.home) {
                phoneHtml += `<li>🏠 Fixe: ${contact.phones.home}</li>`;
                hasPhone = true;
            }
            
            if (hasPhone) {
                html += `<li data-role="list-divider">📞 Téléphones</li>${phoneHtml}`;
            }
        }

        // Section Emails
        if (contact.emails) {
            let hasEmail = false;
            let emailHtml = '';
            
            if (contact.emails.personal) {
                emailHtml += `<li>📧 Personnel: ${contact.emails.personal}</li>`;
                hasEmail = true;
            }
            if (contact.emails.work) {
                emailHtml += `<li>🏢 Professionnel: ${contact.emails.work}</li>`;
                hasEmail = true;
            }
            
            if (hasEmail) {
                html += `<li data-role="list-divider">📧 Emails</li>${emailHtml}`;
            }
        }

        // Organisation
        if (contact.organization) {
            html += `<li data-role="list-divider">🏫 Organisation</li>`;
            html += `<li>${contact.organization}</li>`;
        }

        const $list = $("#contactDetails");
        $list.html(html);
        
        if ($list.hasClass("ui-listview")) {
            $list.listview("refresh");
        } else {
            $list.listview();
        }
    }

    return { render };
})();