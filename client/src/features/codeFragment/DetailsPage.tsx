import {useEffect, useState} from "react";
import {Link2, Code as CodeIcon} from "react-feather";
import {useParams, useSearchParams} from "react-router-dom";
import api from "../../app/api";
import {CodeFragmentModel} from "../../app/models/codeFragmentModel";
import CopyButton from "../../app/components/CopyButton";
import ErrorBox from "../../app/components/ErrorBox";
import Loader from "../../app/components/Loader";
import CodeHeader from "./components/CodeHeader";
import Code from "./components/Code";

const DetailsPage = () => {
  const {id} = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = searchParams.get("theme");
  const [data, setData] = useState<CodeFragmentModel | null>(null);
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAsync() {
      if (!id) {
        setError("No id");
        return;
      }

      setLoading(true);
      try {
        const response = await api.getCodeFragmentById(id, theme);
        setError(null);
        setData(response);
      } catch (error: any) {
        console.error(error);
        if (error?.data?.title) {
          setError(error.data.title);
        } else {
          setError("Server Error!");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAsync();
  }, [id, theme]);

  let content;
  if (loading) return <Loader message="Loading..."/>;
  else if (error) return <ErrorBox message={error || "Server Error!"}/>;
  else
    content = data ? (
      <>
        <div className="mb-2 grid sm:grid-cols-3 gap-2">
          <button
            className="btn-secondary h-10 disabled-btn"
            disabled={theme === "rider"}
            onClick={() => setSearchParams({theme: "rider"})}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4  ${
                theme === "rider" ? "fill-disabled-color" : "fill-slate-50"
              } `}
            >
              <title>Rider</title>
              <path
                d="M0 0v24h24V0zm7.031 3.113A4.063 4.063 0 0 1 9.72 4.14a3.23 3.23 0 0 1 .84 2.28A3.16 3.16 0 0 1 8.4 9.54l2.46 3.6H8.28L6.12 9.9H4.38v3.24H2.16V3.12c1.61-.004 3.281.009 4.871-.007zm5.509.007h3.96c3.18 0 5.34 2.16 5.34 5.04 0 2.82-2.16 5.04-5.34 5.04h-3.96zm4.069 1.976c-.607.01-1.235.004-1.849.004v6.06h1.74a2.882 2.882 0 0 0 3.06-3 2.897 2.897 0 0 0-2.951-3.064zM4.319 5.1v2.88H6.6c1.08 0 1.68-.6 1.68-1.44 0-.96-.66-1.44-1.74-1.44zM2.16 19.5h9V21h-9Z"/>
            </svg>
            Rider Theme
          </button>
          <CopyButton
            btnText="Copy link"
            Icon={Link2}
            data={window.location.href}
          />
          <CopyButton
            btnText="Copy code"
            Icon={CodeIcon}
            data={data.codeString}
          />
        </div>
        <Code
          code={data.code}
          linesOfCode={data.linesOfCode}
          header={<CodeHeader codeFragment={data}/>}
        />
      </>
    ) : (
      <ErrorBox message="No data."/>
    );

  return <div>{content}</div>;
};

export default DetailsPage;
