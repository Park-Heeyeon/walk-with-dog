import { Control, FieldValues, Path, useFormState } from "react-hook-form";
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
  disabled?: boolean;
};

const InputField = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  desc,
  className,
  disabled = false,
}: InputFieldProps<T>) => {
  const { errors } = useFormState({ control });
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel className="text-depBrown font-semibold mb-2 flex items-center">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className={`${className} w-full rounded-md border-none bg-beige px-4 py-2 placeholder-brown text-brown focus:outline-none focus:ring-1 focus:ring-brown focus:border-brown`}
              type={type}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          {desc &&
            !errors[name] && ( // errors가 없을 경우에만 desc 표시
              <FormDescription className="text-sm text-brown mt-1">
                {desc}
              </FormDescription>
            )}
          <FormMessage className="text-red-400 mt-1" />
        </FormItem>
      )}
    />
  );
};
export default InputField;
