import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { uuid } from '@/utils/validate-uuid';
import * as tripPairServices from './trip-pairs.service';

export const getTravelPairs = catchAsync(async (req, res) => {
  const tripId = uuid.parse(req.params.tripId);

  const result = await tripPairServices.getPairs(tripId);

  sendResponse(res, {
    statusCode: 200,
    message: 'Potential travel buddies retrieved successfully',
    data: result,
  });
});

export const handleTravelPairResponse = catchAsync(async (req, res) => {
  const buddyId = uuid.parse(req.params.buddyId);

  const result = await tripPairServices.travelPairResponse(req.body, buddyId);

  sendResponse(res, {
    statusCode: 200,
    message: 'Travel buddy request responded successfully',
    data: result,
  });
});
