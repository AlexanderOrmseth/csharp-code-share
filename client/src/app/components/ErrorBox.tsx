import { AlertCircle } from "react-feather";

const ErrorBox = ({ message }: { message: string }) => {
  return (
    <div className="md:p-2.5 p-2 flex items-center border-red-500 text-sm border rounded bg-red-500/50 shadow font-medium text-red-100">
      <AlertCircle size="1.5rem" className="mr-2" />
      <em className="flex-1">{message}</em>
    </div>
  );
};

export default ErrorBox;
