export interface ErrorModel {
  data?: {
    errors?: Record<string, string> | null;
    title?: string | null;
  };
}
