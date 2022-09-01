import { ReactNode } from "react";

interface Props {
  loading: boolean;
  children?: ReactNode;
  type?: "button" | "submit";
  onClick?: (x?: any) => void;
  disabled: boolean;
  className?: string;
  loadingMessage: string;
}

const LoadingButton = ({
  loading,
  onClick,
  children,
  className,
  disabled,
  loadingMessage,
  type = "button"
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-secondary disabled-btn ${className ? className : ""}`}
    >
      {loading ? loadingMessage : children}
    </button>
  );
};

export default LoadingButton;
