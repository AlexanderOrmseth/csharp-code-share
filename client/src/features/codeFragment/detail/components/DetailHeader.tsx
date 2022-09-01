import CopyButton from "./CopyButton";
import { Code as CodeIcon, Link2 as LinkIcon } from "react-feather";

interface Props {
  theme?: string | null;
  codeToCopy: string;
  handleThemeChanged: (theme: string) => void;
}

const DetailHeader = ({ handleThemeChanged, theme, codeToCopy }: Props) => {
  return (
    <header role="group" className="mb-2 grid gap-2 sm:grid-cols-3">
      <button
        aria-label="Change to Rider theme"
        className="btn-secondary disabled-btn h-10"
        disabled={theme === "rider"}
        type="button"
        onClick={() => handleThemeChanged("rider")}
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
          <path d="M0 0v24h24V0zm7.031 3.113A4.063 4.063 0 0 1 9.72 4.14a3.23 3.23 0 0 1 .84 2.28A3.16 3.16 0 0 1 8.4 9.54l2.46 3.6H8.28L6.12 9.9H4.38v3.24H2.16V3.12c1.61-.004 3.281.009 4.871-.007zm5.509.007h3.96c3.18 0 5.34 2.16 5.34 5.04 0 2.82-2.16 5.04-5.34 5.04h-3.96zm4.069 1.976c-.607.01-1.235.004-1.849.004v6.06h1.74a2.882 2.882 0 0 0 3.06-3 2.897 2.897 0 0 0-2.951-3.064zM4.319 5.1v2.88H6.6c1.08 0 1.68-.6 1.68-1.44 0-.96-.66-1.44-1.74-1.44zM2.16 19.5h9V21h-9Z" />
        </svg>
        Rider Theme
      </button>
      <CopyButton
        ariaLabel="Copy link to code-fragment to clipboard"
        btnText="Copy link"
        Icon={LinkIcon}
        data={window.location.href}
      />
      <CopyButton
        ariaLabel="Copy code to clipboard"
        btnText="Copy code"
        Icon={CodeIcon}
        data={codeToCopy}
      />
    </header>
  );
};

export default DetailHeader;
