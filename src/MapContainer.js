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
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import AllOutIcon from '@material-ui/icons/AllOut';
import Typography from '@material-ui/core/Typography';;

const styles = theme => ({
  container: {
    marginTop: 10
  },
  title: {
    margin: 10
  },
  card: {
    minWidth: 400,
    background: '#fafafa'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '90%',
    marginBottom: 20
  },
  selectEmpty: {
    margin: theme.spacing.unit * 2,
  },
  actions: {
    margin: 'auto',
    display: 'table'
  },
  button: {
    margin: theme.spacing.unit,
  },
  select: {
    margin: 10
  }
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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography variant="title" gutterBottom className={classes.title}>
          Where can I go to earn/redeem Qantas Frequent Flyer points?
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="category">Select a category</InputLabel>
          <Select
            value={this.state.selectedType}
            onChange={this.onLocationTypeChange}
            width="90%"
          >
            <MenuItem value=""><em>None</em></MenuItem>)
            { locationTypes.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
          </Select>
        </FormControl>

        {this.state.selectedPlace.merchantId &&
          <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {this.state.selectedPlace.name[0]}
                  </Avatar>
                }
                title={this.state.selectedPlace.name}
              />
              <CardActions className={classes.actions} disableActionSpacing>
                <div className={classes.buttonContainer}>
                  <Button variant="outlined" size="large" color="primary"
                    className={classes.button}
                    component={Link} to={`/merchant/${this.state.selectedPlace.merchantId}`}>
                    Details <AllOutIcon style={{marginLeft: 10}} />
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
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
