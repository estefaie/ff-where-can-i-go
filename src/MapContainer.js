import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const locations = [
  {
    name: "The Renegades",
    position: {
      lat: "-33.923992",
      lng: "151.187343"
    }
  },
  {
    name: "Lucca Cafe",
    position: {
      lat: "-33.924556",
      lng: "151.187502"
    }
  }
];

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      locations: this.props.locations,
      initialCenter: this.props.initialCenter,
      showingInfoWindow: false
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'relative', width: '100%' }}
        initialCenter = {this.state.initialCenter}
        zoom={14}>

        {
          locations.map(location => (
            <Marker
              name={location.name}
              onClick={this.onMarkerClick}
              position={location.position}
            />
          ))
        }

        {/* <Marker
          name="Dolores park"
          onClick={this.onMarkerClick}
          position={{ lat: 37.759703, lng: -122.428093 }}
        /> */}

        <Marker
          name="Current location"
          onClick={this.onMarkerClick}
          position={this.state.initialCenter}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

        <InfoWindow position={this.props.initialCenter} visible>
          <small>
            Click on any of the markers to display an additional info.
          </small>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.defaultProps = {
  initialCenter: { lat: -33.925356, lng: 151.186735 },
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDpgoPu5yKXRzArjgIEDAyRprrxr7MzoDs')
})(MapContainer);
