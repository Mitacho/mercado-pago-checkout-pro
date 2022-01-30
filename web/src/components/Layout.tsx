// import { Navbar } from ".";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  );
}
