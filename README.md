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

|                                                                                                             | Teknologi       | Deskripsi                  |
| :---------------------------------------------------------------------------------------------------------: | :-------------- | :------------------------- |
| <img src="https://img.shields.io/badge/-AdonisJS-5A45FF?style=flat-square&logo=adonisjs&logoColor=white" /> | **AdonisJS v6** | Full-stack MVC Framework   |
|  <img src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />  | **MongoDB**     | NoSQL Database + Mongoose  |
| <img src="https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" /> | **JWT**         | Token-based Authentication |
|    <img src="https://img.shields.io/badge/-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />    | **Axios**       | HTTP Client                |

### Frontend

|                                                                                                                 | Teknologi      | Deskripsi        |
| :-------------------------------------------------------------------------------------------------------------: | :------------- | :--------------- |
| <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" /> | **Vanilla JS** | Pure JavaScript  |
|    <img src="https://img.shields.io/badge/-Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white" />    | **Leaflet.js** | Interactive Maps |
|       <img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" />       | **CSS3**       | Modern Styling   |

### External APIs

|     | API                | Fungsi                 |
| :-: | :----------------- | :--------------------- |
| 🌤️  | **OpenWeatherMap** | Real-time Weather Data |
| 🗺️  | **Nominatim OSM**  | Reverse Geocoding      |

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

| Requirement | Version          |
| ----------- | ---------------- |
| Node.js     | v18.0+           |
| MongoDB     | v6.0+ atau Atlas |
| npm/yarn    | Latest           |

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

| Method | Endpoint         | Description           | Auth |
| :----: | :--------------- | :-------------------- | :--: |
| `POST` | `/auth/register` | Registrasi user baru  |  ❌  |
| `POST` | `/auth/login`    | Login & get token     |  ❌  |
| `GET`  | `/auth/me`       | Get current user info |  ✅  |

### 📍 Waste Points

|  Method  | Endpoint            | Description       | Auth |      Role      |
| :------: | :------------------ | :---------------- | :--: | :------------: |
|  `GET`   | `/waste-points`     | List semua titik  |  ✅  |      All       |
|  `POST`  | `/waste-points`     | Tambah titik baru |  ✅  | Admin, Petugas |
|  `GET`   | `/waste-points/:id` | Detail titik      |  ✅  |      All       |
|  `PUT`   | `/waste-points/:id` | Update titik      |  ✅  | Admin, Petugas |
| `DELETE` | `/waste-points/:id` | Hapus titik       |  ✅  |     Admin      |

### 📋 Reports

| Method  | Endpoint              | Description        | Auth |      Role      |
| :-----: | :-------------------- | :----------------- | :--: | :------------: |
|  `GET`  | `/reports`            | List semua laporan |  ✅  | Admin, Petugas |
| `POST`  | `/reports`            | Buat laporan       |  ✅  |      All       |
| `PATCH` | `/reports/:id/status` | Update status      |  ✅  | Admin, Petugas |

### 👥 Users

|  Method  | Endpoint     | Description     | Auth | Role  |
| :------: | :----------- | :-------------- | :--: | :---: |
|  `GET`   | `/users`     | List semua user |  ✅  | Admin |
|  `PUT`   | `/users/:id` | Update user     |  ✅  | Admin |
| `DELETE` | `/users/:id` | Hapus user      |  ✅  | Admin |

### 🌍 External APIs

| Method | Endpoint                    | Description                  | Auth |
| :----: | :-------------------------- | :--------------------------- | :--: |
| `GET`  | `/external/weather`         | Data cuaca                   |  ✅  |
| `GET`  | `/external/reverse-geocode` | Koordinat → Alamat           |  ✅  |
| `GET`  | `/external/environment`     | Cuaca + Alamat + Rekomendasi |  ✅  |

<br>

> 📖 **Dokumentasi Lengkap**: Buka `/docs.html` untuk Swagger UI interaktif

---

## 🔗 Strategi Integrasi API Publik

### 📌 Overview

GeoWaste mengintegrasikan **2 API Publik** untuk menyediakan fitur analisis lingkungan yang komprehensif:

