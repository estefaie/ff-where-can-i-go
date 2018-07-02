import React from 'react';
import { Link } from 'react-router-dom';
import locations from './locations';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PlaceIcon from '@material-ui/icons/Place';
import BurnIcon from '@material-ui/icons/Redeem';
import ExploreIcon from '@material-ui/icons/Explore';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: 5
  },
  card: {
    background: '#fafafa',
    maxWidth: '100%'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class Barcode extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton component={Link} to="/map">
                <PlaceIcon />
              </IconButton>
            }
            subheader={`Use this barcode to ${this.props.location.pathname === '/earn' ? 'Earn' : 'Burn' } frequent flyer points`}
          />
          <CardContent>
            <img style={{width: '100%', height: 'auto'}}
              src='https://s3-ap-southeast-2.amazonaws.com/ff-where-can-i-go/img/barcode.png'
              alt="Barcode"
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

Barcode.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Barcode);


// const barcode = (isEarn) => (
//   <div>
//     <div>Use this barcode to {isEarn ? 'Earn' : 'Burn' }</div>
//     <div><img src='https://s3-ap-southeast-2.amazonaws.com/ff-where-can-i-go/img/barcode.png' /></div>
//   </div>
// );

// export default barcode;