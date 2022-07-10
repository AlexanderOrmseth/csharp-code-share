import {
  CodeFragmentModel,
  CodeFragmentPreviewModel,
  RequestPreviewModel,
} from "./models/codeFragmentModel";
import axios, {AxiosError} from "axios";
import {FormModel} from "./models/FormModel";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
const namespace = "codeFragment";

axios.interceptors.response.use(
  async (response) => response,
  (error: AxiosError) => Promise.reject(error.response)
);

const api = {
  addCodeFragment: (values: FormModel) =>
    axios.post<{ id: string }>(namespace, values).then((res) => res.data),
  getCodeFragmentById: (id: string, theme?: string | null) =>
    axios
      .get<CodeFragmentModel>(`${namespace}/${id}`, {
        params: {theme: theme || null},
      })
      .then((res) => res.data),
  getPreview: (values: RequestPreviewModel) =>
    axios
      .post<CodeFragmentPreviewModel>(`${namespace}/preview`, values)
      .then((res) => res.data),
};

export default api;
