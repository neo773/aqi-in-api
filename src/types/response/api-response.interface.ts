export interface APIResponse<T> {
  status: "success" | "Success" | "failed";
  message: string;
  data: T;
  error?: string;
  status_code?: number;
}
