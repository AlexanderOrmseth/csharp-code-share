import { AlertCircle } from "react-feather";

const ErrorBox = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center rounded border border-red-500 bg-red-500/50 p-2 text-sm font-medium text-red-100 shadow md:p-2.5">
      <AlertCircle size="1.5rem" className="mr-2" />
      <em className="flex-1">{message}</em>
    </div>
  );
};

export default ErrorBox;
