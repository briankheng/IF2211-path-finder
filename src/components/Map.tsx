import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "70vw",
  height: "100vh",
};

const center = {
  lat: 44,
  lng: -80,
};

const path = [
  { lat: 44, lng: -80 },
  { lat: 43, lng: -81 },
];

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <MarkerF position={path[0]} label={"A"} />
      <MarkerF position={path[1]} label={"B"} />

      <PolylineF path={[path[0], path[1]]} />
    </GoogleMap>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Map;
