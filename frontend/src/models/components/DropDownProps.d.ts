interface DropDownProps {
  button: JSX.Element;
  tooltipText: string;
  userInfo: { email: string; password: string; userId: string; role: string };
  children: React.ReactNode;
}
export default DropDownProps;
