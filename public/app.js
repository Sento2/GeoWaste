// ============= CONFIG =============
const API_BASE_URL = 'http://localhost:3333'
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

  // Warga only - Tombol buat laporan
  if (currentUser.role === 'warga') {
    document.querySelectorAll('.warga-only').forEach((el) => (el.style.display = 'inline-block'))
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
    // Update welcome text
    document.getElementById('welcomeText').textContent =
      `Hai ${currentUser?.name || 'User'}! Ini adalah ringkasan aktivitas hari ini.`

    // Update date and time
    updateDateTime()
    setInterval(updateDateTime, 1000)

    const [wpRes, reportsRes] = await Promise.all([
      apiCall('/api/v1/wastepoints'),
      apiCall('/api/v1/reports'),
    ])

    const wastePoints = wpRes.data || []
    const reports = reportsRes.data || []

    document.getElementById('totalWastePoints').textContent = wastePoints.length
    document.getElementById('totalReports').textContent = reports.length

    // Count pending reports
    const pendingCount = reports.filter(
      (r) => r.status === 'diproses' || r.status === 'baru'
    ).length
    document.getElementById('pendingReports').textContent = `${pendingCount} pending`

    // Count today's activity
    const today = new Date().toDateString()
    const todayReports = reports.filter(
      (r) => new Date(r.reported_at).toDateString() === today
    ).length
    document.getElementById('todayActivity').textContent = todayReports

    // Try to load users count (admin only)
    try {
      const usersRes = await apiCall('/api/v1/users')
      document.getElementById('totalUsers').textContent = usersRes.data?.length || 0
    } catch {
      document.getElementById('totalUsers').textContent = '-'
    }

    // Waste type statistics
    const organikCount = wastePoints.filter((wp) => wp.waste_type === 'organik').length
    const anorganikCount = wastePoints.filter((wp) => wp.waste_type === 'anorganik').length
    const b3Count = wastePoints.filter((wp) => wp.waste_type === 'B3').length
    const campuranCount = wastePoints.filter((wp) => wp.waste_type === 'campuran').length

    document.getElementById('organikCount').textContent = organikCount
    document.getElementById('anorganikCount').textContent = anorganikCount
    document.getElementById('b3Count').textContent = b3Count
    document.getElementById('campuranCount').textContent = campuranCount

    // Status overview bar
    const baruCount = wastePoints.filter((wp) => wp.status === 'baru').length
    const ditinjauCount = wastePoints.filter((wp) => wp.status === 'ditinjau').length
    const selesaiCount = wastePoints.filter((wp) => wp.status === 'selesai').length
    const total = wastePoints.length || 1

    document.getElementById('baruBar').style.width = `${(baruCount / total) * 100}%`
    document.getElementById('ditinjauBar').style.width = `${(ditinjauCount / total) * 100}%`
    document.getElementById('selesaiBar').style.width = `${(selesaiCount / total) * 100}%`

    // Recent reports with new design
    const recent = reports.slice(0, 5)
    document.getElementById('recentReports').innerHTML =
      recent.length > 0
        ? `<div class="recent-reports-list">
            ${recent
              .map(
                (r, index) => `
              <div class="recent-report-item" style="animation-delay: ${index * 0.1}s">
                <div class="report-icon ${r.status}">📄</div>
                <div class="report-info">
                  <p class="report-desc">${r.description || 'Tidak ada deskripsi'}</p>
                  <span class="report-meta">
                    <span class="report-id">#${r._id.substring(0, 8)}</span>
                    <span class="report-date">${new Date(r.reported_at).toLocaleDateString('id-ID')}</span>
                  </span>
                </div>
                <span class="status-badge-new status-${r.status}">${r.status}</span>
              </div>
            `
              )
              .join('')}
          </div>`
        : '<p class="empty-state">Tidak ada laporan terbaru</p>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

function updateDateTime() {
  const now = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  document.getElementById('currentDate').textContent = now.toLocaleDateString('id-ID', options)
  document.getElementById('currentTime').textContent = now.toLocaleTimeString('id-ID')
}

// ============= WASTE POINTS =============
async function loadWastePoints() {
  try {
    const res = await apiCall('/api/v1/wastepoints')
    let allData = res.data || []
    let data = [...allData]

    const typeFilter = document.getElementById('wasteTypeFilter').value
    const statusFilter = document.getElementById('wasteStatusFilter').value
    if (typeFilter) data = data.filter((d) => d.waste_type === typeFilter)
    if (statusFilter) data = data.filter((d) => d.status === statusFilter)

    // Update stats
    document.getElementById('wpBaruCount').textContent = allData.filter(
      (d) => d.status === 'baru'
    ).length
    document.getElementById('wpDitinjauCount').textContent = allData.filter(
      (d) => d.status === 'ditinjau'
    ).length
    document.getElementById('wpSelesaiCount').textContent = allData.filter(
      (d) => d.status === 'selesai'
    ).length
    document.getElementById('wpTotalCount').textContent = allData.length
    document.getElementById('wpFilterResult').textContent =
      `Menampilkan ${data.length} dari ${allData.length} data`

    // Initialize or update map
    initWastePointsMap(data)

    const isStaff = ['admin', 'petugas'].includes(currentUser.role)
    const isAdmin = currentUser.role === 'admin'

    // New card-based layout
    document.getElementById('wastePointsList').innerHTML =
      data.length > 0
        ? `<div class="wp-cards-grid">
            ${data
              .map(
                (wp, index) => `
              <div class="wp-card" style="animation-delay: ${index * 0.05}s">
                <div class="wp-card-header">
                  <span class="wp-type-badge ${wp.waste_type}">${getWasteTypeIcon(wp.waste_type)} ${wp.waste_type}</span>
                  <span class="wp-status-dot ${wp.status}" title="${wp.status}"></span>
                </div>
                <div class="wp-card-body">
                  <h4 class="wp-name">${wp.name}</h4>
                  <p class="wp-desc">${wp.description || 'Tidak ada deskripsi'}</p>
                  <div class="wp-coords">
                    <span class="coord-badge">📍 ${wp.coordinates[1]?.toFixed(6)}, ${wp.coordinates[0]?.toFixed(6)}</span>
                  </div>
                </div>
                <div class="wp-card-footer">
                  <span class="wp-status-badge ${wp.status}">${wp.status}</span>
                  ${
                    isStaff
                      ? `
                    <div class="wp-actions">
                      <button class="wp-btn edit" onclick="editWastePoint('${wp._id}')" title="Edit">✏️</button>
                      ${isAdmin ? `<button class="wp-btn delete" onclick="deleteWastePoint('${wp._id}')" title="Hapus">🗑️</button>` : ''}
                    </div>
                  `
                      : ''
                  }
                </div>
              </div>
            `
              )
              .join('')}
          </div>`
        : '<div class="empty-state-box"><span class="empty-icon">📭</span><p>Tidak ada data titik limbah</p><span class="empty-hint">Coba ubah filter atau tambah data baru</span></div>'
  } catch (err) {
    showNotification(err.message, 'error')
  }
}

function getWasteTypeIcon(type) {
  const icons = {
    organik: '🌿',
    anorganik: '♻️',
    B3: '☢️',
    campuran: '🔀',
  }
  return icons[type] || '📦'
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
          <p><strong>Koordinat:</strong> ${lat.toFixed(6)}, ${lon.toFixed(8)}</p>
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
      return '#4a90a4' // Sky blue
    case 'ditinjau':
      return '#c17f59' // Sunset orange
    case 'selesai':
      return '#2d5a27' // Forest green
    default:
      return '#5d4e37' // Earth brown
  }
}

