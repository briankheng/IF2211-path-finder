import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
import { useState } from "react";

export default function Home() {
  const [fileData, setFileData] = useState(null);
  const [shortestPath, setShortestPath] = useState(null);
  
  return (
    <>
      <div className="md:flex h-screen w-screen">
        <Map fileData={fileData} shortestPath={shortestPath}/>
        <SideBar fileData={fileData} setFileData={setFileData} setShortestPath={setShortestPath}/>
      </div>
    </>
  );
}