| No  | API                | Provider           | Fungsi Utama         | Tipe     |
| :-: | :----------------- | :----------------- | :------------------- | :------- |
|  1  | **OpenWeatherMap** | openweathermap.org | Data cuaca real-time | REST API |
|  2  | **Nominatim**      | OpenStreetMap      | Reverse Geocoding    | REST API |

---

### 🏗️ Arsitektur Integrasi

#### Mengapa Menggunakan Backend sebagai Proxy?

```
❌ TIDAK AMAN (Direct Call dari Frontend)
┌──────────┐                      ┌─────────────────┐
│ Frontend │ ──── API Key ────▶  │  External API   │
│ (Browser)│    (TEREKSPOS!)     │                 │
└──────────┘                      └─────────────────┘
     ⚠️ API Key bisa dilihat di DevTools Browser!


✅ AMAN (Melalui Backend Proxy)
┌──────────┐      ┌──────────────┐      ┌─────────────────┐
│ Frontend │ ───▶ │   Backend    │ ───▶ │  External API   │
│ (Browser)│      │   (Proxy)    │      │                 │
└──────────┘      │  🔐 API Key  │      └─────────────────┘
                  │   tersimpan  │
                  │   di server  │
                  └──────────────┘
```

#### Keuntungan Proxy Pattern

| Benefit               | Penjelasan                         | Implementasi              |
| :-------------------- | :--------------------------------- | :------------------------ |
| 🔐 **Security**       | API key tidak terekspos di browser | Disimpan di `.env` server |
| 🚦 **Rate Limiting**  | Bisa kontrol jumlah request        | Middleware di backend     |
| 📊 **Caching**        | Hemat quota API dengan cache       | Redis/Memory cache        |
| 🔄 **Data Transform** | Format ulang response              | Service layer             |
| 🛡️ **Error Handling** | Tangani error secara terpusat      | Try-catch di controller   |

---

### 📡 Detail API yang Digunakan

#### 1️⃣ OpenWeatherMap API

