import router from '@adonisjs/core/services/router'

// pakai .js untuk ESM
import auth from '../app/middleware/Auth.js'
import role from '../app/middleware/Role.js'

// import dinamis controller juga pakai .js
const AuthController = () => import('../app/controllers/AuthController.js')
const UsersController = () => import('../app/controllers/users_controller.js')
const WastePointsController = () => import('../app/controllers/WastePointsController.js')
const ReportsController = () => import('../app/controllers/ReportsController.js')
const ExternalController = () => import('../app/controllers/ExternalController.js')

router
  .group(() => {
    router.get('/env-summary', [ExternalController, 'envSummary'])
  })
  .prefix('/external')
  .middleware([auth]) // kalau mau wajib login

// Route test tanpa auth (untuk testing API eksternal)
router.get('/test/env-summary', [ExternalController, 'envSummary'])

router.get('/', async () => ({ hello: 'GeoWaste API' }))

// AUTH
router.post('/api/v1/register', [AuthController, 'register'])
router.post('/api/v1/login', [AuthController, 'login'])
router.get('/api/v1/me', [AuthController, 'me']).use([auth])

// USERS (admin)
router.get('/api/v1/users', [UsersController, 'index']).use([auth, role('admin')])
router.post('/api/v1/users', [UsersController, 'store']).use([auth, role('admin')])
router.get('/api/v1/users/:id', [UsersController, 'show']).use([auth, role('admin', 'petugas')])
router.put('/api/v1/users/:id', [UsersController, 'update']).use([auth, role('admin')])
router.delete('/api/v1/users/:id', [UsersController, 'destroy']).use([auth, role('admin')])

// WASTE POINTS
router.get('/api/v1/wastepoints', [WastePointsController, 'index']).use([auth])
router
  .post('/api/v1/wastepoints', [WastePointsController, 'store'])
  .use([auth, role('admin', 'petugas')])
router
  .put('/api/v1/wastepoints/:id', [WastePointsController, 'update'])
  .use([auth, role('admin', 'petugas')])
router
  .delete('/api/v1/wastepoints/:id', [WastePointsController, 'destroy'])
  .use([auth, role('admin')])

// REPORTS
router.get('/api/v1/reports', [ReportsController, 'index']).use([auth])
router.post('/api/v1/reports', [ReportsController, 'store']).use([auth, role('warga')])
router
  .patch('/api/v1/reports/:id/status', [ReportsController, 'updateStatus'])
  .use([auth, role('admin', 'petugas')])
router.delete('/api/v1/reports/:id', [ReportsController, 'destroy']).use([auth, role('admin')])
