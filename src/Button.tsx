type ButtonProps = {
  children: string;
  onClick?: () => void;
};

export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
