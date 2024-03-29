import { catchAsync } from '@/utils';
import { excludeFields } from '@/utils/exclude-fields';
import { sendResponse } from '@/utils/send-response';
import * as userServices from './user.service';

export const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: excludeFields(result, ['password']),
  });
});
