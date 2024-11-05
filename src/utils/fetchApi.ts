// GET 요청을 위한 함수
export const fetchApi = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API 호출 중 오류 발생");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch API 오류:", error);
    throw error; // 오류를 다시 던져서 호출하는 쪽에서 처리할 수 있게 합니다.
  }
};

// POST 요청을 위한 함수
export const postApi = async (url: string, body: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API 호출 중 오류 발생");
    }

    return await response.json();
  } catch (error) {
    console.error("Post API 오류:", error);
    throw error; // 오류를 다시 던져서 호출하는 쪽에서 처리할 수 있게 합니다.
  }
};
