import { Loader as LoaderIcon } from "react-feather";
interface Props {
  message: string;
}
const Loader = ({ message }: Props) => {
  return (
    <div className="my-4 flex flex-col items-center text-slate-200/40">
      <LoaderIcon size={40} className="animate-spin-slow mb-2.5" />
      <span className="text-lg font-bold">{message}</span>
    </div>
  );
};

export default Loader;
