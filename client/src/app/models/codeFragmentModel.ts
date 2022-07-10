export interface CodeFragmentModel {
  id: string;
  title?: string | null;
  author?: string | null;
  createdAt: string;
  code: string;
  linesOfCode: number;
  codeString: string;
}

export interface CodeFragmentPreviewModel {
  code: string;
  linesOfCode: number;
}

export interface RequestPreviewModel {
  code: string;
  theme?: string | null;
}