| Item               | Detail                                                   |
| :----------------- | :------------------------------------------------------- |
| **Provider**       | OpenWeatherMap.org                                       |
| **Endpoint**       | `https://api.openweathermap.org/data/2.5/weather`        |
| **Method**         | `GET`                                                    |
| **Authentication** | API Key (query parameter `appid`)                        |
| **Rate Limit**     | 60 calls/minute (Free tier)                              |
| **Dokumentasi**    | [openweathermap.org/api](https://openweathermap.org/api) |

**Request Parameters:**

```
GET /data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&lang=id
```

| Parameter | Type   | Required | Description                 |
| :-------- | :----- | :------: | :-------------------------- |
| `lat`     | number |    ✅    | Latitude koordinat          |
| `lon`     | number |    ✅    | Longitude koordinat         |
| `appid`   | string |    ✅    | API Key                     |
| `units`   | string |    ❌    | `metric` untuk Celsius      |
| `lang`    | string |    ❌    | `id` untuk Bahasa Indonesia |

**Response Example:**

```json
{
  "main": {
    "temp": 28.5,
    "humidity": 75,
    "feels_like": 32.1
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "berawan tebal",
      "icon": "04d"
    }
  ],
  "wind": {
    "speed": 3.5
  },
  "name": "Jakarta"
}
```

**Data yang Digunakan di GeoWaste:**

- 🌡️ `temp` - Suhu saat ini
- 💧 `humidity` - Kelembaban udara
- 💨 `wind.speed` - Kecepatan angin
- ☁️ `weather.description` - Deskripsi cuaca
- 🖼️ `weather.icon` - Icon cuaca

---

#### 2️⃣ Nominatim API (OpenStreetMap)

| Item               | Detail                                                                               |
| :----------------- | :----------------------------------------------------------------------------------- |
| **Provider**       | OpenStreetMap Foundation                                                             |
| **Endpoint**       | `https://nominatim.openstreetmap.org/reverse`                                        |
| **Method**         | `GET`                                                                                |
| **Authentication** | Tidak perlu API Key                                                                  |
| **Rate Limit**     | 1 request/second                                                                     |
| **Requirement**    | Wajib menyertakan `User-Agent` header                                                |
| **Dokumentasi**    | [nominatim.org/release-docs](https://nominatim.org/release-docs/latest/api/Reverse/) |

**Request Parameters:**

```
GET /reverse?lat={lat}&lon={lon}&format=json&addressdetails=1
Headers: User-Agent: GeoWaste/1.0 (email@example.com)
```

| Parameter        | Type   | Required | Description                |
| :--------------- | :----- | :------: | :------------------------- |
| `lat`            | number |    ✅    | Latitude koordinat         |
| `lon`            | number |    ✅    | Longitude koordinat        |
| `format`         | string |    ✅    | `json` untuk response JSON |
| `addressdetails` | number |    ❌    | `1` untuk detail alamat    |

**Response Example:**

```json
{
  "address": {
    "road": "Jalan Sudirman",
    "neighbourhood": "Karet Tengsin",
    "suburb": "Tanah Abang",
    "city": "Jakarta Pusat",
    "state": "DKI Jakarta",
    "postcode": "10220",
    "country": "Indonesia"
  },
  "display_name": "Jalan Sudirman, Karet Tengsin, Jakarta Pusat, DKI Jakarta, 10220, Indonesia"
}
```

**Data yang Digunakan di GeoWaste:**

- 🛣️ `road` - Nama jalan
- 🏘️ `neighbourhood` - Kelurahan
- 🏙️ `city` - Kota/Kabupaten
- 🗺️ `state` - Provinsi
- 📮 `postcode` - Kode pos

---

### 🔄 Flow Integrasi Step-by-Step

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLOW INTEGRASI API PUBLIK                           │
└─────────────────────────────────────────────────────────────────────────────┘

  👤 USER                🖥️ FRONTEND              ⚙️ BACKEND               🌐 EXTERNAL API
     │                        │                        │                        │
     │ 1. Buka halaman        │                        │                        │
     │    "Analisis           │                        │                        │
     │    Lingkungan"         │                        │                        │
     │───────────────────────▶│                        │                        │
     │                        │                        │                        │
     │                        │ 2. Minta izin lokasi   │                        │
     │◀───────────────────────│    (Geolocation API)   │                        │
     │                        │                        │                        │
     │ 3. Izinkan lokasi      │                        │                        │
     │───────────────────────▶│                        │                        │
     │                        │                        │                        │
     │                        │ 4. GET /api/external/  │                        │
     │                        │    environment?        │                        │
     │                        │    lat=-6.2&lon=106.8  │                        │
     │                        │───────────────────────▶│                        │
     │                        │                        │                        │
     │                        │                        │ 5. GET OpenWeatherMap  │
     │                        │                        │    (dengan API Key)    │
     │                        │                        │───────────────────────▶│
     │                        │                        │                        │
     │                        │                        │ 6. Response cuaca      │
     │                        │                        │◀───────────────────────│
     │                        │                        │                        │
     │                        │                        │ 7. GET Nominatim       │
     │                        │                        │    (dengan User-Agent) │
     │                        │                        │───────────────────────▶│
     │                        │                        │                        │
     │                        │                        │ 8. Response alamat     │
     │                        │                        │◀───────────────────────│
     │                        │                        │                        │
     │                        │ 9. Combined Response   │                        │
     │                        │    (weather + address  │                        │
     │                        │    + recommendations)  │                        │
     │                        │◀───────────────────────│                        │
     │                        │                        │                        │
     │ 10. Tampilkan UI       │                        │                        │
     │     - Weather Card     │                        │                        │
     │     - Location Info    │                        │                        │
     │     - Recommendations  │                        │                        │
     │◀───────────────────────│                        │                        │
     │                        │                        │                        │
```

---

### 💻 Implementasi Kode

#### Service Layer (`app/Services/ExternalEnvService.ts`)

```typescript
import axios from 'axios'

/**
 * Service untuk integrasi dengan External API
 * Menggunakan Proxy Pattern untuk keamanan
 */

// ═══════════════════════════════════════════════════════════════
// 🌤️ OPENWEATHERMAP SERVICE
// ═══════════════════════════════════════════════════════════════
export async function getWeather(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY

  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: lat,
      lon: lon,
      appid: apiKey, // API Key dari environment
      units: 'metric', // Celsius
      lang: 'id', // Bahasa Indonesia
    },
  })

  // Transform response sesuai kebutuhan frontend
  return {
    temp: response.data.main.temp,
    feels_like: response.data.main.feels_like,
    humidity: response.data.main.humidity,
    wind_speed: response.data.wind.speed,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    main: response.data.weather[0].main,
  }
}

