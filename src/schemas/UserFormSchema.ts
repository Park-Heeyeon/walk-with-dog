import * as z from "zod";

// 아이디 정규 표현식
const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,12}$/;

// 비밀번호 정규 표현식
const pwdRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{7,15}$/;

export const UserFormSchema = z.object({
  userId: z
    .string()
    .min(1, {
      message: "아이디를 입력해주세요",
    })
    .regex(idRegex, {
      message: "영문자와 숫자로 5자리 이상 12자리 이하로 작성해주세요.",
    }),
  password: z
    .string()
    .min(1, {
      message: "비밀번호를 입력해주세요",
    })
    .regex(pwdRegex, {
      message:
        "영문, 숫자, 특수문자(~!@#$%^&*)조합 7자리 이상 15자리 이하로 작성해 주세요",
    }),
  nickname: z.string().min(1, {
    message: "닉네임을 입력해주세요",
  }),
  address: z.string().min(1, {
    message: "주소를 입력해주세요",
  }),
});
