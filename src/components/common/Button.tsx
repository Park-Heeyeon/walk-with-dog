type ButtonProps = {
  type?: "button" | "submit";
  className?: string;
  text: string;
  clickEvent?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className,
  text,
  clickEvent,
}) => {
  return (
    <button
      type={type}
      className={`block font-bold rounded mx-auto ${className}`} // color prop 적용
      onClick={clickEvent}
    >
      {text}
    </button>
  );
};

export default Button;
