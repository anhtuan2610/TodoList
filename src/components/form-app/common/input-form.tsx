import { cn } from "../../../lib/utils";
import { Input } from "../../ui/input";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputForm = ({ className, ...rest }: InputFormProps) => {
  return (
    <Input
      className={cn(
        "bg-[#27282D] outline-none border-b-2 border-transparent focus:border-blue-500 transition-all py-4 px-3",
        className
      )}
      {...rest}
    />
  );
};

export default InputForm;
