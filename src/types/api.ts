export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  details?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedEnvelope<T> extends ApiEnvelope<T[]> {
  pagination: Pagination;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
