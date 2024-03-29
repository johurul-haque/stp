import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as tripServices from './trip.service';

export const createTrip = catchAsync(async (req, res) => {
  const result = await tripServices.create(req.body, req.jwtPayload);

  sendResponse(res, {
    statusCode: 201,
    message: 'Trip created successfully',
    data: result,
  });
});
