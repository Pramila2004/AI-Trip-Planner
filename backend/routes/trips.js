import express from 'express'
import { saveUserTrips,getUserTrips,deleteTripByIndex } from '../controllers/trip_controllers.js';

const router=express.Router();

router.post('/addTrip',saveUserTrips);
router.get('/getTrips', getUserTrips); // ✅ correct
router.post('/deleteTripByIndex', deleteTripByIndex); // ✅ New route



export default router;