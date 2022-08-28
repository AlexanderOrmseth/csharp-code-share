import React, { useState } from "react";
import { Share, Code as CodeIcon, Info, Eye } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../app/api";
import {
  CodePreviewResponse,
  CodePreviewRequestModel
} from "../../../app/models/codeFragmentModel";
import Code from "../components/Code";
import FormTextInput from "../../../app/components/form/FormTextInput";
import LoadingButton from "../../../app/components/LoadingButton";
import { schema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../../app/components/Loader";
import { FormModel } from "../../../app/models/FormModel";
import ErrorBox from "../../../app/components/ErrorBox";

const AddCodeFragmentForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [preview, setPreview] = useState<CodePreviewResponse | null>(null);
  const [previewCodeString, setPreviewCodeString] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // RHF
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting, isValid }
  } = useForm<FormModel>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema)
  });

  // upload code
  const onSubmit = async (data: FormModel) => {
    setServerError(null);
    try {
      const response = await api.addCodeFragment(data);
      navigate(response.id);
    } catch (error: any) {
      console.log(error);
      if (error?.data?.errors) {
        const validationError = Object.values(
          error.data.errors
        ).flat()[0] as string;
        setServerError(
          validationError || "Server Error! Could not share your code."
        );
      } else {
        setServerError(
          error?.data?.title || "Server Error! Could not share your code."
        );
      }
    }
  };

  // fetch preview
  const fetchPreview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // prevent submit
    e.preventDefault();
    setServerError(null);
    const code = getValues("code");

    // code unchanged, prevent api call
    if (code === previewCodeString) return;

    try {
      setLoading(true);
      const values: CodePreviewRequestModel = {
        code
      };
      const response = await api.getPreview(values);
      setPreviewCodeString(code);
      setPreview(response);
    } catch (error: any) {
      setServerError(
        error?.data?.title ||
          "Server Error! Could not fetch preview of your code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        spellCheck={false}
        className="bg-visual-studio-bg border-dark-700 space-y-4 rounded-lg border p-4 md:p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="border-dark-400 mb-4 border-b pb-2 ">
          <h2 className="mb-2 text-lg font-bold">Share C# Code</h2>
          <div className="flex flex-wrap items-center gap-x-2 text-sm leading-4 text-slate-50/50">
            <Info size={16} />
            <em className="flex-1">
              Code is periodically deleted every 6 hours
            </em>
          </div>
        </header>
        {serverError && <ErrorBox message={serverError} />}

        <div className="grid gap-4 md:grid-cols-2">
          <FormTextInput focus name="title" label="Title" control={control} />
          <FormTextInput name="author" label="Author" control={control} />
        </div>

        <FormTextInput
          textarea
          required
          rows={10}
          maxLength={12000}
          name="code"
          label="Code"
          control={control}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <LoadingButton
            type="submit"
            disabled={isSubmitting || !isValid || loading}
            loading={isSubmitting || loading}
            loadingMessage="Loading..."
          >
            <Share size="1.25rem" />
            Share
          </LoadingButton>
          <LoadingButton
            type="button"
            disabled={isSubmitting || !isValid || loading}
            loading={isSubmitting || loading}
            loadingMessage="Loading.."
            onClick={(e) => fetchPreview(e)}
          >
            <CodeIcon size="1.25rem" />
            Preview
          </LoadingButton>
        </div>
      </form>
      {loading ? (
        <div className="bg-visual-studio-bg border-dark-700 p4 mt-4 rounded-lg border shadow-lg">
          <Loader message="Getting preview..." />
        </div>
      ) : (
        <>
          {preview && (
            <div className="mt-4">
              <Code
                code={preview.html}
                linesOfCode={preview.linesOfCode}
                header={
                  <header className="border-dark-400 mb-4 border-b pb-2 text-sm text-gray-100/70">
                    <h2 className="flex flex-1 flex-wrap items-center gap-2 font-bold">
                      <Eye size="1.5rem" />
                      <em className="flex-1 leading-4 text-purple-300">
                        Preview
                      </em>
                    </h2>
                  </header>
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddCodeFragmentForm;
