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

  sendResponse(res, {
    message: 'Trip updated successfully',
    data: result,
  });
});

export const handleTripJoinRequest = catchAsync(async (req, res) => {
  const result = await tripServices.tripJoinRequest(
    req.params.tripId,
    req.jwtPayload
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
    message: 'Trips retrieved successfully',
    ...result,
  });
});

export const handleGetSingleTrip = catchAsync(async (req, res) => {
  const result = await tripServices.getSingleTrip(
    req.params.tripId,
    req.jwtPayload
  );

  sendResponse(res, {
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
    message: 'Trip deleted successfully',
    data: result,
  });
});