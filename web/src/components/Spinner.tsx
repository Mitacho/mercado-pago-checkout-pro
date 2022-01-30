import { memo } from "react";

type SpinnerSize = "s" | "m" | "l";

type Props = {
  size?: SpinnerSize;
};

function Spinner({ size = "s" }: Props): JSX.Element {
  return (
    <div className={`spinner ${size}`}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
}

export default memo(Spinner);
