import { useState } from "react";
import Header from "../layout/Header";
import DogMap from "./map/DogMap";
import Sidebar from "../common/Sidebar";

const UserHome: React.FC = () => {
  const [isSideOpen, setIsSideOpen] = useState<boolean>(false);
  return (
    <>
      {isSideOpen ? (
        <Sidebar isSideOpen={isSideOpen} setIsSideOpen={setIsSideOpen} />
      ) : (
        <Header setIsSideOpen={setIsSideOpen} />
      )}

      <DogMap />
    </>
  );
};
export default UserHome;
