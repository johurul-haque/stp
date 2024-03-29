import { env } from '@config';
import app from 'app';

(async function () {
  try {
    app.listen(env.PORT, () => {
      console.log(`Server listening on ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
