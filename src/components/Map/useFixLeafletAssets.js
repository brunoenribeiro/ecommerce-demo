import L from "leaflet";
import { useEffect } from "react";

import iconMarker2x from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconMarkerShadow from "leaflet/dist/images/marker-shadow.png";

export default function useFixLeafletAssets() {
  useEffect(function fixMarkerAssets() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconMarker2x.src,
      iconUrl: iconMarker.src,
      shadowUrl: iconMarkerShadow.src,
    });
  }, []);
}
