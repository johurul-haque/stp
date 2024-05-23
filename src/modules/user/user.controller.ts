import { catchAsync } from '@/utils';
import { excludeFields } from '@/utils/exclude-fields';
import { sendResponse } from '@/utils/send-response';
import * as userServices from './user.service';

export const registerUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);

  sendResponse(res, {
    status: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.login(req.body);

  sendResponse(res, {
    status: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

export const getUserProfile = catchAsync(async (req, res) => {
  const result = await userServices.getUser(req.jwtPayload);

  sendResponse(res, {
    status: 200,
    message: 'User profile retrieved successfully',
    data: excludeFields(result, ['password']),
  });
});

export const handleProfileUpdate = catchAsync(async (req, res) => {
  const result = await userServices.updateUserProfile(req.body, req.jwtPayload);

  sendResponse(res, {
    status: 200,
    message: 'User profile updated successfully',
    data: excludeFields(result, ['password']),
  });
});

export const handleDeleteProfile = catchAsync(async (req, res) => {
  const result = await userServices.deleteProfile(req.body, req.jwtPayload);

  sendResponse(res, {
    status: 200,
    message: 'Profile deleted successfully',
    data: excludeFields(result, ['password']),
  });
});