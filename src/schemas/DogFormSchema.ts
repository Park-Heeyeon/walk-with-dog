import * as z from "zod";

const regex = /^[가-힣]{1,10}$/; // 한글로 최대 10글자
const numRegex = /^([0-9]|1[0-9]|20)$/; // 0에서 20까지의 숫자 허용

export const DogFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "강아지 이름을 작성해주세요",
    })
    .max(10, {
      message: "강아지 이름은 최대 10글자까지 입력할 수 있습니다",
    })
    .regex(regex, {
      message: "한글로 작성해주세요",
    }),
  age: z
    .string()
    .min(1, {
      message: "강아지 나이를 작성해주세요",
    })
    .regex(numRegex, {
      message: "나이는 0에서 20살 사이의 숫자로 작성해주세요",
    }),
  breed: z
    .string()
    .min(1, {
      message: "강아지 종류를 작성해주세요",
    })
    .regex(regex, {
      message: "한글로 작성해주세요",
    }),
  gender: z.string(), // 유효성 검사는 필요 없지만 필드는 포함
  fixedStatus: z.string(), // 선택 필드로서 유지
});
