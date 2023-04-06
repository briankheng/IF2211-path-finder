import Map from "@/components/Map";
import SideBar from "@/components/SideBar";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Map />
        <SideBar />
      </div>
    </>
  );
}
