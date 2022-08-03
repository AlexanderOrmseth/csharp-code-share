import { useState } from "react";

const Code = ({
  code,
  linesOfCode,
  header,
}: {
  code: string;
  linesOfCode: number;
  header?: React.ReactNode;
}) => {
  const [scale, setScale] = useState(1);

  // height + empty line at bottom
  const height = linesOfCode * 24 + 24;

  return (
    <div className="bg-visual-studio-bg rounded-lg border border-dark-700 p-4">
      {header && header}

      <div className="flex mb-4 gap-2 flex-row items-center">
        <input
          type="range"
          step={0.1}
          min={0.3}
          max={1.5}
          className="flex-1 w-full h-3 rounded-lg touch-none appearance-none cursor-pointer range-lg dark:bg-gray-300/20"
          value={scale}
          onChange={(e) => setScale(+e.target.value)}
        />
        <span className="text-xs text-gray-400 font-mono">
          {scale.toFixed(1)}
        </span>
      </div>

      <div style={{ height: height * scale + "px" }} className="block">
        <iframe
          frameBorder="0"
          srcDoc={code}
          className="w-full block overflow-auto"
          title={"C# Code Fragment"}
          style={{
            height: height + "px",
            backgroundColor: "#1E1E1E",
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            transformOrigin: "0 0",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Code;
