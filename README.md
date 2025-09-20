#  Blog API Backend - Learning Project

> **⚠️ IMPORTANT**: Ce projet est en cours d'apprentissage et contient des vulnérabilités de sécurité identifiées. Il ne doit PAS être utilisé en production sans les corrections recommandées.

##  Description

API REST pour un système de blog développée avec le stack MERN (MongoDB, Express.js, React, Node.js) en TypeScript. Ce projet explore les concepts fondamentaux du développement backend moderne.

##  Stack Technique

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB avec Mongoose ODM  
- **Language**: TypeScript
- **Authentication**: JWT avec cookies httpOnly
- **Validation**: Zod schemas
- **File Upload**: Multer
- **Security**: bcrypt, rate limiting, CORS
- **Logging**: Winston

##  Structure du Projet

├── src/
│ ├── config/ # Configuration (DB, Logger)
│ ├── controllers/ # Logique des routes
│ ├── middlewares/ # Middlewares personnalisés
│ ├── models/ # Modèles MongoDB/Mongoose
│ ├── routes/ # Définition des routes
│ ├── interfaces/ # Types TypeScript
│ ├── validations/ # Schémas de validation Zod
│ ├── utils/ # Utilitaires (JWT, Upload)
│ └── app.ts # Configuration Express
├── uploads/ # Fichiers uploadés
├── logs/ # Logs de l'application
└── package.json


## 🔧 Installation

git clone  https://github.com/Ilyass-berradi/Blog-backend.git
cd Blog-backend

Installer les dépendances
npm install

Configuration environnement
.env

Compléter les variables dans .env


##  Variables d'Environnement
PORT=3000
MONGO_URI=mongodb://localhost:27017/blog
JWT_SECRET=votre_jwt_secret_tres_long_et_securise


## 📚 API Endpoints

### Authentication
- `POST  /auth/register` - Inscription utilisateur
- `POST  /auth/login` - Connexion utilisateur

### Posts
- `GET  /posts` - Récupérer tous les posts
- `POST  /posts` - Créer un post (auth requis)
- `GET  /posts/:id` - Post par ID
- `PUT  /posts/:id` - Modifier un post (auth requis)
- `DELETE  /posts/:id` - Supprimer un post (auth requis)

### Categories
- `GET  /categories` - Toutes les catégories
- `POST  /categories` - Créer catégorie (admin requis)
- `DELETE  /categories/:id` - Supprimer catégorie (admin requis)

### Comments
- `POST  /comments` - Ajouter commentaire (auth requis)
- `PUT  /comments/:id` - Modifier commentaire (auth requis)
- `DELETE  /comments/:id` - Supprimer commentaire (auth requis)




## 👨‍💻 Auteur

**Développeur Full-Stack**  berradi ilyass

---

> **Note**: Ce projet fait partie d'un parcours d'apprentissage du développement backend. 