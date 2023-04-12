import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";
import guid from "@/utils/guid";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({
  fileData,
  setFileData,
  shortestPath,
  setShortestPath,
}: {
  fileData: any;
  setFileData: any;
  shortestPath: any;
  setShortestPath: any;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [point, setPoint] = useState<any>(null);
  const [center, setCenter] = useState<any>({
    lat: -6.891213825491306,
    lng: 107.61065741605813,
  });

  useEffect(() => {
    if (fileData.num_nodes > 0) {
      setCenter({
        lat: fileData.nodes[0].lat,
        lng: fileData.nodes[0].lng,
      });
    }

    return () => {
      setCenter({
        lat: -6.891213825491306,
        lng: 107.61065741605813,
      });
    };
  }, [fileData.nodes[0]?.lat, fileData.nodes[0]?.lng]);

  const handleRightClickMarker = (id: any) => {
    const num_nodes = fileData.num_nodes - 1;
    const nodes: {
      id: number;
      name: string;
      lat: number;
      lng: number;
    }[] = [];
    const adj_list: number[][] = [];
    const paths: {
      lat_start: number;
      lng_start: number;
      lat_end: number;
      lng_end: number;
    }[] = [];

    for (let i = 0; i < fileData.num_nodes; i++) {
      if (i === id) {
        continue;
      } else if (i > id) {
        nodes.push({
          id: i - 1,
          name: `P ${i - 1}`,
          lat: fileData.nodes[i].lat,
          lng: fileData.nodes[i].lng,
        });
      } else {
        nodes.push({
          id: i,
          name: `P ${i}`,
          lat: fileData.nodes[i].lat,
          lng: fileData.nodes[i].lng,
        });
      }
    }

    for (let i = 0; i < fileData.num_nodes; i++) {
      const temp: number[] = [];
      if (i === id) {
        continue;
      }
      for (let j = 0; j < fileData.adj_list[i].length; j++) {
        if (fileData.adj_list[i][j] === id) {
          continue;
        } else if (fileData.adj_list[i][j] > id) {
          temp.push(fileData.adj_list[i][j] - 1);
        } else {
          temp.push(fileData.adj_list[i][j]);
        }
      }
      adj_list.push(temp);
    }

    for (let i = 0; i < fileData.paths.length; i++) {
      if (
        (fileData.paths[i].lat_start === fileData.nodes[id].lat &&
          fileData.paths[i].lng_start === fileData.nodes[id].lng) ||
        (fileData.paths[i].lat_end === fileData.nodes[id].lat &&
          fileData.paths[i].lng_end === fileData.nodes[id].lng)
      ) {
        continue;
      } else {
        paths.push(fileData.paths[i]);
      }
    }

    setFileData({
      num_nodes,
      nodes,
      adj_list,
      paths,
    });
    setShortestPath(null);
  };

  const handleRightClickLine = (path: any) => {
    const paths: {
      lat_start: number;
      lng_start: number;
      lat_end: number;
      lng_end: number;
    }[] = [];

    for (let i = 0; i < fileData.paths.length; i++) {
      if (
        fileData.paths[i].lat_start === path.lat_start &&
        fileData.paths[i].lng_start === path.lng_start &&
        fileData.paths[i].lat_end === path.lat_end &&
        fileData.paths[i].lng_end === path.lng_end
      ) {
        continue;
      } else {
        paths.push(fileData.paths[i]);
      }
    }

    let node_start = -1;
    let node_end = -1;

    for (let i = 0; i < fileData.num_nodes; i++) {
      if (
        fileData.nodes[i].lat === path.lat_start &&
        fileData.nodes[i].lng === path.lng_start
      ) {
        node_start = i;
      }
      if (
        fileData.nodes[i].lat === path.lat_end &&
        fileData.nodes[i].lng === path.lng_end
      ) {
        node_end = i;
      }
    }

    const adj_list: number[][] = [...fileData.adj_list];

    for (let i = 0; i < adj_list[node_start].length; i++) {
      if (adj_list[node_start][i] === node_end) {
        adj_list[node_start].splice(i, 1);
      }
    }

    for (let i = 0; i < adj_list[node_end].length; i++) {
      if (adj_list[node_end][i] === node_start) {
        adj_list[node_end].splice(i, 1);
      }
    }

    setFileData({
      ...fileData,
      paths,
      adj_list,
    });
    setShortestPath(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={(e) => {
        setFileData({
          ...fileData,
          nodes: [
            ...fileData.nodes,
            {
              id: fileData.num_nodes,
              name: `P ${fileData.num_nodes}`,
              lat: e.latLng?.lat(),
              lng: e.latLng?.lng(),
            },
          ],
          num_nodes: fileData.num_nodes + 1,
          adj_list: [...fileData.adj_list, []],
        });
      }}
    >
      {fileData &&
        fileData.nodes.map((node: any) => (
          <MarkerF
            key={guid()}
            label={node.name}
            position={{
              lat: node.lat,
              lng: node.lng,
            }}
            onClick={(e) => {
              point === null
                ? setPoint({
                    id: node.id,
                    lat: e.latLng?.lat(),
                    lng: e.latLng?.lng(),
                  })
                : (setFileData({
                    ...fileData,
                    paths: [
                      ...fileData.paths,
                      {
                        lat_start: point.lat,
                        lng_start: point.lng,
                        lat_end: e.latLng?.lat(),
                        lng_end: e.latLng?.lng(),
                      },
                    ],
                    adj_list:
                      point.id < node.id
                        ? [
                            ...fileData.adj_list.slice(0, point.id),
                            [...fileData.adj_list[point.id], node.id],
                            ...fileData.adj_list.slice(point.id + 1, node.id),
                            [...fileData.adj_list[node.id], point.id],
                            ...fileData.adj_list.slice(node.id + 1),
                          ]
                        : [
                            ...fileData.adj_list.slice(0, node.id),
                            [...fileData.adj_list[node.id], point.id],
                            ...fileData.adj_list.slice(node.id + 1, point.id),
                            [...fileData.adj_list[point.id], node.id],
                            ...fileData.adj_list.slice(point.id + 1),
                          ],
                  }),
                  setPoint(null));
            }}
            onRightClick={(e) => {
              handleRightClickMarker(node.id);
            }}
          />
        ))}

      {fileData &&
        fileData.paths.map((path: any) => (
          <PolylineF
            key={guid()}
            path={[
              { lat: path.lat_start, lng: path.lng_start },
              { lat: path.lat_end, lng: path.lng_end },
            ]}
            options={{
              strokeColor: "black",
              strokeOpacity: 0.6,
              strokeWeight: 3,
            }}
            onRightClick={(e) => {
              handleRightClickLine(path);
            }}
          />
        ))}

      {shortestPath &&
        shortestPath.map((path: any) => (
          <PolylineF
            key={guid()}
            path={[
              { lat: path.lat_start, lng: path.lng_start },
              { lat: path.lat_end, lng: path.lng_end },
            ]}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 6,
            }}
          />
        ))}
    </GoogleMap>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Map;
