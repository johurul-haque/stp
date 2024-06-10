import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as adminServices from './admin.service';

export const handleGetAllUsers = catchAsync(async (req, res) => {
  const result = await adminServices.getAllUsers(req.jwtPayload);

  sendResponse(res, {
    message: 'Successfully retrieved all users',
    data: result,
  });
});

export const handleInfoChange = catchAsync(async (req, res) => {
  const result = await adminServices.updateUserInfo(
    req.params.userId,
    req.body
  );

  sendResponse(res, {
    message: 'User info updated successfully',
    data: result,
  });
});
