import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../app/api";
import ErrorBox from "../../app/components/ErrorBox";
import Loader from "../../app/components/Loader";
import CodeHeader from "./components/CodeHeader";
import Code from "./components/Code";
import { useQuery } from "react-query";
import type { ErrorModel } from "../../app/models/errorModel";
import DetailsPageActions from "./components/DetailsPageActions";

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const [error, setError] = useState<string>("");

  const { data, isLoading, isError } = useQuery(
    [theme],
    () => api.getCodeFragmentById(id as string, theme),
    {
      onError: (error: ErrorModel) => {
        setError(error?.data?.title || "Server Error!");
      },
      retry: false,
      refetchOnWindowFocus: false
    }
  );

  const handleThemeChanged = (theme: string): void => {
    setSearchParams({ theme });
  };

  let content;
  if (isLoading) return <Loader message="Loading..." />;
  else if (isError) return <ErrorBox message={error} />;
  else
    content = data ? (
      <>
        <DetailsPageActions
          theme={theme}
          handleThemeChanged={handleThemeChanged}
          codeToCopy={data.codeString}
        />
        <Code
          code={data.code}
          linesOfCode={data.linesOfCode}
          header={<CodeHeader details={data} />}
        />
      </>
    ) : (
      <ErrorBox message={`Code-fragment with id ${id} was not found.`} />
    );

  return <div>{content}</div>;
};

export default DetailsPage;
