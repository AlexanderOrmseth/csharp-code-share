import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
}
const FormInputError = ({ error }: Props) => {
  if (!error) return null;

  return (
    <div className="flex flex-col gap-y-1">
      {error?.message && (
        <em className="text-red-400 text-sm italic">{error.message}</em>
      )}
      {error?.types &&
        Object.values(error.types).map((error, i) => (
          <em key={i} className="text-red-400 block text-sm italic">
            {error}
          </em>
        ))}
    </div>
  );
};

export default FormInputError;
