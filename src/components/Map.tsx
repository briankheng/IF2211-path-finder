import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";
import guid from "@/utils/guid";
import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -6.891213825491306,
  lng: 107.61065741605813,
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        fileData.num_nodes > 0
          ? {
              lat: fileData.nodes[fileData.num_nodes - 1].lat,
              lng: fileData.nodes[fileData.num_nodes - 1].lng,
            }
          : center
      }
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