// ═══════════════════════════════════════════════════════════════
// 🗺️ NOMINATIM SERVICE
// ═══════════════════════════════════════════════════════════════
export async function reverseGeocode(lat: number, lon: number) {
  const response = await axios.get(`${process.env.NOMINATIM_BASE_URL}/reverse`, {
    params: {
      lat: lat,
      lon: lon,
      format: 'json',
      addressdetails: 1,
    },
    headers: {
      // Nominatim WAJIB menyertakan User-Agent
      'User-Agent': process.env.NOMINATIM_USER_AGENT,
    },
  })

  return response.data.address
}
```

#### Controller Layer (`app/controllers/ExternalController.ts`)

```typescript
import type { HttpContext } from '@adonisjs/core/http'
import { getWeather, reverseGeocode } from '#services/ExternalEnvService'

export default class ExternalController {
  /**
   * GET /api/external/environment
   * Endpoint gabungan untuk analisis lingkungan
   */
  async environment({ request, response }: HttpContext) {
    const { lat, lon } = request.qs()

    // Validasi input
    if (!lat || !lon) {
      return response.badRequest({
        success: false,
        message: 'Parameter lat dan lon diperlukan',
      })
    }

    try {
      // ⚡ Panggil kedua API secara PARALEL untuk efisiensi
      const [weather, address] = await Promise.all([
        getWeather(parseFloat(lat), parseFloat(lon)),
        reverseGeocode(parseFloat(lat), parseFloat(lon)),
      ])

      // Generate rekomendasi berdasarkan cuaca
      const recommendations = generateRecommendations(weather)

      return response.json({
        success: true,
        data: {
          weather,
          address,
          recommendations,
          timestamp: new Date().toISOString(),
        },
      })
    } catch (error) {
      // Error handling terpusat
      return response.serviceUnavailable({
        success: false,
        message: 'Gagal mengambil data dari external API',
        error: error.message,
      })
    }
  }
}
```

#### Frontend Call (`public/app.js`)

```javascript
async function loadEnvironmentData() {
  // 1. Dapatkan koordinat user
  const position = await getCurrentPosition()
  const { latitude, longitude } = position.coords

  // 2. Request ke backend (BUKAN langsung ke external API)
  const response = await fetch(
    `${API_BASE_URL}/external/environment?lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  // 3. Render UI dengan data gabungan
  renderWeatherCard(data.weather)
  renderLocationInfo(data.address)
  renderRecommendations(data.recommendations)
}
```

---

### ⚙️ Konfigurasi Environment

```env
# ═══════════════════════════════════════════════════════════════
# 🌤️ OPENWEATHERMAP API
# Daftar di: https://openweathermap.org/api
# ═══════════════════════════════════════════════════════════════
OPENWEATHER_API_KEY=your-api-key-here

# ═══════════════════════════════════════════════════════════════
# 🗺️ NOMINATIM API (OpenStreetMap)
# Tidak perlu API Key, tapi WAJIB User-Agent
# Format: AppName/Version (ContactEmail)
# ═══════════════════════════════════════════════════════════════
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
NOMINATIM_USER_AGENT=GeoWaste/1.0 (admin@geowaste.com)
NOMINATIM_EMAIL=admin@geowaste.com
```

---

### 📊 Rate Limits & Best Practices

| API                | Rate Limit   | Best Practice                  |
| :----------------- | :----------- | :----------------------------- |
| **OpenWeatherMap** | 60 calls/min | Cache response selama 10 menit |
| **Nominatim**      | 1 req/second | Tambahkan delay antar request  |

#### Handling Rate Limits

```typescript
// Contoh implementasi delay untuk Nominatim
async function reverseGeocodeWithDelay(lat: number, lon: number) {
  // Tunggu 1 detik sebelum request
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return reverseGeocode(lat, lon)
}
```

---

### ✅ Checklist Integrasi

- [x] API Key disimpan di `.env` (tidak hardcode)
- [x] Backend sebagai proxy (API key tidak terekspos)
- [x] Error handling untuk API failure
- [x] Response di-transform sesuai kebutuhan
- [x] User-Agent header untuk Nominatim
- [x] Parallel request dengan `Promise.all()`
- [x] Validasi input sebelum request

---

## 🔐 Penerapan Mekanisme Keamanan API

### 📌 Overview Keamanan

GeoWaste menerapkan **multiple layers of security** untuk melindungi API dari akses tidak sah dan serangan berbahaya:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   🌐 Request Masuk                                                          │
│         │                                                                   │
│         ▼                                                                   │
│   ┌─────────────┐                                                           │
│   │    CORS     │ ◄── Layer 1: Hanya izinkan origin tertentu               │
│   └──────┬──────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌─────────────┐                                                           │
│   │   JWT Auth  │ ◄── Layer 2: Verifikasi token autentikasi                │
│   └──────┬──────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌─────────────┐                                                           │
│   │ Role Check  │ ◄── Layer 3: Periksa hak akses berdasarkan role          │
│   └──────┬──────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌─────────────┐                                                           │
│   │  Validate   │ ◄── Layer 4: Validasi input data                         │
│   └──────┬──────┘                                                           │
│          │                                                                   │
│          ▼                                                                   │
│   ┌─────────────┐                                                           │
│   │ Controller  │ ◄── Proses request yang sudah terverifikasi              │
│   └─────────────┘                                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 🛡️ Mekanisme Keamanan yang Diterapkan

#### 1️⃣ JWT Authentication (JSON Web Token)

**Apa itu JWT?**
JWT adalah standar terbuka (RFC 7519) untuk mentransmisikan informasi secara aman antar pihak sebagai objek JSON yang di-sign secara digital.

**Struktur JWT:**

```
┌─────────────────────────────────────────────────────────────┐
│                        JWT TOKEN                            │
├─────────────────────────────────────────────────────────────┤
│  HEADER      │    PAYLOAD       │      SIGNATURE            │
│  (Algorithm) │    (Data User)   │      (Verification)       │
├──────────────┼──────────────────┼───────────────────────────┤
│  {           │  {               │                           │
│   "alg":     │   "userId": "x", │   HMACSHA256(             │
│    "HS256",  │   "email": "y",  │     base64(header) + "."  │
│   "typ":     │   "role": "z",   │     + base64(payload),    │
│    "JWT"     │   "exp": 123456  │     secret                │
│  }           │  }               │   )                       │
└──────────────┴──────────────────┴───────────────────────────┘
         │              │                    │
         └──────────────┴────────────────────┘
                        │
                  xxxxx.yyyyy.zzzzz
                  (Base64 encoded)
```

**Implementasi di GeoWaste:**

```typescript
// app/middleware/Auth.ts
import jwt from 'jsonwebtoken'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/users'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    // 1. Ambil token dari header Authorization
    const authHeader = request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.unauthorized({
        success: false,
        message: 'Token tidak ditemukan',
      })
    }

    const token = authHeader.split(' ')[1]

    try {
      // 2. Verifikasi token dengan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string
        email: string
        role: string
      }

      // 3. Cari user di database
      const user = await User.findById(decoded.userId)

      if (!user) {
        return response.unauthorized({
          success: false,
          message: 'User tidak ditemukan',
        })
      }

      // 4. Attach user ke context untuk digunakan di controller
      ctx.user = user

      // 5. Lanjut ke middleware/controller berikutnya
      await next()
    } catch (error) {
      return response.unauthorized({
        success: false,
        message: 'Token tidak valid atau sudah expired',
      })
    }
  }
}
```

**Flow Autentikasi:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        AUTHENTICATION FLOW                               │
└──────────────────────────────────────────────────────────────────────────┘

  📱 CLIENT                                              🖥️ SERVER
      │                                                       │
      │  1. POST /api/auth/login                              │
      │     { email, password }                               │
      │──────────────────────────────────────────────────────▶│
      │                                                       │
      │                                    2. Verify password │
      │                                    3. Generate JWT    │
      │                                                       │
      │  4. Response { token: "eyJhbG..." }                   │
      │◀──────────────────────────────────────────────────────│
      │                                                       │
      │  5. Simpan token di localStorage                      │
      │                                                       │
      │  6. GET /api/waste-points                             │
      │     Header: Authorization: Bearer eyJhbG...           │
      │──────────────────────────────────────────────────────▶│
      │                                                       │
      │                               7. Verify JWT           │
      │                               8. Decode user info     │
      │                               9. Process request      │
      │                                                       │
      │  10. Response { data: [...] }                         │
      │◀──────────────────────────────────────────────────────│
```

---

#### 2️⃣ Role-Based Access Control (RBAC)

**Definisi Role:**

| Role           | Deskripsi            | Level Akses                   |
| :------------- | :------------------- | :---------------------------- |
| 👑 **Admin**   | Administrator sistem | Full access ke semua fitur    |
| 👷 **Petugas** | Petugas lapangan     | Kelola titik limbah & laporan |
| 👤 **Warga**   | Pengguna biasa       | Buat laporan, lihat data      |

**Matriks Hak Akses:**

| Endpoint                    | Admin | Petugas | Warga |
| :-------------------------- | :---: | :-----: | :---: |
| `GET /waste-points`         |  ✅   |   ✅    |  ✅   |
| `POST /waste-points`        |  ✅   |   ✅    |  ❌   |
| `PUT /waste-points/:id`     |  ✅   |   ✅    |  ❌   |
| `DELETE /waste-points/:id`  |  ✅   |   ❌    |  ❌   |
| `GET /reports`              |  ✅   |   ✅    |  ❌   |
| `POST /reports`             |  ✅   |   ✅    |  ✅   |
| `PATCH /reports/:id/status` |  ✅   |   ✅    |  ❌   |
| `GET /users`                |  ✅   |   ❌    |  ❌   |
| `DELETE /users/:id`         |  ✅   |   ❌    |  ❌   |

**Implementasi Role Middleware:**

```typescript
// app/middleware/Role.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  // Factory function untuk membuat middleware dengan roles tertentu
  static authorize(allowedRoles: string[]) {
    return async (ctx: HttpContext, next: NextFn) => {
      const { response } = ctx
      const user = ctx.user

      // Cek apakah user sudah login
      if (!user) {
        return response.unauthorized({
          success: false,
          message: 'Silakan login terlebih dahulu',
        })
      }

      // Cek apakah role user termasuk dalam allowed roles
      if (!allowedRoles.includes(user.role)) {
        return response.forbidden({
          success: false,
          message: `Akses ditolak. Role '${user.role}' tidak memiliki izin untuk aksi ini.`,
          required_roles: allowedRoles,
        })
      }

      await next()
    }
  }
}
```

**Penggunaan di Routes:**

```typescript
// start/routes.ts
import router from '@adonisjs/core/services/router'
import AuthMiddleware from '#middleware/Auth'
import RoleMiddleware from '#middleware/Role'

// Public routes (tanpa auth)
router.post('/api/auth/login', [AuthController, 'login'])
router.post('/api/auth/register', [AuthController, 'register'])

// Protected routes (perlu auth)
router
  .group(() => {
    // Semua role bisa akses
    router.get('/waste-points', [WastePointsController, 'index'])
    router.post('/reports', [ReportsController, 'store'])

    // Admin & Petugas only
    router
      .group(() => {
        router.post('/waste-points', [WastePointsController, 'store'])
        router.put('/waste-points/:id', [WastePointsController, 'update'])
        router.patch('/reports/:id/status', [ReportsController, 'updateStatus'])
      })
      .middleware([RoleMiddleware.authorize(['admin', 'petugas'])])

    // Admin only
    router
      .group(() => {
        router.delete('/waste-points/:id', [WastePointsController, 'destroy'])
        router.get('/users', [UsersController, 'index'])
        router.delete('/users/:id', [UsersController, 'destroy'])
      })
      .middleware([RoleMiddleware.authorize(['admin'])])
  })
  .middleware([AuthMiddleware])
```

---

#### 3️⃣ Password Hashing dengan Bcrypt

**Mengapa Hashing?**

- Password TIDAK BOLEH disimpan dalam bentuk plain text
- Jika database bocor, password tetap aman
- Bcrypt menggunakan salt untuk mencegah rainbow table attack

**Implementasi:**

```typescript
// app/controllers/AuthController.ts
import bcrypt from 'bcryptjs'

// REGISTER - Hash password sebelum simpan
async register({ request, response }: HttpContext) {
  const { name, email, password, role } = request.body()

  // Hash password dengan cost factor 10
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,  // Simpan hash, BUKAN plain text
    role: role || 'warga'
  })

  return response.created({
    success: true,
    message: 'Registrasi berhasil'
  })
}

