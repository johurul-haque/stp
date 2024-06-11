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
};
