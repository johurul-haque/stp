import { env } from '@config';
import app from 'app';
import { db } from './config/db';

(async function () {
  try {
    await db.$connect();

    app.listen(env.PORT, () => {
      console.log(`Server listening on ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