function openWastePointModal() {
  document.getElementById('wastePointForm').reset()
  document.getElementById('wpId').value = ''
  document.getElementById('wastePointModalTitle').textContent = 'Tambah Titik Limbah'
  // Sembunyikan field status saat tambah baru (status otomatis 'baru')
  document.getElementById('wpStatusGroup').style.display = 'none'
  document.getElementById('wastePointModal').classList.add('active')
}

function closeWastePointModal() {
  document.getElementById('wastePointModal').classList.remove('active')
  // Reset tampilan field status
  document.getElementById('wpStatusGroup').style.display = 'none'
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

  // Tambahkan status jika sedang edit (field visible)
  if (id && document.getElementById('wpStatusGroup').style.display !== 'none') {
    data.status = document.getElementById('wpStatus').value
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
      document.getElementById('wpStatus').value = wp.status || 'baru'
      document.getElementById('wpLon').value = wp.coordinates[0]
      document.getElementById('wpLat').value = wp.coordinates[1]
      document.getElementById('wastePointModalTitle').textContent = 'Edit Titik Limbah'
      // Tampilkan field status saat edit
      document.getElementById('wpStatusGroup').style.display = 'block'
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
        ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
        : ''

      // Tentukan background berdasarkan kondisi cuaca
      const weatherBg = getWeatherBackground(weather.main)

      // Format suhu dengan emoji
      const tempEmoji = weather.temp > 30 ? '🔥' : weather.temp < 20 ? '❄️' : '🌡️'

      document.getElementById('envResultContent').innerHTML = `
        <div class="env-result-container">
          <!-- Header dengan cuaca -->
          <div class="env-weather-hero" style="background: ${weatherBg}">
            <div class="weather-hero-content">
              ${weatherIcon ? `<img src="${weatherIcon}" alt="weather" class="weather-icon-large">` : ''}
              <div class="weather-hero-info">
                <div class="weather-temp-large">${weather.temp ? weather.temp + '°C' : '-'}</div>
                <div class="weather-desc-large">${weather.description || 'Tidak ada data'}</div>
                <div class="weather-location-large">📍 ${addr.municipality || addr.county || addr.region || addr.city || 'Lokasi Tidak Diketahui'}</div>
              </div>
            </div>
            <div class="weather-stats">
              <div class="weather-stat-item">
                <span class="stat-icon">💧</span>
                <span class="stat-value">${weather.humidity || '-'}%</span>
                <span class="env-stat-label">Kelembaban</span>
              </div>
              <div class="weather-stat-item">
                <span class="stat-icon">💨</span>
                <span class="stat-value">${weather.wind_speed || '-'} m/s</span>
                <span class="env-stat-label">Angin</span>
              </div>
              <div class="weather-stat-item">
                <span class="stat-icon">${tempEmoji}</span>
                <span class="stat-value">${weather.feels_like || '-'}°C</span>
                <span class="env-stat-label">Terasa</span>
              </div>
            </div>
          </div>

          <!-- Grid Info -->
          <div class="env-info-grid">
            <!-- Lokasi Detail -->
            <div class="env-info-card">
              <div class="env-card-header">
                <span class="env-card-icon">📍</span>
                <h4>Detail Lokasi</h4>
              </div>
              <div class="env-card-body">
                <div class="info-row">
                  <span class="info-label">Alamat Lengkap</span>
                  <span class="info-value">${addr.display_name || '-'}</span>
                </div>
                <div class="info-divider"></div>
                <div class="info-grid-2col">
                  <div class="info-item">
                    <span class="info-label">🏘️ Kelurahan</span>
                    <span class="info-value-sm">${addr.village || addr.suburb || '-'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">🏛️ Kecamatan</span>
                    <span class="info-value-sm">${addr.municipality || addr.county || '-'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">🌆 Kota</span>
                    <span class="info-value-sm">${addr.region || addr.city || '-'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">🗺️ Provinsi</span>
                    <span class="info-value-sm">${addr.state || '-'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">🌏 Negara</span>
                    <span class="info-value-sm">${addr.country || '-'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">📮 Kode Pos</span>
                    <span class="info-value-sm">${addr.postcode || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Koordinat -->
            <div class="env-info-card coord-card">
              <div class="env-card-header">
                <span class="env-card-icon">🎯</span>
                <h4>Koordinat GPS</h4>
              </div>
              <div class="env-card-body coord-body">
                <div class="coord-display">
                  <div class="coord-item">
                    <span class="coord-label">LAT</span>
                    <span class="coord-value">${parseFloat(data.lat).toFixed(6)}</span>
                  </div>
                  <div class="coord-separator">×</div>
                  <div class="coord-item">
                    <span class="coord-label">LON</span>
                    <span class="coord-value">${parseFloat(data.lon).toFixed(8)}</span>
                  </div>
                </div>
                <a href="https://www.google.com/maps?q=${data.lat},${data.lon}" target="_blank" class="btn btn-map">
                  🗺️ Buka di Google Maps
                </a>
              </div>
            </div>
          </div>

          <!-- Rekomendasi Lingkungan -->
          <div class="env-recommendation">
            <h4>💡 Rekomendasi Pengelolaan Limbah</h4>
            <div class="recommendation-content">
              ${getEnvironmentRecommendation(weather)}
            </div>
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

function getWeatherBackground(weatherMain) {
  const backgrounds = {
    Clear: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
    Clouds: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
    Rain: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)',
    Drizzle: 'linear-gradient(135deg, #89F7FE 0%, #66A6FF 100%)',
    Thunderstorm: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    Snow: 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)',
    Mist: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    Fog: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    Haze: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)',
  }
  return backgrounds[weatherMain] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

function getEnvironmentRecommendation(weather) {
  let recommendations = []

  if (weather.temp > 30) {
    recommendations.push({
      icon: '🌡️',
      title: 'Suhu Tinggi',
      desc: 'Hindari pengumpulan limbah organik di siang hari. Pastikan wadah tertutup rapat untuk mencegah bau.',
    })
  }

  if (weather.humidity > 80) {
    recommendations.push({
      icon: '💧',
      title: 'Kelembaban Tinggi',
      desc: 'Pisahkan limbah basah dan kering. Gunakan wadah kedap air untuk mencegah rembesan.',
    })
  }

  if (weather.main === 'Rain' || weather.main === 'Drizzle') {
    recommendations.push({
      icon: '🌧️',
      title: 'Kondisi Hujan',
      desc: 'Tutup area pengumpulan limbah. Pastikan drainase berfungsi baik untuk mencegah genangan.',
    })
  }

  if (weather.wind_speed > 5) {
    recommendations.push({
      icon: '💨',
      title: 'Angin Kencang',
      desc: 'Amankan limbah ringan agar tidak berterbangan. Hindari pembakaran limbah.',
    })
  }

  if (recommendations.length === 0) {
    recommendations.push({
      icon: '✅',
      title: 'Kondisi Ideal',
      desc: 'Cuaca mendukung untuk aktivitas pengelolaan limbah. Waktu yang tepat untuk pengumpulan dan pemilahan.',
    })
  }

  return recommendations
    .map(
      (rec) => `
    <div class="recommendation-item">
      <span class="rec-icon">${rec.icon}</span>
      <div class="rec-content">
        <strong>${rec.title}</strong>
        <p>${rec.desc}</p>
      </div>
    </div>
  `
    )
    .join('')
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
