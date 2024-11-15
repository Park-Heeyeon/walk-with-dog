import Header from "../layout/Header";
import DogMap from "./map/DogMap";
import Sidebar from "../common/Sidebar";
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
