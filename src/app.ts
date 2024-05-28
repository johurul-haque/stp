import { globalCatch } from '@middlewares/global-catch';
import cors from 'cors';
import express from 'express';
import router from 'routes';
import { AppError, catchAsync } from './utils';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(
  '*',
  catchAsync(() => {
    throw new AppError(404, 'Not Found');
  })
);

app.use(globalCatch);

export default app;
