import {
  CodeFragmentModel,
  CodePreviewResponse,
  CodePreviewRequestModel
} from "../models/codeFragmentModel";
import axios, { AxiosError } from "axios";
import { FormModel } from "../../features/codeFragment/create/formValidation";

const BASE_URL = import.meta.env.DEV ? "http://localhost:5003/api/" : "/api/";
axios.defaults.baseURL = BASE_URL;

const namespace = "codeFragment";
axios.interceptors.response.use(
  async (response) => response,
  (error: AxiosError) => Promise.reject(error.response)
);

const api = {
  addCodeFragment: (values: FormModel) => {
    return axios.post<string>(namespace, values).then((res) => res.data);
  },
  getCodeFragmentById: (id: string, theme?: string | null) => {
    return axios
      .get<CodeFragmentModel>(`${namespace}/${id}`, {
        params: { theme: theme || null }
      })
      .then((res) => res.data);
  },
  getPreview: (values: CodePreviewRequestModel) => {
    return axios
      .post<CodePreviewResponse>(`${namespace}/preview`, values)
      .then((res) => res.data);
  }
};

export default api;
