export interface CodeFragmentModel {
  id: string;
  title?: string | null;
  author?: string | null;
  createdAt: string;
  code: string;
  linesOfCode: number;
  codeString: string;
}

export interface CodePreviewResponse {
  html: string;
  linesOfCode: number;
}

export interface CodePreviewRequestModel {
  code: string;
  theme?: string | null;
}
