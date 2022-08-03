import {Clock, Code as CodeIcon, User} from "react-feather";
import {CodeFragmentModel} from "../../../app/models/codeFragmentModel";

interface Props {
  codeFragment: CodeFragmentModel;
}

const CodeHeader = ({codeFragment}: Props) => {
  return (
    <header className="mb-4 border-b text-sm md:flex text-gray-100/70 items-center gap-x-4 pb-2 border-dark-400">
      <h2 className="flex-1 font-bold flex-wrap flex items-center gap-2">
        <CodeIcon size="1.5rem"/>
        <em className="flex-1 text-purple-300 leading-4">
          {codeFragment.title || codeFragment.id}
        </em>
      </h2>

      <div className="flex flex-row md:mt-0 mt-1.5 flex-wrap items-center gap-x-4 gap-y-1">
        <span className="flex items-center justify-end gap-2">
          <User size="1.25rem"/>
          {codeFragment.author || "Unknown"}
        </span>
        <time className="flex flex-wrap items-center justify-end gap-2">
          <Clock size="1.25rem"/>
          {new Date(codeFragment.createdAt).toLocaleString()}
        </time>
      </div>
    </header>
  );
};

export default CodeHeader;