// LOGIN - Bandingkan password dengan hash
async login({ request, response }: HttpContext) {
  const { email, password } = request.body()

  const user = await User.findOne({ email })

  if (!user) {
    return response.unauthorized({ message: 'Email tidak ditemukan' })
  }

  // Bandingkan plain password dengan hash di database
  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return response.unauthorized({ message: 'Password salah' })
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return response.json({ success: true, token })
}
```

**Perbandingan Storage:**

```
❌ TIDAK AMAN (Plain Text)
┌─────────────────────────────────────┐
│ Database Users                      │
├──────────────┬──────────────────────┤
│ email        │ password             │
├──────────────┼──────────────────────┤
│ john@mail.com│ password123          │  ◄── Jika bocor, langsung ketahuan!
│ jane@mail.com│ qwerty456            │
└──────────────┴──────────────────────┘

✅ AMAN (Bcrypt Hash)
┌─────────────────────────────────────────────────────────────────┐
│ Database Users                                                  │
├──────────────┬──────────────────────────────────────────────────┤
│ email        │ password                                         │
├──────────────┼──────────────────────────────────────────────────┤
│ john@mail.com│ $2a$10$X7UrE5Kx8VZqJhRzPmYK1u.Hw8HJnL9xYz...    │
│ jane@mail.com│ $2a$10$N8PqF3Hy9WArKiTzQnXM2v.Jx9MKpL0aWb...    │
└──────────────┴──────────────────────────────────────────────────┘
                      │
                      └── Tidak bisa di-reverse!
