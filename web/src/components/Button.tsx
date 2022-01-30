import { Spinner } from "@components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  text,
  fullWidth,
  loading,
  ...props
}: Props): JSX.Element {
  return <button {...props}>{loading ? <Spinner /> : text}</button>;
}
