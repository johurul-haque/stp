export type Trips = {
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
};

export type AllTripsResponse = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Trips[];
};
