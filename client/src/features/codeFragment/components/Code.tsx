import { ReactNode, useState } from "react";

const Code = ({
  code,
  linesOfCode,
  header
}: {
  code: string;
  linesOfCode: number;
  header?: ReactNode;
}) => {
  const [scale, setScale] = useState(1);

  // height + empty line at bottom
  const height = linesOfCode * 24 + 24;

  return (
    <div className="bg-visual-studio-bg border-dark-700 rounded-lg border p-4">
      {header && header}

      <div className="mb-4 flex flex-row items-center gap-2">
        <input
          type="range"
          step={0.1}
          min={0.3}
          max={1.5}
          className="range-lg h-3 w-full flex-1 cursor-pointer touch-none appearance-none rounded-lg dark:bg-gray-300/20"
          value={scale}
          onChange={(e) => setScale(+e.target.value)}
        />
        <span className="font-mono text-xs text-gray-400">
          {scale.toFixed(1)}
        </span>
      </div>

      <div style={{ height: height * scale + "px" }} className="block">
        <iframe
          seamless
          srcDoc={code}
          className="block w-full overflow-auto"
          title={"C# Code Fragment"}
          style={{
            height: height + "px",
            backgroundColor: "#1E1E1E",
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            transformOrigin: "0 0"
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Code;
