import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  const [fileData, setFileData] = useState(null);
  return (
    <>
      <div className="md:flex">
        <Map fileData={fileData}/>
        <SideBar fileData={fileData} setFileData={setFileData}/>
      </div>
    </>
  );
}
