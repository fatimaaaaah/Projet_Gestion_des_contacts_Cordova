# Projet Gestion des Contacts - Cordova

**ContacTel** est une application web mobile pour gérer les contacts.  
Elle permet d’ajouter, modifier, supprimer et consulter les informations des contacts, avec stockage local via **localStorage**. Le projet est développé avec **HTML, CSS, JavaScript, jQuery Mobile**, et peut être intégré dans une application **Cordova** pour mobile.

---

## Fonctionnalités principales

- Ajouter un nouveau contact avec :
  - Nom complet
  - Avatar (image)
  - Téléphones : mobile, travail, domicile
  - Emails : personnel et professionnel
  - Organisation
- Modifier un contact existant
- Supprimer un contact avec confirmation
- Lister tous les contacts avec une recherche filtrée
- Afficher le détail d’un contact (profil complet)
- Stockage persistant dans le navigateur via `localStorage`
- Navigation fluide grâce à **jQuery Mobile**

---

## 📂 Structure du projet

```

Projet_Gestion_des_contacts_Cordova/
│
├─ pages/
│  ├─ add.html          # Page pour ajouter un contact
│  ├─ edit.html         # Page pour modifier un contact
│  └─ profile.html      # Page pour consulter le profil d’un contact
│
├─ js/
│  ├─ models/
│  │  └─ contactModel.js      # Gestion des données (CRUD) via localStorage
│  ├─ controllers/
│  │  └─ contactController.js # Logique pour ajouter, éditer, supprimer, préparer édition
│  ├─ views/
│  │  ├─ homeView.js          # Vue de la liste des contacts
│  │  └─ profileView.js       # Vue du profil d’un contact
│  └─ app.js                  # Initialisation de l’application et gestion des événements
│
├─ css/
│  └─ index.css        # Styles personnalisés
├─ lib/
│  ├─ jquery.min.js
│  └─ jquery.mobile-1.4.5.min.js
├─ index.html          # Page d’accueil (liste des contacts)
└─ README.md           # Documentation du projet

````

---

## 🛠 Technologies utilisées

- **HTML5 / CSS3**
- **JavaScript (ES6)**
- **jQuery / jQuery Mobile** pour la navigation mobile
- **SweetAlert2** pour les popups de confirmation et notifications
- **localStorage** pour le stockage persistant côté client
- **Cordova** (optionnel) pour la transformation en application mobile

---

## ⚙️ Installation et exécution

1. Cloner le projet :

```bash
git clone https://github.com/fatimaaaaah/Projet_Gestion_des_contacts_Cordova.git
cd Projet_Gestion_des_contacts_Cordova
````

---

## 📌 Notes

* Les images avatars par défaut se trouvent dans le dossier `img/`.
* Les contacts sont stockés dans le navigateur et seront perdus si les données locales sont supprimées.
---

## 🔗 Auteur

**Fatima Nguénar DIOUF**
