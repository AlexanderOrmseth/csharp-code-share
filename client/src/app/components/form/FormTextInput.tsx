import {
  Controller,
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormInputError from "./FormInputError";

interface Props<T> extends UseControllerProps<T> {
  label: string;
  type?: string;
  placeholder?: string;
  errors?: string[];
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  required?: boolean;
  focus?: boolean;
}

// prevent from submitting by pressing enter inside input
const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.code === "Enter") e.preventDefault();
};

const FormTextInput = <T extends FieldValues>(props: Props<T>) => {
  const { fieldState } = useController({
    ...props,
  });

  return (
    <div>
      <label className="label" htmlFor={props.name}>
        {props.label}
        {props.required ? (
          <span className="ml-1 text-red-400">
            * <span className="text-purple-300">(required)</span>
          </span>
        ) : (
          <span className="ml-1 text-purple-300">(optional)</span>
        )}
      </label>
      <Controller
        {...props}
        render={({ field: { value, ...rest } }) => (
          <div className="mt-1">
            {!props.textarea ? (
              <input
                onKeyDown={(e) => checkKeyDown(e)}
                autoComplete="off"
                className={`text-input ${
                  !!fieldState.error
                    ? "border-red-500  text-red-400 placeholder:text-transparent"
                    : ""
                }`}
                {...rest}
                autoFocus={props.focus}
                value={value || ""}
                placeholder={props.placeholder}
                type={props.type ?? "text"}
              />
            ) : (
              <textarea
                autoComplete="off"
                className={`text-input resize-y py-0.5 h-auto ${
                  !!fieldState.error
                    ? "border-red-500  text-red-400 placeholder:text-transparent"
                    : ""
                }`}
                {...rest}
                value={value || ""}
                placeholder={props.placeholder}
                rows={props.rows}
                maxLength={props.maxLength}
              />
            )}
          </div>
        )}
      />
      <FormInputError error={fieldState.error} />
    </div>
  );
};

export default FormTextInput;
