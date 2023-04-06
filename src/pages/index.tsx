import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  const [fileData, setFileData] = useState(null);
  return (
    <>
      <div className="flex">
        <Map fileData={fileData}/>
        <SideBar setFileData={setFileData}/>
      </div>
    </>
  );
}
