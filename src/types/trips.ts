export type Trip = {
  id: string;
  userId: string;
  destination: string;
  description: string;
  images: string[];
  travelType: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  TravelPairRequest?: {
    id: string;
    tripId: string;
    userId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
  }[];
};

export type getAllTripsResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Trip[];
};
