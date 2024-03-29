export interface ErrorResponse {
  status: number;
  success?: false;
  message: string;
  errorDetails: any;
}
