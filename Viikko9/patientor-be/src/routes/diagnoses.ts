import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req: express.Request, res:  express.Response) => {
    console.log('Someone wants the diagnose list');
    res.send(diagnoseService.getDiagnoses());
});

export default router;
