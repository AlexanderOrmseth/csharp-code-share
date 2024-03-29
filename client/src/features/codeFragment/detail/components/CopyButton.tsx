import React, { useState } from "react";
import { Copy, ThumbsUp, IconProps } from "react-feather";

type Icon = React.FunctionComponent<IconProps>;

interface Props {
  data: string;
  btnText: string;
  ariaLabel: string;
  Icon: Icon;
}

const CopyButton = ({ data, btnText, Icon, ariaLabel }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const copyText = (): void => {
    navigator.clipboard.writeText(data).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    });
  };

  return (
    <button
      aria-label={ariaLabel}
      type="button"
      disabled={showSuccess}
      className="disabled-btn btn-secondary h-10"
      onClick={copyText}
    >
      {!showSuccess ? (
        <>
          {Icon ? <Icon size="1.25rem" /> : <Copy size="1.25rem" />}
          {btnText}
        </>
      ) : (
        <>
          <ThumbsUp size="1.25rem" />
          Copied!
        </>
      )}
    </button>
  );
};

export default CopyButton;
