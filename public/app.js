// ============= CONFIG =============
const API_BASE_URL = 'http://localhost:49684'
let currentUser = null
let currentToken = null
let wastePointsMap = null
let mapMarkers = []

// ============= INIT =============
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token && user) {
    currentToken = token
    currentUser = JSON.parse(user)
    showMainApp()
  }

  setupEventListeners()
})

function setupEventListeners() {
  // Auth
  document.getElementById('loginForm').addEventListener('submit', handleLogin)
  document.getElementById('registerForm').addEventListener('submit', handleRegister)
  document.getElementById('logoutBtn').addEventListener('click', handleLogout)
  document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault()
    toggleAuthForm()
  })
  document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault()
    toggleAuthForm()
  })

  // Navigation
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => navigateTo(e.target.dataset.page))
  })

  // Waste Points
  document.getElementById('addWastePointBtn').addEventListener('click', openWastePointModal)
  document.getElementById('closeWpModal').addEventListener('click', closeWastePointModal)
  document.getElementById('cancelWpModal').addEventListener('click', closeWastePointModal)
  document.getElementById('wastePointForm').addEventListener('submit', handleSaveWastePoint)
  document.getElementById('wasteTypeFilter').addEventListener('change', loadWastePoints)
  document.getElementById('wasteStatusFilter').addEventListener('change', loadWastePoints)

  // Reports
  document.getElementById('addReportBtn').addEventListener('click', openReportModal)
  document.getElementById('closeReportModal').addEventListener('click', closeReportModal)
  document.getElementById('cancelReportModal').addEventListener('click', closeReportModal)
  document.getElementById('reportForm').addEventListener('submit', handleSaveReport)
  document.getElementById('reportStatusFilter').addEventListener('change', loadReports)

  // Users
  document.getElementById('addUserBtn').addEventListener('click', openUserModal)
  document.getElementById('closeUserModal').addEventListener('click', closeUserModal)
  document.getElementById('cancelUserModal').addEventListener('click', closeUserModal)
  document.getElementById('userForm').addEventListener('submit', handleSaveUser)

  // Environment
  document.getElementById('envForm').addEventListener('submit', handleEnvAnalysis)
}

// ============= AUTH =============
async function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value

  showLoading(true)
  try {
    const res = await apiCall('/api/v1/login', 'POST', { email, password })
    if (res.token && res.user) {
      currentToken = res.token
      currentUser = res.user
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      showMainApp()
      showNotification('Login berhasil!', 'success')
    }
  } catch (err) {
    document.getElementById('loginError').textContent = err.message
    document.getElementById('loginError').style.display = 'block'
  } finally {
    showLoading(false)
  }
}

async function handleRegister(e) {
  e.preventDefault()
  const name = document.getElementById('registerName').value
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerPassword').value

  showLoading(true)
  try {
    const res = await apiCall('/api/v1/register', 'POST', { name, email, password, role: 'warga' })
    if (res.token && res.user) {
      currentToken = res.token
      currentUser = res.user
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      showMainApp()
      showNotification('Registrasi berhasil!', 'success')
    }
  } catch (err) {
    document.getElementById('loginError').textContent = err.message
    document.getElementById('loginError').style.display = 'block'
  } finally {
    showLoading(false)
  }
}

function handleLogout() {
  currentUser = null
  currentToken = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  location.reload()
}

function toggleAuthForm() {
  const loginBox = document.getElementById('loginBox')
  const registerBox = document.getElementById('registerBox')
  loginBox.style.display = loginBox.style.display === 'none' ? 'block' : 'none'
  registerBox.style.display = registerBox.style.display === 'none' ? 'block' : 'none'
  document.getElementById('loginError').style.display = 'none'
}

