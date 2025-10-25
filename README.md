# Moment 4 – Autentiserings-webbtjänst

En webbtjänst för användarautentisering med JWT (JSON Web Token) och hashade lösenord.

## Funktioner

- Användarregistrering med validering
- Säker inloggning med hashade lösenord
- JWT-autentisering för sessionshantering
- Skyddade routes som kräver autentisering
- MongoDB-databas för användardata
- Bcrypt för lösenordshashing
- Express-validator för inputvalidering

## Teknisk stack

- **Backend:** Node.js, Express.js
- **Databas:** MongoDB (MongoDB Atlas)
- **Autentisering:** JWT (JSON Web Token)
- **Lösenordshashing:** bcryptjs
- **Validering:** express-validator
- **ODM:** Mongoose

## Installation

```bash
# Installera dependencies
npm install
```

## Konfiguration

Skapa en `.env`-fil i projektets rotkatalog:

```env
# Databasanslutning
MONGODB_URI=mongodb+srv://användare:lösenord@cluster.mongodb.net/databas

# JWT-inställningar
JWT_SECRET=hemlig-jwt-nyckel
JWT_EXPIRES_IN=24h

# Server-inställningar
PORT=3000
NODE_ENV=development

# Säkerhetsinställningar
BCRYPT_ROUNDS=12
```

## Starta servern

```bash
# Utvecklingsläge (med nodemon)
npm run dev

# Produktionsläge
npm start
```

## API-dokumentation

### Base URL

**Lokal utveckling:**

```
http://localhost:3000
```

**Live deployment:**

```
https://dt207g-moment4-1-p1ry.onrender.com
```

**GitHub Repository:**

```
https://github.com/ellenliden/DT207G_moment4_1.git
```

### Endpoints

#### 1. Grundläggande information

```http
GET /
```

Returnerar API-information och tillgängliga endpoints.

#### 2. Registrera användare

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "användarnamn",
  "email": "email@example.com",
  "password": "lösenord123"
}
```

**Svar:**

```json
{
  "success": true,
  "message": "Användare skapad framgångsrikt",
  "token": "jwt-token-här",
  "user": {
    "id": "användar-id",
    "username": "användarnamn",
    "email": "email@example.com"
  }
}
```

#### 3. Logga in

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "lösenord123"
}
```

**Svar:**

```json
{
  "success": true,
  "message": "Inloggning lyckades",
  "token": "jwt-token-här",
  "user": {
    "id": "användar-id",
    "username": "användarnamn",
    "email": "email@example.com"
  }
}
```

#### 4. Skyddad resurs

```http
GET /api/protected
Authorization: Bearer jwt-token-här
```

**Svar:**

```json
{
  "success": true,
  "message": "Åtkomst till skyddad resurs lyckades",
  "user": {
    "id": "användar-id",
    "username": "användarnamn",
    "email": "email@example.com"
  },
  "timestamp": "2025-10-24T13:22:52.620Z"
}
```

#### 5. Användarprofil

```http
GET /api/protected/profile
Authorization: Bearer jwt-token-här
```

**Svar:**

```json
{
  "success": true,
  "message": "Profil hämtad framgångsrikt",
  "user": {
    "id": "användar-id",
    "username": "användarnamn",
    "email": "email@example.com",
    "loginTime": "2025-10-24T13:22:52.620Z"
  }
}
```

## Säkerhet

- **Lösenordshashing:** Bcrypt med konfigurerbara salt rounds (standard: 12)
- **JWT-tokens:** 24 timmars giltighet
- **Validering:** Inputvalidering med express-validator
- **Rate Limiting:** Förhindrar brute force-attacker (5 inloggningsförsök per 15 min)
- **Helmet:** Säkerhetsheaders för att skydda mot vanliga attacker
- **CORS:** Aktiverat för cross-origin requests
- **Miljövariabler:** Känslig data lagras i .env-fil (inte i Git)
- **Felhantering:** Strukturerade felmeddelanden

## Databas-schema

### User

```javascript
{
  username: String (required, unique, 3-30 tecken),
  email: String (required, unique, valid email),
  password: String (required, min 6 tecken, hashad),
  createdAt: Date,
  updatedAt: Date
}
```

## Testning

### Lokal testning

```bash
# Testa grundläggande endpoint
curl http://localhost:3000/

# Testa registrering
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Testa inloggning
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Testa skyddad route (använd token från inloggning)
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/protected
```

### Live deployment testning

```bash
# Testa live API
curl https://dt207g-moment4-1-p1ry.onrender.com/

# Testa registrering på live server
curl -X POST https://dt207g-moment4-1-p1ry.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"liveuser","email":"live@example.com","password":"password123"}'
```

## Miljövariabler

Skapa en `.env`-fil för produktionsmiljö:

```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=din-hemliga-nyckel
```

## Utveckling

Projektet använder ES6-moduler och modern JavaScript-syntax. Alla routes är strukturerade i separata filer för bättre organisation.

## Slutsatser

- **JWT-autentisering:** Ger säker sessionshantering utan server-side sessions
- **Bcrypt-hashing:** Skyddar lösenord även om databasen kompromitteras
- **Mongoose-validering:** Säkerställer dataintegritet på databasnivå
- **Express-validator:** Ger robust inputvalidering
- **Modulär struktur:** Lätt att underhålla och utöka

## Deployment

### Render.com

Denna webbtjänst är deployad på [Render.com](https://render.com) och är tillgänglig på:
**https://dt207g-moment4-1-p1ry.onrender.com/**

### GitHub Repository

Källkoden finns tillgänglig på GitHub:
**https://github.com/ellenliden/DT207G_moment4_1.git**

## Kontakt

Ellen Lidén

elli1807@student.miun.se
