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
import RedeemIcon from '@material-ui/icons/Redeem';
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

class Merchant extends React.Component {
  render() {
    const { classes } = this.props;
  const loc = locations.find((el) => el.merchantId == this.props.merchantId);
  console.log('loc', loc);
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {loc.name.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton component={Link} to="/map">
              <PlaceIcon />
            </IconButton>
          }
          title={loc.name}
          subheader={loc.type}
        />
        <CardContent>
          <img style={{width: '100%', height: 'auto'}}
            src={`http://ff-where-can-i-go.s3-website-ap-southeast-2.amazonaws.com/img/${loc.merchantId}.jpeg`}
            alt="Smiley face"
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <div>
            <Button variant="outlined" size="large" color="primary" className={classes.button} component={Link} to="/earn">
              Earn <ExploreIcon style={{marginLeft: 10}} />
            </Button>
            <Button variant="outlined" size="large" color="primary" className={classes.button} component={Link} to="/earn">
              Redeem <RedeemIcon style={{marginLeft: 10}} />
            </Button>
          </div>
          <div style={{ marginLeft: "auto", marginRight: 0 }}>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand)}
              onClick={this.handleExpandClick}
              aria-label="Show more"
            >
              {/* <ExpandMoreIcon /> */}
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </div>
  );
  }
}

Merchant.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Merchant);