```

---

#### 4️⃣ CORS (Cross-Origin Resource Sharing)

**Apa itu CORS?**
CORS adalah mekanisme keamanan browser yang membatasi request dari origin berbeda.

**Konfigurasi di GeoWaste:**

```typescript
// config/cors.ts
import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: true,

  // Origin yang diizinkan
  origin: [
    'http://localhost:5500', // Live Server
    'http://127.0.0.1:5500', // Live Server alt
    'http://localhost:3333', // Same origin
  ],

  // Methods yang diizinkan
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

  // Headers yang diizinkan
  headers: true,

  // Izinkan credentials (cookies, auth headers)
  credentials: true,

  // Cache preflight request
  maxAge: 90,
})
```

**Ilustrasi CORS:**

```
✅ ALLOWED (Same Origin)
┌──────────────────┐         ┌──────────────────┐
│ localhost:3333   │ ──────▶ │ localhost:3333   │
│ (Frontend)       │         │ (API)            │
└──────────────────┘         └──────────────────┘

✅ ALLOWED (Whitelisted Origin)
┌──────────────────┐         ┌──────────────────┐
│ localhost:5500   │ ──────▶ │ localhost:3333   │
│ (Live Server)    │  CORS   │ (API)            │
└──────────────────┘  OK     └──────────────────┘

