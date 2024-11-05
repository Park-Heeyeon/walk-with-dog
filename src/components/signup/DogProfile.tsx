import { DogFormSchema } from "@/schemas/DogFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../common/InputField";
import RadioField from "../common/RadioField";

interface DogProfileFormType {
  name: string;
  age: string;
  breed: string;
  gender: string;
  fixedStatus: string;
}

const DogProfile: React.FC = () => {
  const form = useForm<z.infer<typeof DogFormSchema>>({
    resolver: zodResolver(DogFormSchema),
    defaultValues: {
      name: "",
      age: "0",
      breed: "",
      gender: "male",
      fixedStatus: "false",
    },
  });

  const handleOnSubmit = () => {
    console.log("희연 전달ㄴ");
  };

  return (
    <div className="w-[80%] smax-w-md mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-depBrown mb-6">
            강아지 정보 입력
          </h2>
          <InputField<DogProfileFormType>
            control={form.control}
            label="이름"
            name="name"
          />
          <InputField<DogProfileFormType>
            control={form.control}
            label="나이"
            name="age"
          />
          <InputField<DogProfileFormType>
            control={form.control}
            label="종류"
            name="breed"
          />
          <RadioField<DogProfileFormType>
            control={form.control}
            label="성별"
            name="gender"
            options={[
              { value: "male", label: "왕자" },
              { value: "female", label: "공주" },
            ]}
          />
          <RadioField<DogProfileFormType>
            control={form.control}
            label="중성화 여부"
            name="fixedStatus"
            options={[
              { value: "true", label: "예" },
              { value: "false", label: "아니요" },
            ]}
          />
          <div className="flex justify-center space-x-2">
            <button
              type="submit"
              className="flex-grow bg-midBeige text-white py-2 rounded-md font-semibold transition duration-200"
            >
              이전
            </button>
            <button
              type="submit"
              className="flex-grow bg-midBrown text-white py-2 rounded-md font-semibold transition duration-200"
            >
              가입
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default DogProfile;
