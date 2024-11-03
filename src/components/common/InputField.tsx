import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  className?: string;
};

const InputField = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  desc,
  className,
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-depBrown">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className={`${className} focus:border-gray-300 focus:ring focus:ring-gray-300 focus:ring-opacity-50 border-gray-300`} // 반응형 너비 설정
              type={type}
              {...field}
            />
          </FormControl>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default InputField;
