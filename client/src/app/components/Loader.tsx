import { Loader as LoaderIcon } from "react-feather";
interface Props {
  message: string;
}
const Loader = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center text-slate-200/40 my-4">
      <LoaderIcon size={40} className="animate-spin-slow mb-2.5" />
      <span className="font-bold text-lg">{message}</span>
    </div>
  );
};

export default Loader;
