import { fetchApi } from "@/utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// getNeighborDogs 함수에서 user 객체를 받아 사용하도록 수정
const getNeighborDogs = async (userId: string, address: string) => {
  try {
    const queryParams = new URLSearchParams({
      userId: userId || "",
      address: address || "",
    }).toString();

    const response = await fetchApi(`/api/dogs?${queryParams}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useNeighborDogs = () => {
  const { data } = useSession();
  const user = data?.user;

  return useQuery({
    queryKey: ["neighborDogs", user?.userId, user?.address],
    queryFn: () => getNeighborDogs(user?.userId || "", user?.address || ""),
    enabled: !!user?.userId && !!user?.address,
  });
};
