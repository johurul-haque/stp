import { Query } from '@/interface/query';
import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as tripServices from './trip.service';

export const createTrip = catchAsync(async (req, res) => {
  const result = await tripServices.create(req.body, req.jwtPayload);

  sendResponse(res, {
    status: 201,
    message: 'Trip created successfully',
    data: result,
  });
});

export const handleTripPairRequest = catchAsync(async (req, res) => {
  const result = await tripServices.tripPairRequest(
    req.body,
    req.params.tripId
  );

  sendResponse(res, {
    status: 201,
    message: 'Travel buddy request sent successfully',
    data: result,
  });
});

export const handleGetAllTrips = catchAsync(async (req, res) => {
  const result = await tripServices.getAllTrips(req.query as Query);

  sendResponse(res, {
    status: 200,
    message: 'Trips retrieved successfully',
    ...result,
  });
});
