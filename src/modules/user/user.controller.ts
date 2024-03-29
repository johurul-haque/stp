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

export const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'User logged in successfully',
    data: excludeFields(result, ['createdAt', 'updatedAt', 'password']),
  });
});
