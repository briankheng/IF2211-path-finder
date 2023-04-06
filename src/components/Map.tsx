import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -6.891213825491306,
  lng: 107.61065741605813,
};

function Map({ fileData }: { fileData: any }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={
        fileData
          ? { lat: fileData.nodes[0].lat, lng: fileData.nodes[0].lng }
          : center
      }
      zoom={15}
    >
      {fileData &&
        fileData.nodes.map((node: any) => (
          <MarkerF
            key={node.id}
            label={node.name}
            position={{
              lat: node.lat,
              lng: node.lng,
            }}
          />
        ))}

      {fileData &&
        fileData.paths.map((path: any) => (
          <PolylineF
            key={path.id}
            path={[
              { lat: path.lat_start, lng: path.lng_start },
              { lat: path.lat_end, lng: path.lng_end },
            ]}
          />
        ))}
    </GoogleMap>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Map;
