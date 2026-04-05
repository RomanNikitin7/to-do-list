type ButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
