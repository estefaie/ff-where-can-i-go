import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';
import locations from './locations';
import { locationTypes } from './locations';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
        <FormControl>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            native
            value={this.state.age}
            inputProps={{
              name: 'Category',
              id: 'category',
            }}
            onChange={this.onLocationTypeChange}
          >
            <option value=""></option>)
            { locationTypes.map((type) => <option value={type}>{type}</option>)}
          </Select>
        </FormControl>

        {this.state.selectedPlace.merchantId &&
          <Link to={`/merchant/${this.state.selectedPlace.merchantId}`}>
           <Card>
              <CardContent>
                <Typography variant="headline" component="h2">
                  {this.state.selectedPlace.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <div></div>
          </Link>
        }
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '90%', position: 'relative', width: '100%' }}
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
})(withStyles(styles)(MapContainer));
