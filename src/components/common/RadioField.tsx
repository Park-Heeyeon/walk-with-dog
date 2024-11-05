import { Controller } from "react-hook-form";

interface RadioFieldProps<T> {
  control: any;
  label: string;
  name: keyof T;
  options: { value: string; label: string }[];
}

const RadioField = <T,>({
  control,
  label,
  name,
  options,
}: RadioFieldProps<T>) => {
  return (
    <div className="flex flex-row items-center space-y-2">
      <label className="mb-1 text-sm font-medium text-depBrown w-[25%]">
        {label}
      </label>
      <Controller
        control={control}
        name={name as string}
        render={({ field }) => (
          <div className="flex space-x-4">
            {options.map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => {
                    // 라디오 버튼 클릭 시 field 값 업데이트
                    field.onChange(option.value);
                  }}
                  className="mr-2 hidden cursor-pointer" // 기본 라디오 버튼 숨기기
                />
                <span
                  className={`inline-block px-4 py-2 rounded-md transition duration-200 cursor-pointer ${
                    field.value === option.value
                      ? "bg-[#C6A16C] text-white" // 선택된 버튼 스타일
                      : "bg-beige text-depBrown" // 비선택된 버튼 스타일
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default RadioField;
