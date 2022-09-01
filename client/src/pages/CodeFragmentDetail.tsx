import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../app/services/api";
import { useQuery } from "react-query";
import type { ErrorModel } from "../app/models/errorModel";
import Loader from "../app/components/Loader";
import ErrorBox from "../app/components/ErrorBox";
import DetailHeader from "../features/codeFragment/detail/components/DetailHeader";
import CodeFragment from "../features/codeFragment/components/CodeFragment";
import CodeFragmentHeader from "../features/codeFragment/components/CodeFragmentHeader";

const CodeFragmentDetail = () => {
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
        <DetailHeader
          theme={theme}
          handleThemeChanged={handleThemeChanged}
          codeToCopy={data.codeString}
        />
        <CodeFragment
          code={data.code}
          linesOfCode={data.linesOfCode}
          header={<CodeFragmentHeader details={data} />}
        />
      </>
    ) : (
      <ErrorBox message={`Code-fragment with id ${id} was not found.`} />
    );

  return <div>{content}</div>;
};

export default CodeFragmentDetail;
