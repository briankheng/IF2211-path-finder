import Map from "@/components/Map";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { IData } from "@/types";

export default function Home() {
  const [fileData, setFileData] = useState<IData>({
    num_nodes: 0,
    nodes: [],
    adj_list: [],
    paths: [],
  });
  const [shortestPath, setShortestPath] = useState(null);

  console.log(fileData.num_nodes);
  fileData.nodes.map((node: any) => console.log(node.name, node.lat, node.lng));
  let adj_matrix : number[][]= [];
  for(let i = 0; i < fileData.num_nodes; i++){
    adj_matrix.push([]);
    for(let j = 0; j < fileData.num_nodes; j++){
      adj_matrix[i].push(0);
    }
  }
  for (let i = 0; i < fileData.num_nodes; i++) {
    for (let j = 0; j < fileData.num_nodes; j++) {
      if(fileData.adj_list[i].includes(j)){
        adj_matrix[i][j] = 1;
      }
    }
  }
  console.log(adj_matrix);
  for (let i = 0; i < fileData.num_nodes; i++) console.log(adj_matrix[i]);
  
  return (
    <>
      <div className="md:flex h-screen w-screen">
        <div className="text-white text-center sticky top-0 z-50 md:hidden">
          <h1 className="bg-red-600 p-3 text-lg font-bold">PATHFINDER</h1>
        </div>
        <div className="h-[50vh] md:w-[70vw] md:h-screen">
          <Map
            fileData={fileData}
            setFileData={setFileData}
            shortestPath={shortestPath}
            setShortestPath={setShortestPath}
          />
        </div>
        <div className="md:w-[30vw] overflow-y-scroll">
          <SideBar
            fileData={fileData}
            setFileData={setFileData}
            setShortestPath={setShortestPath}
          />
        </div>
      </div>
    </>
  );
}
