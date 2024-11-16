import Sidebar from "@/components/layout/Sidebar";
import DogMap from "./map/DogMap";
import Header from "@/components/layout/Header";
import { useUserHome } from "./UserHomeProvider";

const UserHome: React.FC = () => {
  const { isSideOpen } = useUserHome();

  return (
    <>
      {isSideOpen ? <Sidebar /> : <Header />}
      <DogMap />
    </>
  );
};
export default UserHome;
