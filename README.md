# 🌿 GeoWaste - Sistem Informasi Geografis Pengelolaan Limbah

<p align="center">
  <img src="https://img.shields.io/badge/AdonisJS-v6-5A45FF?style=for-the-badge&logo=adonisjs&logoColor=white" alt="AdonisJS">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet">
</p>

<p align="center">
  Aplikasi web untuk pengelolaan dan monitoring titik-titik limbah secara geografis dengan integrasi peta interaktif dan analisis lingkungan real-time.
</p>

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Arsitektur](#-arsitektur)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [API Documentation](#-api-documentation)
- [Screenshot](#-screenshot)
- [Kontributor](#-kontributor)

---

## ✨ Fitur

### 🗺️ Peta Interaktif
- Visualisasi titik limbah menggunakan **Leaflet.js**
- Marker berwarna berdasarkan status (Baru, Ditinjau, Selesai)
- Popup informasi detail untuk setiap titik

### 📍 Manajemen Titik Limbah
- CRUD titik limbah dengan koordinat presisi tinggi
- Kategorisasi jenis limbah (Organik, Anorganik, B3, Campuran)
- Tracking status penanganan

### 📊 Laporan & Monitoring
- Sistem pelaporan dari warga
- Dashboard statistik real-time
- Filter dan pencarian data

### 🌡️ Analisis Lingkungan
- Integrasi **OpenWeatherMap API** untuk data cuaca real-time
- Integrasi **Nominatim API** untuk reverse geocoding
- Rekomendasi berdasarkan kondisi cuaca

### 👥 Multi-Role Access
- **Admin**: Akses penuh ke semua fitur
- **Petugas**: Kelola titik limbah dan laporan
- **Warga**: Buat laporan dan lihat informasi

### 🔐 Keamanan
- Autentikasi JWT
- Role-based authorization
- Password hashing dengan bcrypt

---

## 🛠️ Tech Stack

### Backend
| Teknologi | Deskripsi |
|-----------|-----------|
| **AdonisJS v6** | Framework Node.js dengan TypeScript |
| **MongoDB** | Database NoSQL dengan Mongoose ODM |
| **JWT** | JSON Web Token untuk autentikasi |
| **Axios** | HTTP client untuk external API |

### Frontend
| Teknologi | Deskripsi |
|-----------|-----------|
| **Vanilla JS** | JavaScript murni tanpa framework |
| **Leaflet.js** | Library peta interaktif |
| **CSS3** | Styling dengan tema Nature/Forest |

### External APIs
| API | Fungsi |
|-----|--------|
| **OpenWeatherMap** | Data cuaca real-time |
| **Nominatim (OSM)** | Reverse geocoding koordinat ke alamat |

---

## 🏗️ Arsitektur

```
GeoWaste/
├── app/
│   ├── controllers/          # Request handlers
│   │   ├── AuthController.ts
│   │   ├── ExternalController.ts
│   │   ├── ReportsController.ts
│   │   ├── WastePointsController.ts
│   │   └── users_controller.ts
│   ├── middleware/           # Auth & role middleware
│   │   ├── Auth.ts
│   │   └── Role.ts
│   ├── models/               # Mongoose schemas
│   │   ├── Report.ts
│   │   ├── users.ts
│   │   └── WastePoint.ts
│   └── Services/             # External API services
│       └── ExternalEnvService.ts
├── config/                   # App configurations
│   └── Mongo.ts
├── public/                   # Frontend assets
│   ├── app.html              # Main HTML
│   ├── app.js                # Frontend logic
│   ├── style.css             # Styling
│   ├── docs.html             # API documentation UI
│   └── swagger.json          # OpenAPI specification
├── start/
│   ├── routes.ts             # API routes
│   └── env.ts                # Environment validation
└── .env                      # Environment variables
```

---

## 🚀 Instalasi

### Prasyarat
- Node.js v18+ 
- MongoDB (local atau Atlas)
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/Sento2/GeoWaste.git
   cd GeoWaste
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   ```

4. **Konfigurasi `.env`**
   ```env
   # App
   TZ=UTC
   PORT=3333
   HOST=localhost
   LOG_LEVEL=info
   APP_KEY=your-random-app-key
   NODE_ENV=development

   # MongoDB
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/geowaste

   # JWT
   JWT_SECRET=your-jwt-secret-key

   # OpenWeatherMap
   OPENWEATHER_API_KEY=your-openweather-api-key

   # Nominatim
   NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
   NOMINATIM_USER_AGENT=GeoWaste/1.0
   NOMINATIM_EMAIL=your-email@example.com
   ```

5. **Jalankan aplikasi**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

6. **Akses aplikasi**
   - Frontend: `http://localhost:3333/app.html`
   - API Docs: `http://localhost:3333/docs.html`

---

## ⚙️ Konfigurasi

### Environment Variables

| Variable | Deskripsi | Required |
|----------|-----------|----------|
| `PORT` | Port server | Ya |
| `MONGO_URI` | MongoDB connection string | Ya |
| `JWT_SECRET` | Secret key untuk JWT | Ya |
| `OPENWEATHER_API_KEY` | API key OpenWeatherMap | Ya |
| `NOMINATIM_BASE_URL` | Base URL Nominatim API | Ya |
| `NOMINATIM_USER_AGENT` | User agent untuk Nominatim | Ya |
| `NOMINATIM_EMAIL` | Email untuk Nominatim | Ya |

### Default Admin Account
Setelah instalasi, buat admin pertama via API atau MongoDB:
```json
{
  "name": "Admin",
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

### Endpoints

#### Authentication
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/register` | Registrasi user baru |
| POST | `/api/auth/login` | Login dan dapatkan token |
| GET | `/api/auth/me` | Info user yang login |

#### Waste Points
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/waste-points` | List semua titik limbah |
| POST | `/api/waste-points` | Tambah titik baru |
| GET | `/api/waste-points/:id` | Detail titik limbah |
| PUT | `/api/waste-points/:id` | Update titik limbah |
| DELETE | `/api/waste-points/:id` | Hapus titik limbah |

#### Reports
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/reports` | List semua laporan |
| POST | `/api/reports` | Buat laporan baru |
| PATCH | `/api/reports/:id/status` | Update status laporan |

#### Users (Admin only)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/users` | List semua user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Hapus user |

#### External APIs
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/external/reverse-geocode` | Reverse geocoding |
| GET | `/api/external/weather` | Data cuaca |
| GET | `/api/external/environment` | Analisis lingkungan |

📖 **Dokumentasi lengkap**: Buka `/docs.html` untuk Swagger UI

---

## 📸 Screenshot

### Dashboard
Dashboard dengan statistik real-time, grafik status, dan laporan terbaru.

### Peta Interaktif
Visualisasi titik limbah dengan marker berwarna dan popup informasi.

### Analisis Lingkungan
Informasi cuaca dan rekomendasi pengelolaan limbah berdasarkan kondisi.

---

## 🎨 Tema Warna

Aplikasi menggunakan tema **Nature/Forest** dengan palette:

| Warna | Hex | Penggunaan |
|-------|-----|------------|
| 🌲 Forest Green | `#2d6a4f` | Primary |
| 🌿 Sage Green | `#52796f` | Secondary |
| 🟤 Earth Brown | `#8b7355` | Accent |
| 🌊 Sky Blue | `#74c0fc` | Info |
| 🍃 Leaf Green | `#69db7c` | Success |

---

## 👥 Kontributor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Sento2">
        <img src="https://github.com/Sento2.png" width="100px;" alt=""/>
        <br />
        <sub><b>Sento2</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 📄 Lisensi

Project ini dibuat untuk keperluan **Tugas Besar** mata kuliah.

---

## 🙏 Acknowledgments

- [AdonisJS](https://adonisjs.com/) - The Node.js Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Leaflet](https://leafletjs.com/) - Interactive Maps
- [OpenWeatherMap](https://openweathermap.org/) - Weather API
- [OpenStreetMap/Nominatim](https://nominatim.org/) - Geocoding

---

<p align="center">
  Made with 💚 for a greener environment
</p>
