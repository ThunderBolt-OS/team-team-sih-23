// Assets
import MapIconBus from "../../assets/mapIcons/bus.png";
import MapIconStop from "../../assets/mapIcons/stop.png";

// Third-party components
import { Marker } from "react-map-gl";

interface CustomMarkerProps {
  type: "bus" | "stop";
  lat: number;
  lon: number;
  onClick?: () => void;
}

function CustomMarker(props: CustomMarkerProps) {
  function handleClick() {
    if (props.onClick) props.onClick();
  }
  return (
    <Marker
      latitude={props.lat}
      longitude={props.lon}
      onClick={() => handleClick()}
    >
      <MarkerBody type={props.type} />
    </Marker>
  );
}

interface MarkerBodyProps {
  type: "bus" | "stop";
}

function MarkerBody(props: MarkerBodyProps) {
  if (props.type === "bus") return <img src={MapIconBus} width={30} />;
  else return <img src={MapIconStop} width={30} />;
}

export default CustomMarker;
