import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import locations from './locations';
import { locationTypes } from './locations';
import filter from 'lodash/filter';

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      locations: this.props.locations,
      initialCenter: this.props.initialCenter,
      showingInfoWindow: false,
      selectedType: ''
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

  onInfoWindowClick = (e) => {
    console.log('click click')
    this.context.router.transitionTo('/map');
  }

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  onLocationTypeChange = (type) =>
    this.setState({
      selectedType: type.target.value
    });
  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    return (
      <div>
        <select onChange={this.onLocationTypeChange}>
        <option value="">Everything</option>)
          { locationTypes.map((type) => <option value={type}>{type}</option>)}
        </select>
        <Link to={`/merchant/${this.state.selectedPlace.merchantId}`}>
          <div>{this.state.selectedPlace.name}</div>
        </Link>
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '80%', position: 'relative', width: '100%' }}
        initialCenter = {this.state.initialCenter}
        zoom={15}>

        {
          locations.filter((l) => this.state.selectedType === "" || l.type.includes(this.state.selectedType)).map(location => (
            <Marker
              name={location.name}
              merchantId={location.merchantId}
              onClick={this.onMarkerClick}
              position={location.position}
            />
          ))
        }

        <Marker
          name="Current location"
          onClick={this.onMarkerClick}
          position={this.state.initialCenter}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div className="map-container-info-window">
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

MapContainer.defaultProps = {
  initialCenter: { lat: -33.925356, lng: 151.186735 },
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDpgoPu5yKXRzArjgIEDAyRprrxr7MzoDs')
})(MapContainer);
