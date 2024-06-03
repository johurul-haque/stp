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

export const handleTripUpdate = catchAsync(async (req, res) => {
  const result = await tripServices.updateTrip(
    req.jwtPayload,
    req.body,
    req.params.tripId
  );
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
  const result = await tripServices.getAllTrips(
    req.query as Query,
    req.jwtPayload
  );

  sendResponse(res, {
    status: 200,
    message: 'Trips retrieved successfully',
    ...result,
  });
});

export const handleGetSingleTrip = catchAsync(async (req, res) => {
  const result = await tripServices.getSingleTrip(req.params.tripId);

  sendResponse(res, {
    status: 200,
    message: 'Trip retrieved successfully',
    data: result,
  });
});

export const handleTripDelete = catchAsync(async (req, res) => {
  const result = await tripServices.deleteOne(
    req.params.tripId,
    req.jwtPayload.userId
  );

  sendResponse(res, {
    status: 200,
    message: 'Trip deleted successfully',
    data: result,
  });
});