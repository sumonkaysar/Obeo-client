export interface IMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

// export interface IErrorResponse {
//   data: {
//     statusCode: number;
//     success: boolean;
//     message: string;
//   };
// }
