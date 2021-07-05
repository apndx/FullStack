import express from 'express';
import diagnoseService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req: express.Request, res:  express.Response) => {
    console.log('Diagnosis list requested');
    res.send(diagnoseService.getDiagnoses());
});

export default router;
