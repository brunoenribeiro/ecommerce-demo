import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import center from '@turf/center';
import { points } from '@turf/helpers';

import useFixLeafletAssets from "./useFixLeafletAssets";

import styles from './Map.module.scss';
import "leaflet/dist/leaflet.css";

function LocationZoomer({ latlong }) {
    const map = useMap();

    useEffect(() => {
        if (latlong) {
            map.setView(latlong, 16);
        }
    }, [map, latlong]);

    return null;
}

function Map({ className = '', locations = [], zoomedLatlong = null }) {
    useFixLeafletAssets();

    const features = points(locations.map(location => location.latlong));
    const initialMapCenter = center(features)?.geometry.coordinates || [0,0];

    return (
        <MapContainer className={`${styles.map} ${className}`} center={initialMapCenter} zoom={10} scrollWheelZoom>
            <LocationZoomer latlong={zoomedLatlong} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(({ latlong, popupContent }) => (
                <Marker key={latlong.join('-')} position={latlong}>
                    <Popup>
                        {popupContent}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;
