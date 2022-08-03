import React, {useState} from "react";
import {Copy, ThumbsUp, IconProps} from "react-feather";

type Icon = React.FunctionComponent<IconProps>;

interface Props {
  data: string;
  btnText: string;
  Icon: Icon;
}

const CopyButton = ({data, btnText, Icon}: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <button
      disabled={showSuccess}
      className="disabled-btn h-10 btn-secondary"
      onClick={copyText}
    >
      {!showSuccess ? (
        <>
          {Icon ? <Icon size="1.25rem"/> : <Copy size="1.25rem"/>}
          {btnText}
        </>
      ) : (
        <>
          <ThumbsUp size="1.25rem"/>
          Copied!
        </>
      )}
    </button>
  );
};

export default CopyButton;
