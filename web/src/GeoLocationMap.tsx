import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

interface GeoLocationMapProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

type Props = GeoLocationMapProps;

export class GeoLocationMap extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const coordinates = {
      lat: this.props.coordinates.latitude,
      lng: this.props.coordinates.longitude
    };
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={coordinates} defaultZoom={20}>
        <Marker position={coordinates} />
      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
