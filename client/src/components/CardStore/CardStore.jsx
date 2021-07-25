import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//components
import StoresDetails from '../StoresDetails/StoresDetails';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth:245,
    margin:'20px',
    boxShadow: '0 2px 2px rgba(0,0,0,0.9)',
    overflow: 'hidden',
    transition: 'all 0.25s',
    '&:hover':{
      transform: 'translateY(15px)',
      boxShadow: '0 12px 16px rgba(0,0,0,0.2)'
    }
  },

  media: {
    height: 140,
  },
  title:{
    fontSize:'20px',
    color:'black'
  },
  btns:{
    display:'flex',
    margin:'5px 5px' ,
    justifyContent:'space-evently'
  },
  text:{
    textTransform:'capitalize'
  }
});

export default function MediaCard({id,imageUrl,name,address,city}) {

  const classes = useStyles();
  
  return (
    <Card className={classes.root} key={id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={name}
        />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
            className={classes.text}
          >
            {address}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            component="p"
            className={classes.text}
          >
            {city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.btns}>
          <div className={classes.btns}>
            <StoresDetails name= 'users' nameStore={name} id={id}/>
          </div>
          <div className={classes.btns}>
            <StoresDetails name= 'stats' nameStore={name} id={id}/>
          </div>
          
        </div>
      </CardActions>
        
    </Card>
  );
}

MediaCard.propTypes= {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city:PropTypes.string.isRequired
}