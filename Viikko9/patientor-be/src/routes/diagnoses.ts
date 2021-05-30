import express from 'express';
import diagnoseService from '../services/diagnoseService'

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Someone wants the diagnose list');
    res.send(diagnoseService.getEntries());
});

export default router;