❌ BLOCKED (Unknown Origin)
┌──────────────────┐         ┌──────────────────┐
│ evil-site.com    │ ──X───▶ │ localhost:3333   │
│ (Attacker)       │  CORS   │ (API)            │
└──────────────────┘ BLOCKED └──────────────────┘
```

---

#### 5️⃣ Environment Variables untuk Secrets

**Best Practice:**

- Semua secrets disimpan di `.env`
- File `.env` TIDAK di-commit ke Git
- Gunakan `.env.example` sebagai template

```env
# .env (TIDAK di-commit)
JWT_SECRET=super-secret-key-yang-sangat-panjang-dan-random
OPENWEATHER_API_KEY=abc123def456
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/db

# .env.example (di-commit, tanpa nilai sensitif)
JWT_SECRET=your-jwt-secret-here
OPENWEATHER_API_KEY=your-api-key-here
MONGO_URI=your-mongodb-uri-here
```

**Konfigurasi .gitignore:**

```gitignore
# .gitignore
.env
.env.local
.env.production
```

---

#### 6️⃣ Input Validation

**Mengapa Validasi Penting?**

- Mencegah SQL/NoSQL Injection
- Mencegah XSS (Cross-Site Scripting)
- Memastikan data sesuai format yang diharapkan

**Implementasi:**

```typescript
// app/controllers/WastePointsController.ts
async store({ request, response }: HttpContext) {
  const { nama, deskripsi, latitude, longitude, jenis } = request.body()

  // Validasi manual
  const errors: string[] = []

  if (!nama || typeof nama !== 'string' || nama.trim().length < 3) {
    errors.push('Nama harus minimal 3 karakter')
  }

  if (!latitude || isNaN(parseFloat(latitude))) {
    errors.push('Latitude harus berupa angka valid')
  }

  if (!longitude || isNaN(parseFloat(longitude))) {
    errors.push('Longitude harus berupa angka valid')
  }

  const validJenis = ['organik', 'anorganik', 'B3', 'campuran']
  if (!jenis || !validJenis.includes(jenis)) {
    errors.push(`Jenis harus salah satu dari: ${validJenis.join(', ')}`)
  }

  if (errors.length > 0) {
    return response.badRequest({
      success: false,
      message: 'Validasi gagal',
      errors
    })
  }

  // Lanjut proses jika validasi berhasil
  const wastePoint = await WastePoint.create({ ... })
}
```

---

### 📊 Ringkasan Mekanisme Keamanan

| No  | Mekanisme                 | Fungsi                        |    Status     |
| :-: | :------------------------ | :---------------------------- | :-----------: |
|  1  | **JWT Authentication**    | Verifikasi identitas user     |   ✅ Aktif    |
|  2  | **Role-Based Access**     | Batasi akses berdasarkan role |   ✅ Aktif    |
|  3  | **Bcrypt Hashing**        | Enkripsi password             |   ✅ Aktif    |
|  4  | **CORS**                  | Batasi origin request         |   ✅ Aktif    |
|  5  | **Environment Variables** | Sembunyikan secrets           |   ✅ Aktif    |
|  6  | **Input Validation**      | Cegah injection attack        |   ✅ Aktif    |
|  7  | **HTTPS**                 | Enkripsi data in transit      | ⏳ Production |

---

### 🔒 Security Headers (Rekomendasi Production)

```typescript
// Tambahkan di middleware untuk production
response.header('X-Content-Type-Options', 'nosniff')
response.header('X-Frame-Options', 'DENY')
response.header('X-XSS-Protection', '1; mode=block')
response.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
```

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

|                             Preview                             | Nama             | Hex Code  | Penggunaan         |
| :-------------------------------------------------------------: | :--------------- | :-------- | :----------------- |
| ![#2d6a4f](https://via.placeholder.com/30/2d6a4f/2d6a4f?text=+) | **Forest Green** | `#2d6a4f` | Primary, Buttons   |
| ![#52796f](https://via.placeholder.com/30/52796f/52796f?text=+) | **Sage Green**   | `#52796f` | Secondary, Headers |
| ![#8b7355](https://via.placeholder.com/30/8b7355/8b7355?text=+) | **Earth Brown**  | `#8b7355` | Accent, Borders    |
| ![#74c0fc](https://via.placeholder.com/30/74c0fc/74c0fc?text=+) | **Sky Blue**     | `#74c0fc` | Info, Links        |
| ![#69db7c](https://via.placeholder.com/30/69db7c/69db7c?text=+) | **Leaf Green**   | `#69db7c` | Success, Completed |

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
