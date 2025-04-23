import {Router} from 'express'
import { deleteBundle, getBundle, getBundleById, getBundleByTid, getGroupBundle, postBulkBundle, postBundle, updateBundle, updateGroupedBundles } from "../controllers/bundle.controller.js"
import {protect } from "../controllers/auth.controller.js"
const bundleRoute = Router()

bundleRoute.get('/bundle' , protect , getBundle )

bundleRoute.post('/bundle' , protect , postBundle )

bundleRoute.patch('/bundle/:id' , protect , updateBundle )

bundleRoute.delete('/bundle/:id' , protect , deleteBundle )

bundleRoute.get('/bundle/:id' , protect , getBundleById)

bundleRoute.post('/bundle/bulk' , protect , postBulkBundle )

bundleRoute.get('/bundle-by-tid/:id' , protect , getBundleByTid )

bundleRoute.get('/grouped-bundle' , protect , getGroupBundle )

bundleRoute.patch('/groupedBundles' , protect , updateGroupedBundles )
export default bundleRoute