import { Router } from 'express'

const routes = Router()

import devController from './app/controllers/dev.controller'
import searchController from './app/controllers/search.controller'

routes.get('/devs', devController.index)
routes.post('/devs', devController.store)

routes.get('/search', searchController.index)

export default routes