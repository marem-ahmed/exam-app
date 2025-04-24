declare type DatabaseProperies={
    _id:string;
    createdAt:string
    updatedAt:string
}

declare type SuccessFulResponse<T>={
    message:'success'
}&T

declare type ErrorResponse={
    message:string;
    code:number
}
declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems?: number;
  };
} & T;
declare type APIResponse<T>=SuccessFulResponse<T>|ErrorResponse