// ============= UI =============
function showMainApp() {
  document.getElementById('loginPage').style.display = 'none'
  document.getElementById('mainApp').style.display = 'block'
  document.getElementById('userName').textContent = currentUser.name
  document.getElementById('userRole').textContent = currentUser.role.toUpperCase()

  // Admin only - Menu User
  if (currentUser.role === 'admin') {
    document.querySelector('.admin-only').style.display = 'block'
  }

  // Staff only (admin & petugas) - Tombol tambah titik limbah
  if (['admin', 'petugas'].includes(currentUser.role)) {
    document.querySelectorAll('.staff-only').forEach((el) => (el.style.display = 'inline-block'))
  }

  // Show dashboard by default
  navigateTo('dashboard')
}

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page-content').forEach((p) => {
    p.classList.remove('active')
    p.style.display = 'none'
  })

  // Remove active from nav buttons
  document.querySelectorAll('.nav-btn').forEach((btn) => btn.classList.remove('active'))

  // Show selected page
  document.querySelector(`[data-page="${page}"]`).classList.add('active')
  const pageEl = document.getElementById(page)
  pageEl.classList.add('active')
  pageEl.style.display = 'block'

  switch (page) {
    case 'dashboard':
      loadDashboard()
      break
    case 'wastepoints':
      loadWastePoints()
      // Refresh map size when navigating to wastepoints page
      setTimeout(() => {
        if (wastePointsMap) {
          wastePointsMap.invalidateSize()
        }
      }, 200)
      break
    case 'reports':
      loadReports()
      break
    case 'users':
      loadUsers()
      break
  }
}

