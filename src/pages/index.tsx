import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  const [fileData, setFileData] = useState(null);
  const [shortestPath, setShortestPath] = useState(null);
  
  return (
    <>
      <div className="md:flex h-screen w-screen">
        <div className="h-[50vh] md:w-[70vw] md:h-screen">
          <Map fileData={fileData} shortestPath={shortestPath}/>
        </div>
        <div className="md:w-[30vw] overflow-y-scroll">
          <SideBar fileData={fileData} setFileData={setFileData} setShortestPath={setShortestPath}/>
        </div>
      </div>
    </>
  );
}
