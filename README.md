<div align="center">

# 🌿 GeoWaste

### Sistem Informasi Geografis Pengelolaan Limbah

<img src="./screenshots/Dashboard.png" alt="GeoWaste Dashboard" width="80%" style="border-radius: 10px; margin: 20px 0;">

[![AdonisJS](https://img.shields.io/badge/AdonisJS-v6-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white)](https://adonisjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

<br>

**Aplikasi web modern untuk pengelolaan dan monitoring titik-titik limbah secara geografis**  
**dengan integrasi peta interaktif dan analisis lingkungan real-time**

<br>

[🚀 Demo](#-instalasi) • [📖 Dokumentasi](#-api-documentation) • [🐛 Report Bug](https://github.com/Sento2/GeoWaste/issues)

</div>

---

## 📑 Daftar Isi

<details>
<summary>Klik untuk melihat</summary>

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Arsitektur Sistem](#-arsitektur-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [API Documentation](#-api-documentation)
- [Strategi Integrasi API](#-strategi-integrasi-api-publik)
- [Screenshot](#-screenshot)
- [Tema & Warna](#-tema--warna)
- [Kontributor](#-kontributor)

</details>

---

## 🎯 Tentang Project

**GeoWaste** adalah aplikasi web yang dirancang untuk membantu pengelolaan limbah berbasis lokasi geografis. Dengan memanfaatkan teknologi peta interaktif dan integrasi API cuaca, aplikasi ini memungkinkan:

- 📍 **Pemetaan** titik-titik limbah secara real-time
- 📊 **Monitoring** status penanganan limbah
- 🌡️ **Analisis** kondisi lingkungan untuk optimasi pengelolaan
- 👥 **Kolaborasi** antara admin, petugas, dan warga

---

## ✨ Fitur Utama

<table>
<tr>
<td width="50%">

### 🗺️ Peta Interaktif
- Visualisasi dengan **Leaflet.js**
- Marker berwarna berdasarkan status
- Popup informasi detail
- Filter berdasarkan jenis & status

</td>
<td width="50%">

### 📍 Manajemen Titik Limbah
- CRUD dengan koordinat presisi tinggi
- Kategorisasi: Organik, Anorganik, B3, Campuran
- Tracking status penanganan
- Riwayat perubahan

</td>
</tr>
<tr>
<td width="50%">

### 📊 Dashboard & Laporan
- Statistik real-time
- Grafik status penanganan
- Sistem pelaporan warga
- Filter & pencarian data

</td>
<td width="50%">

### 🌡️ Analisis Lingkungan
- Data cuaca **OpenWeatherMap**
- Reverse geocoding **Nominatim**
- Rekomendasi pengelolaan
- Alert kondisi ekstrem

</td>
</tr>
<tr>
<td width="50%">

### 👥 Multi-Role Access
- **Admin**: Akses penuh
- **Petugas**: Kelola data
- **Warga**: Buat laporan

</td>
<td width="50%">

### 🔐 Keamanan
- Autentikasi JWT
- Role-based authorization
- Password hashing bcrypt
- Session management

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Backend
| | Teknologi | Deskripsi |
|:--:|:--|:--|
| <img src="https://img.shields.io/badge/-AdonisJS-5A45FF?style=flat-square&logo=adonisjs&logoColor=white" /> | **AdonisJS v6** | Full-stack MVC Framework |
| <img src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" /> | **MongoDB** | NoSQL Database + Mongoose |
| <img src="https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" /> | **JWT** | Token-based Authentication |
| <img src="https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" /> | **Axios** | HTTP Client |

### Frontend
| | Teknologi | Deskripsi |
|:--:|:--|:--|
| <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" /> | **Vanilla JS** | Pure JavaScript |
| <img src="https://img.shields.io/badge/-Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white" /> | **Leaflet.js** | Interactive Maps |
| <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" /> | **CSS3** | Modern Styling |

### External APIs
| | API | Fungsi |
|:--:|:--|:--|
| 🌤️ | **OpenWeatherMap** | Real-time Weather Data |
| 🗺️ | **Nominatim OSM** | Reverse Geocoding |

</div>

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Browser   │  │  Leaflet.js │  │   CSS3      │              │
│  │  (app.html) │  │    (Maps)   │  │  (Styling)  │              │
│  └──────┬──────┘  └──────┬──────┘  └─────────────┘              │
│         │                │                                       │
│         └────────┬───────┘                                       │
│                  │ HTTP/REST                                     │
└──────────────────┼───────────────────────────────────────────────┘
                   │
┌──────────────────┼───────────────────────────────────────────────┐
│                  ▼           SERVER LAYER                        │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │                    AdonisJS v6                          │     │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │     │
│  │  │   Routes    │─▶│ Controllers │─▶│  Services   │      │     │
│  │  └─────────────┘  └─────────────┘  └──────┬──────┘      │     │
│  │                          │                │              │     │
│  │  ┌─────────────┐  ┌──────┴──────┐  ┌──────┴──────┐      │     │
│  │  │ Middleware  │  │   Models    │  │ External    │      │     │
│  │  │ (Auth/Role) │  │ (Mongoose)  │  │ API Service │      │     │
│  │  └─────────────┘  └──────┬──────┘  └──────┬──────┘      │     │
│  └───────────────────────────┼───────────────┼──────────────┘     │
│                              │               │                    │
└──────────────────────────────┼───────────────┼────────────────────┘
                               │               │
          ┌────────────────────┘               └────────────────┐
          │                                                     │
          ▼                                                     ▼
┌──────────────────┐                           ┌────────────────────────┐
│   MongoDB Atlas  │                           │    External APIs       │
│  ┌────────────┐  │                           │  ┌──────────────────┐  │
│  │   Users    │  │                           │  │  OpenWeatherMap  │  │
│  ├────────────┤  │                           │  ├──────────────────┤  │
│  │WastePoints │  │                           │  │    Nominatim     │  │
│  ├────────────┤  │                           │  └──────────────────┘  │
│  │  Reports   │  │                           │                        │
│  └────────────┘  │                           └────────────────────────┘
└──────────────────┘
```

### 📁 Struktur Project

```
GeoWaste/
├── 📂 app/
│   ├── 📂 controllers/          # Request Handlers
│   │   ├── AuthController.ts        # Login, Register, Profile
│   │   ├── ExternalController.ts    # Weather & Geocoding
│   │   ├── ReportsController.ts     # CRUD Laporan
│   │   ├── WastePointsController.ts # CRUD Titik Limbah
│   │   └── users_controller.ts      # Manajemen User
│   ├── 📂 middleware/           # Auth & Authorization
│   │   ├── Auth.ts                  # JWT Verification
│   │   └── Role.ts                  # Role-based Access
│   ├── 📂 models/               # Mongoose Schemas
│   │   ├── Report.ts
│   │   ├── users.ts
│   │   └── WastePoint.ts
│   └── 📂 Services/             # Business Logic
│       └── ExternalEnvService.ts    # External API Calls
├── 📂 config/                   # App Configuration
│   └── Mongo.ts                     # Database Connection
├── 📂 public/                   # Static Assets
│   ├── app.html                     # Main Frontend
│   ├── app.js                       # Frontend Logic
│   ├── style.css                    # Styling
│   ├── docs.html                    # Swagger UI
│   └── swagger.json                 # API Specification
├── 📂 screenshots/              # App Screenshots
├── 📂 start/
│   ├── routes.ts                    # API Routes Definition
│   └── env.ts                       # Environment Validation
├── .env                         # Environment Variables
├── .env.example                 # Environment Template
└── package.json                 # Dependencies
```

---

## 🚀 Instalasi

### Prasyarat

| Requirement | Version |
|-------------|---------|
| Node.js | v18.0+ |
| MongoDB | v6.0+ atau Atlas |
| npm/yarn | Latest |

### Quick Start

```bash
# 1️⃣ Clone repository
git clone https://github.com/Sento2/GeoWaste.git
cd GeoWaste

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment
cp .env.example .env

# 4️⃣ Configure .env (lihat bagian Konfigurasi)

# 5️⃣ Run development server
npm run dev

# 6️⃣ Buka browser
# Frontend: http://localhost:3333/app.html
# API Docs: http://localhost:3333/docs.html
```

### Production Build

```bash
# Build untuk production
npm run build

# Jalankan production server
npm start
```

---

## ⚙️ Konfigurasi

### Environment Variables

Buat file `.env` dengan konfigurasi berikut:

```env
# ═══════════════════════════════════════
# 🔧 APP CONFIGURATION
# ═══════════════════════════════════════
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=your-random-32-character-key
NODE_ENV=development

# ═══════════════════════════════════════
# 🗄️ DATABASE (MongoDB)
# ═══════════════════════════════════════
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/geowaste

# ═══════════════════════════════════════
# 🔐 AUTHENTICATION (JWT)
# ═══════════════════════════════════════
JWT_SECRET=your-super-secret-jwt-key

# ═══════════════════════════════════════
# 🌤️ OPENWEATHERMAP API
# ═══════════════════════════════════════
OPENWEATHER_API_KEY=your-openweather-api-key

# ═══════════════════════════════════════
# 🗺️ NOMINATIM API (OpenStreetMap)
# ═══════════════════════════════════════
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
NOMINATIM_USER_AGENT=GeoWaste/1.0 (your-email@example.com)
NOMINATIM_EMAIL=your-email@example.com
```

### Default Admin Account

Setelah instalasi, buat admin pertama via API:

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "Administrator",
  "email": "admin@geowaste.com",
  "password": "admin123",
  "role": "admin"
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:3333/api
```

### 🔐 Authentication

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/auth/register` | Registrasi user baru | ❌ |
| `POST` | `/auth/login` | Login & get token | ❌ |
| `GET` | `/auth/me` | Get current user info | ✅ |

### 📍 Waste Points

| Method | Endpoint | Description | Auth | Role |
|:------:|:---------|:------------|:----:|:----:|
| `GET` | `/waste-points` | List semua titik | ✅ | All |
| `POST` | `/waste-points` | Tambah titik baru | ✅ | Admin, Petugas |
| `GET` | `/waste-points/:id` | Detail titik | ✅ | All |
| `PUT` | `/waste-points/:id` | Update titik | ✅ | Admin, Petugas |
| `DELETE` | `/waste-points/:id` | Hapus titik | ✅ | Admin |

### 📋 Reports

| Method | Endpoint | Description | Auth | Role |
|:------:|:---------|:------------|:----:|:----:|
| `GET` | `/reports` | List semua laporan | ✅ | Admin, Petugas |
| `POST` | `/reports` | Buat laporan | ✅ | All |
| `PATCH` | `/reports/:id/status` | Update status | ✅ | Admin, Petugas |

### 👥 Users

| Method | Endpoint | Description | Auth | Role |
|:------:|:---------|:------------|:----:|:----:|
| `GET` | `/users` | List semua user | ✅ | Admin |
| `PUT` | `/users/:id` | Update user | ✅ | Admin |
| `DELETE` | `/users/:id` | Hapus user | ✅ | Admin |

### 🌍 External APIs

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/external/weather` | Data cuaca | ✅ |
| `GET` | `/external/reverse-geocode` | Koordinat → Alamat | ✅ |
| `GET` | `/external/environment` | Cuaca + Alamat + Rekomendasi | ✅ |

<br>

> 📖 **Dokumentasi Lengkap**: Buka `/docs.html` untuk Swagger UI interaktif

---

## 🔗 Strategi Integrasi API Publik

### Arsitektur Proxy Pattern

```
┌──────────┐      ┌──────────────┐      ┌─────────────────┐
│ Frontend │ ───▶ │   Backend    │ ───▶ │  External APIs  │
│          │      │   (Proxy)    │      │                 │
└──────────┘      └──────────────┘      └─────────────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
     API Key tersembunyi      Response di-transform
```

### Mengapa Backend sebagai Proxy?

| Benefit | Penjelasan |
|:--------|:-----------|
| 🔐 **Security** | API key tidak terekspos di browser |
| 🚦 **Rate Control** | Request bisa dibatasi di server |
| 📊 **Caching** | Response bisa di-cache |
| 🔄 **Transform** | Data diproses sebelum ke client |

### Flow Integrasi

```
User Action          Frontend              Backend               External API
     │                   │                    │                       │
     │ Open Environment  │                    │                       │
     │──────────────────▶│                    │                       │
     │                   │ GET /environment   │                       │
     │                   │───────────────────▶│                       │
     │                   │                    │ GET Weather           │
     │                   │                    │──────────────────────▶│
     │                   │                    │◀──────────────────────│
     │                   │                    │ GET Geocode           │
     │                   │                    │──────────────────────▶│
     │                   │                    │◀──────────────────────│
     │                   │   Combined Data    │                       │
     │                   │◀───────────────────│                       │
     │   Render UI       │                    │                       │
     │◀──────────────────│                    │                       │
```

### API yang Diintegrasikan

<table>
<tr>
<td width="50%">

#### 🌤️ OpenWeatherMap
```
Endpoint: api.openweathermap.org/data/2.5/weather
Method: GET
Params: lat, lon, appid, units

Response:
├── temp (suhu)
├── humidity (kelembaban)
├── wind_speed (angin)
└── description (kondisi)
```

</td>
<td width="50%">

#### 🗺️ Nominatim
```
Endpoint: nominatim.openstreetmap.org/reverse
Method: GET
Params: lat, lon, format
Headers: User-Agent (required)

Response:
├── road (jalan)
├── village (kelurahan)
├── city (kota)
└── state (provinsi)
```

</td>
</tr>
</table>

### Rate Limits

| API | Free Tier Limit | Catatan |
|:----|:----------------|:--------|
| OpenWeatherMap | 60 calls/min | Butuh API key |
| Nominatim | 1 req/sec | Wajib User-Agent |

---

## 📸 Screenshot

<div align="center">

### 🏠 Dashboard
<img src="./screenshots/Dashboard.png" alt="Dashboard" width="90%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

<br><br>

### 🗺️ Peta Interaktif
<img src="./screenshots/Map.png" alt="Peta Interaktif" width="90%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

<br><br>

### 🌡️ Analisis Lingkungan
<img src="./screenshots/Analisis Lingkungan.png" alt="Analisis Lingkungan" width="90%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

</div>

---

## 🎨 Tema & Warna

Aplikasi menggunakan tema **Nature/Forest** yang menenangkan:

<div align="center">

| Preview | Nama | Hex Code | Penggunaan |
|:-------:|:-----|:---------|:-----------|
| ![#2d6a4f](https://via.placeholder.com/30/2d6a4f/2d6a4f?text=+) | **Forest Green** | `#2d6a4f` | Primary, Buttons |
| ![#52796f](https://via.placeholder.com/30/52796f/52796f?text=+) | **Sage Green** | `#52796f` | Secondary, Headers |
| ![#8b7355](https://via.placeholder.com/30/8b7355/8b7355?text=+) | **Earth Brown** | `#8b7355` | Accent, Borders |
| ![#74c0fc](https://via.placeholder.com/30/74c0fc/74c0fc?text=+) | **Sky Blue** | `#74c0fc` | Info, Links |
| ![#69db7c](https://via.placeholder.com/30/69db7c/69db7c?text=+) | **Leaf Green** | `#69db7c` | Success, Completed |

</div>

---

## 👥 Kontributor

<div align="center">
<table>
<tr>
<td align="center">
<a href="https://github.com/Sento2">
<img src="https://github.com/Sento2.png" width="120px;" style="border-radius: 50%;" alt="Sento2"/>
<br />
<sub><b>Sento2</b></sub>
</a>
<br />
<sub>💻 Developer</sub>
</td>
</tr>
</table>
</div>

---

## 📄 Lisensi

<div align="center">

Project ini dibuat untuk keperluan **Tugas Besar** mata kuliah.

[![License](https://img.shields.io/badge/License-Educational-green?style=for-the-badge)](LICENSE)

</div>

---

## 🙏 Acknowledgments

<div align="center">

Terima kasih kepada teknologi dan layanan berikut:

[![AdonisJS](https://img.shields.io/badge/AdonisJS-5A45FF?style=flat-square&logo=adonisjs&logoColor=white)](https://adonisjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=flat-square&logo=openweathermap&logoColor=white)](https://openweathermap.org/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)

</div>

---

<div align="center">

### 🌿 GeoWaste

**Bersama Menjaga Lingkungan**

<br>

Made with 💚 for a greener environment

<br>

⭐ Star this repo jika bermanfaat!

</div>