// ============= DASHBOARD =============
async function loadDashboard() {
  try {
    const [wpRes, reportsRes] = await Promise.all([
      apiCall('/api/v1/wastepoints'),
      apiCall('/api/v1/reports'),
    ])

    document.getElementById('totalWastePoints').textContent = wpRes.data?.length || 0
    document.getElementById('totalReports').textContent = reportsRes.data?.length || 0

    // Try to load users count (admin only)
    try {
      const usersRes = await apiCall('/api/v1/users')
      document.getElementById('totalUsers').textContent = usersRes.data?.length || 0
    } catch {
      document.getElementById('totalUsers').textContent = '-'
    }

    // Recent reports
    const recent = (reportsRes.data || []).slice(0, 5)
    document.getElementById('recentReports').innerHTML =
      recent.length > 0
        ? `<table>
                <thead><tr><th>ID</th><th>Deskripsi</th><th>Status</th><th>Tanggal</th></tr></thead>
                <tbody>${recent
                  .map(
                    (r) => `
                    <tr>
                        <td>${r._id.substring(0, 8)}</td>
                        <td>${r.description || '-'}</td>
                        <td><span class="status-badge status-${r.status}">${r.status}</span></td>
                        <td>${new Date(r.reported_at).toLocaleDateString('id-ID')}</td>
                    </tr>
                `
                  )
                  .join('')}</tbody>
            </table>`
        : '<p class="empty-state">Tidak ada laporan</p>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

// ============= WASTE POINTS =============
async function loadWastePoints() {
  try {
    const res = await apiCall('/api/v1/wastepoints')
    let data = res.data || []

    const typeFilter = document.getElementById('wasteTypeFilter').value
    const statusFilter = document.getElementById('wasteStatusFilter').value
    if (typeFilter) data = data.filter((d) => d.waste_type === typeFilter)
    if (statusFilter) data = data.filter((d) => d.status === statusFilter)

    // Initialize or update map
    initWastePointsMap(data)

    const isStaff = ['admin', 'petugas'].includes(currentUser.role)
    const isAdmin = currentUser.role === 'admin'

    document.getElementById('wastePointsList').innerHTML =
      data.length > 0
        ? `<table>
                <thead><tr><th>Nama</th><th>Jenis</th><th>Status</th><th>Koordinat</th>${isStaff ? '<th>Aksi</th>' : ''}</tr></thead>
                <tbody>${data
                  .map(
                    (wp) => `
                    <tr>
                        <td>${wp.name}</td>
                        <td>${wp.waste_type}</td>
                        <td><span class="status-badge status-${wp.status}">${wp.status}</span></td>
                        <td>${wp.coordinates.join(', ')}</td>
                        ${
                          isStaff
                            ? `<td>
                            <div class="action-btns">
                                <button class="btn btn-primary" onclick="editWastePoint('${wp._id}')">Edit</button>
                                ${isAdmin ? `<button class="btn btn-danger" onclick="deleteWastePoint('${wp._id}')">Hapus</button>` : ''}
                            </div>
                        </td>`
                            : ''
                        }
                    </tr>
                `
                  )
                  .join('')}</tbody>
            </table>`
        : '<p class="empty-state">Tidak ada data titik limbah</p>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

// ============= MAP FUNCTIONS =============
function initWastePointsMap(wastePoints) {
  // Default center: Indonesia
  const defaultCenter = [-6.2088, 106.8456] // Jakarta
  const defaultZoom = 5

  // Initialize map if not already done
  if (!wastePointsMap) {
    wastePointsMap = L.map('wastePointsMap').setView(defaultCenter, defaultZoom)

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(wastePointsMap)
  }

  // Clear existing markers
  mapMarkers.forEach((marker) => marker.remove())
  mapMarkers = []

  // Add markers for each waste point
  wastePoints.forEach((wp) => {
    // Coordinates are stored as [longitude, latitude] (GeoJSON format)
    const lat = wp.coordinates[1]
    const lon = wp.coordinates[0]

    // Create custom icon based on status
    const markerColor = getStatusColor(wp.status)
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background-color: ${markerColor};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    })

    // Create marker with popup
    const marker = L.marker([lat, lon], { icon: customIcon }).addTo(wastePointsMap).bindPopup(`
        <div class="popup-title">${wp.name}</div>
        <div class="popup-content">
          <p><strong>Jenis:</strong> ${wp.waste_type}</p>
          <p><strong>Deskripsi:</strong> ${wp.description || '-'}</p>
          <p><strong>Koordinat:</strong> ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>
          <span class="popup-status ${wp.status}">${wp.status}</span>
        </div>
      `)

    mapMarkers.push(marker)
  })

  // Fit map to show all markers if there are any
  if (wastePoints.length > 0) {
    const group = new L.featureGroup(mapMarkers)
    wastePointsMap.fitBounds(group.getBounds().pad(0.1))
  }

  // Fix map size issue when switching tabs
  setTimeout(() => {
    wastePointsMap.invalidateSize()
  }, 100)
}

function getStatusColor(status) {
  switch (status) {
    case 'baru':
      return '#e74c3c'
    case 'ditinjau':
      return '#f39c12'
    case 'selesai':
      return '#27ae60'
    default:
      return '#3498db'
  }
}

function openWastePointModal() {
  document.getElementById('wastePointForm').reset()
  document.getElementById('wpId').value = ''
  document.getElementById('wastePointModalTitle').textContent = 'Tambah Titik Limbah'
  document.getElementById('wastePointModal').classList.add('active')
}

function closeWastePointModal() {
  document.getElementById('wastePointModal').classList.remove('active')
}

async function handleSaveWastePoint(e) {
  e.preventDefault()
  const id = document.getElementById('wpId').value
  const data = {
    name: document.getElementById('wpName').value,
    description: document.getElementById('wpDescription').value,
    waste_type: document.getElementById('wpType').value,
    coordinates: [
      parseFloat(document.getElementById('wpLon').value),
      parseFloat(document.getElementById('wpLat').value),
    ],
  }

  try {
    if (id) {
      await apiCall(`/api/v1/wastepoints/${id}`, 'PUT', data)
      showNotification('Titik limbah berhasil diupdate!', 'success')
    } else {
      await apiCall('/api/v1/wastepoints', 'POST', data)
      showNotification('Titik limbah berhasil ditambahkan!', 'success')
    }
    closeWastePointModal()
    loadWastePoints()
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function editWastePoint(id) {
  try {
    const res = await apiCall(`/api/v1/wastepoints`)
    const wp = res.data.find((w) => w._id === id)
    if (wp) {
      document.getElementById('wpId').value = wp._id
      document.getElementById('wpName').value = wp.name
      document.getElementById('wpDescription').value = wp.description || ''
      document.getElementById('wpType').value = wp.waste_type
      document.getElementById('wpLon').value = wp.coordinates[0]
      document.getElementById('wpLat').value = wp.coordinates[1]
      document.getElementById('wastePointModalTitle').textContent = 'Edit Titik Limbah'
      document.getElementById('wastePointModal').classList.add('active')
    }
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function deleteWastePoint(id) {
  if (confirm('Yakin ingin menghapus titik limbah ini?')) {
    try {
      await apiCall(`/api/v1/wastepoints/${id}`, 'DELETE')
      showNotification('Titik limbah berhasil dihapus!', 'success')
      loadWastePoints()
    } catch (err) {
      showNotification(err.message, 'error')
    }
  }
}

// ============= REPORTS =============
async function loadReports() {
  try {
    const res = await apiCall('/api/v1/reports')
    let data = res.data || []

    const statusFilter = document.getElementById('reportStatusFilter').value
    if (statusFilter) data = data.filter((d) => d.status === statusFilter)

    const isStaff = ['admin', 'petugas'].includes(currentUser.role)
    const isAdmin = currentUser.role === 'admin'

    document.getElementById('reportsList').innerHTML =
      data.length > 0
        ? `<table>
                <thead><tr><th>Deskripsi</th><th>Status</th><th>Tanggal</th>${isStaff ? '<th>Aksi</th>' : ''}</tr></thead>
                <tbody>${data
                  .map(
                    (r) => `
                    <tr>
                        <td>${r.description || '-'}</td>
                        <td><span class="status-badge status-${r.status}">${r.status}</span></td>
                        <td>${new Date(r.reported_at).toLocaleDateString('id-ID')}</td>
                        ${
                          isStaff
                            ? `<td>
                            <div class="action-btns">
                                <button class="btn btn-secondary" onclick="updateReportStatus('${r._id}')">Update Status</button>
                                ${isAdmin ? `<button class="btn btn-danger" onclick="deleteReport('${r._id}')">Hapus</button>` : ''}
                            </div>
                        </td>`
                            : ''
                        }
                    </tr>
                `
                  )
                  .join('')}</tbody>
            </table>`
        : '<p class="empty-state">Tidak ada laporan</p>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function openReportModal() {
  document.getElementById('reportForm').reset()
  try {
    const res = await apiCall('/api/v1/wastepoints')
    const select = document.getElementById('reportSiteId')
    select.innerHTML =
      '<option value="">Pilih lokasi</option>' +
      (res.data || []).map((wp) => `<option value="${wp._id}">${wp.name}</option>`).join('')
  } catch (err) {
    showNotification(err.message, 'error')
  }
  document.getElementById('reportModal').classList.add('active')
}

function closeReportModal() {
  document.getElementById('reportModal').classList.remove('active')
}

async function handleSaveReport(e) {
  e.preventDefault()
  try {
    await apiCall('/api/v1/reports', 'POST', {
      site_id: document.getElementById('reportSiteId').value,
      description: document.getElementById('reportDescription').value,
      photo_url: document.getElementById('reportPhoto').value || null,
    })
    showNotification('Laporan berhasil dikirim!', 'success')
    closeReportModal()
    loadReports()
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function updateReportStatus(id) {
  const newStatus = prompt('Masukkan status baru (baru/diproses/selesai):')
  if (!newStatus) return
  try {
    await apiCall(`/api/v1/reports/${id}/status`, 'PATCH', { status: newStatus })
    showNotification('Status berhasil diupdate!', 'success')
    loadReports()
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function deleteReport(id) {
  if (!confirm('Yakin ingin menghapus laporan ini?')) return
  try {
    await apiCall(`/api/v1/reports/${id}`, 'DELETE')
    showNotification('Laporan berhasil dihapus!', 'success')
    loadReports()
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

// ============= USERS =============
async function loadUsers() {
  try {
    const res = await apiCall('/api/v1/users')
    const data = res.data || []

    document.getElementById('usersList').innerHTML =
      data.length > 0
        ? `<table>
                <thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Aksi</th></tr></thead>
                <tbody>${data
                  .map(
                    (u) => `
                    <tr>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td><span class="status-badge">${u.role}</span></td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-danger" onclick="deleteUser('${u._id}')">Hapus</button>
                            </div>
                        </td>
                    </tr>
                `
                  )
                  .join('')}</tbody>
            </table>`
        : '<p class="empty-state">Tidak ada pengguna</p>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

function openUserModal() {
  document.getElementById('userForm').reset()
  document.getElementById('userModal').classList.add('active')
}

function closeUserModal() {
  document.getElementById('userModal').classList.remove('active')
}

async function handleSaveUser(e) {
  e.preventDefault()
  try {
    await apiCall('/api/v1/users', 'POST', {
      name: document.getElementById('userNameInput').value,
      email: document.getElementById('userEmailInput').value,
      password: document.getElementById('userPasswordInput').value,
      role: document.getElementById('userRoleSelect').value,
    })
    showNotification('User berhasil ditambahkan!', 'success')
    closeUserModal()
    loadUsers()
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

async function deleteUser(id) {
  if (confirm('Yakin ingin menghapus user ini?')) {
    try {
      await apiCall(`/api/v1/users/${id}`, 'DELETE')
      showNotification('User berhasil dihapus!', 'success')
      loadUsers()
    } catch (err) {
      showNotification(err.message, 'error')
    }
  }
}

// ============= ENVIRONMENT =============
async function handleEnvAnalysis(e) {
  e.preventDefault()
  const lat = document.getElementById('envLat').value
  const lon = document.getElementById('envLon').value

  showLoading(true)
  try {
    const res = await apiCall(`/external/env-summary?lat=${lat}&lon=${lon}`)
    if (res.data) {
      const data = res.data
      const addr = data.address || {}
      const weather = data.weather || {}

      // Icon cuaca dari OpenWeatherMap
      const weatherIcon = weather.icon
        ? `<img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="weather" style="width:50px;vertical-align:middle;">`
        : ''

      document.getElementById('envResultContent').innerHTML = `
        <div class="env-result-grid">
          <div class="env-section">
            <h4>📍 Lokasi</h4>
            <table class="env-table">
              <tr><td><strong>Alamat</strong></td><td>${addr.display_name || '-'}</td></tr>
              <tr><td><strong>Jalan</strong></td><td>${addr.road || '-'}</td></tr>
              <tr><td><strong>Kelurahan</strong></td><td>${addr.village || addr.suburb || '-'}</td></tr>
              <tr><td><strong>Kecamatan</strong></td><td>${addr.municipality || addr.county || '-'}</td></tr>
              <tr><td><strong>Kota</strong></td><td>${addr.region || addr.city || '-'}</td></tr>
              <tr><td><strong>Provinsi</strong></td><td>${addr.state || '-'}</td></tr>
              <tr><td><strong>Negara</strong></td><td>${addr.country || '-'}</td></tr>
              <tr><td><strong>Kode Pos</strong></td><td>${addr.postcode || '-'}</td></tr>
            </table>
          </div>
          
          <div class="env-section">
            <h4>🌤️ Cuaca ${weatherIcon}</h4>
            <table class="env-table">
              <tr><td><strong>Kondisi</strong></td><td style="text-transform:capitalize;">${weather.description || '-'}</td></tr>
              <tr><td><strong>Suhu</strong></td><td>${weather.temp ? weather.temp + '°C' : '-'}</td></tr>
              <tr><td><strong>Terasa Seperti</strong></td><td>${weather.feels_like ? weather.feels_like + '°C' : '-'}</td></tr>
              <tr><td><strong>Kelembaban</strong></td><td>${weather.humidity ? weather.humidity + '%' : '-'}</td></tr>
              <tr><td><strong>Kecepatan Angin</strong></td><td>${weather.wind_speed ? weather.wind_speed + ' m/s' : '-'}</td></tr>
            </table>
          </div>
          
          <div class="env-section coordinates">
            <h4>🗺️ Koordinat</h4>
            <p><strong>Latitude:</strong> ${data.lat}</p>
            <p><strong>Longitude:</strong> ${data.lon}</p>
          </div>
        </div>
      `
      document.getElementById('envResult').style.display = 'block'
    }
  } catch (err) {
    showNotification(err.message, 'error')
  } finally {
    showLoading(false)
  }
}

function formatKey(key) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatValue(val) {
  if (val === null || val === undefined) return '-'
  if (typeof val === 'object') return JSON.stringify(val, null, 2)
  return String(val)
}

// ============= API CALL =============
async function apiCall(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (currentToken) options.headers['Authorization'] = `Bearer ${currentToken}`
  if (data) options.body = JSON.stringify(data)

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  const resData = await response.json()
  if (!response.ok) throw new Error(resData.message || resData.error || 'Terjadi kesalahan')
  return resData
}

// ============= UTILITIES =============
function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'flex' : 'none'
}

function showNotification(msg, type = 'success') {
  const notif = document.getElementById('notification')
  notif.textContent = msg
  notif.className = `notification ${type}`
  notif.style.display = 'block'
  setTimeout(() => {
    notif.style.display = 'none'
  }, 3000)
}
