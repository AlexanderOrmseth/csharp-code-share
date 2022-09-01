import React, { useState } from "react";
import { Share, Code as CodeIcon, Info, Eye } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../app/services/api";
import CodeFragment from "../components/CodeFragment";
import { FormModel, FormValidation } from "./formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { ErrorModel } from "../../../app/models/errorModel";
import ErrorBox from "../../../app/components/ErrorBox";
import FormTextInput from "../../../app/components/form/FormTextInput";
import LoadingButton from "../../../app/components/LoadingButton";
import Loader from "../../../app/components/Loader";

const CreateCodeFragmentForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { isSubmitting, isValid, isDirty }
  } = useForm<FormModel>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(FormValidation)
  });

  // add
  const { mutate: addCodeFragment, isLoading } = useMutation(
    api.addCodeFragment,
    {
      onSuccess: (data) => navigate(data),
      onError: (error: ErrorModel): void => {
        handleMutationError(error, "Error! Could not upload your code.");
      }
    }
  );

  // preview
  const {
    mutate: fetchPreview,
    isLoading: previewLoading,
    data: preview
  } = useMutation(api.getPreview, {
    onError: (error: ErrorModel): void => {
      handleMutationError(
        error,
        "Error! Could not fetch preview of your code."
      );
    }
  });

  const onSubmit = async (data: FormModel): Promise<void> => {
    await addCodeFragment(data);
  };

  const handleFetchPreview = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    // prevent submit
    e.preventDefault();
    setServerError(null);
    const code = getValues("code");
    reset({}, { keepValues: true });
    await fetchPreview({ code });
  };

  const handleMutationError = (
    error: ErrorModel,
    defaultMessage: string
  ): void => {
    const errorMessage = error?.data?.errors
      ? Object.values(error.data.errors).flat()[0]
      : error?.data?.title;
    setServerError(errorMessage ?? defaultMessage);
  };

  const loading = isLoading || previewLoading;

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
            disabled={!isValid}
            loading={isSubmitting || loading}
            loadingMessage="Loading..."
          >
            <Share size="1.25rem" />
            Share
          </LoadingButton>
          <LoadingButton
            type="button"
            disabled={!isValid || !isDirty}
            loading={isSubmitting || loading}
            loadingMessage="Loading.."
            onClick={(e) => handleFetchPreview(e)}
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
              <CodeFragment
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

export default CreateCodeFragmentForm;
