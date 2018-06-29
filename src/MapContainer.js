import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const locations = [
  {
    name: "The Renegades",
    position: {
      lat: "-33.923992",
      lng: "151.187343"
    },
    type: "Cafe",
    address: "Shop 1, 230 Coward Street, Mascot NSW 2020",
    website: "the-renegades.com.au",
    telephone: "(02) 8338 8884",
    opening: "6am–8pm"
  },
  {
    name: "Lucca Cafe",
    position: {
      lat: "-33.924556",
      lng: "151.187502"
    },
    type: "Cafe",
    address: "TNT Building, 197-201 Coward St, Mascot NSW 2020",
    website: "luccacafe.com.au",
    telephone: "(02) 9700 9933",
    opening: "8am–3pm"
  },
  {
    name: "Biggles Bar",
    position: {
      lat: "-33.926029",
      lng: "151.187615"
    },
    type: "Bar",
    address: "Bourke Rd, Mascot NSW 2020 Located in: Holiday Inn Sydney Airport",
    website: "holidayinn.com",
    telephone: "(02) 9330 0600",
    opening: "Opens at 12:00 pm"
  },
  {
    name: "F45 Training Mascot",
    position: {
      lat: "-33.923827",
      lng: "151.186666"
    },
    type: "Trainer / fittness",
    address: "244 Coward St, Mascot NSW 2020",
    website: "f45training.com.aum",
    telephone: "(02) 9330 0600",
    opening: "5:15am–6pm"
  },
  {
    name: "Excel Physiotherapy and Wellness",
    position: {
      lat: "-33.924352",
      lng: "151.188720"
    },
    type: "Physiotherapist / fittness",
    address: "214-220 Coward St, Mascot NSW 2020",
    website: "excelphysio.com.au",
    telephone: "1300 650 510",
    opening: "8am–7pm"
  },
  {
    name: "Priceline Pharmacy Mascot",
    position: {
      lat: "-33.923088",
      lng: "151.186071"
    },
    type: "Chemist",
    address: "7/19-33 Kent Rd, Mascot NSW 2020",
    website: "priceline.com.au",
    telephone: "(02) 9693 1830",
    opening: "8am–9pm"
  },
  {
    name: "Bunnings Mascot",
    position: {
      lat: "-33.919212",
      lng: "151.188780"
    },
    type: "Home Improvement Store",
    address: "Gardeners Rd & Bourke Rd, Mascot NSW 2020",
    website: "bunnings.com.au",
    telephone: "(02) 9330 3800",
    opening: "am–9pm"
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
        zoom={15}>

        {
          locations.map(location => (
            <Marker
              name={location.name}
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
    );
  }
}

MapContainer.defaultProps = {
  initialCenter: { lat: -33.925356, lng: 151.186735 },
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDpgoPu5yKXRzArjgIEDAyRprrxr7MzoDs')
})(MapContainer);
