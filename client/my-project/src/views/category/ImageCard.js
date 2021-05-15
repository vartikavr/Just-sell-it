import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    backgroundColor: '#94618E',
    margin: '20px'
  },
  media: {
    width: 265,
    height: 240,
  },
  title: {
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    fontSize: '2rem',
    textAlign: 'center'
  },
  desc: {
    textAlign: 'center',
    color: '#282726',
    fontWeight: 'bold'

  },
  btntext: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    alignItems: 'center',
    color: '#fff',
  }
  //   media:{
  //     maxWidth: 645,
  //   }
});

export default function ImageCard({ category, id }) {
  const classes = useStyles();
  const history = useHistory();


  const handleSelect = (event) => {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.get('http://localhost:5000/categories', {

    },
      axiosConfig)
      .then((res) => {
        console.log(res, 'successfully sent id!');
        console.log("ok", id)
        history.push(`/categories/${id}`);
        //console.log(name, username, email);

      })
      .catch((e) => {
        console.log("client errror data:", e.response);
        if (e.response.data.isLoggedIn == false) {
          history.push('/login')
        }
        console.log("error in client", e)
      })

  }

  return (
    //<Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>

    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={category.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1" className={classes.title}>

          {category.title}

        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
          {category.desc}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" className="ms-auto me-auto" onClick={handleSelect}>
          <h5 className={classes.btntext}>Select</h5>
        </Button>
      </CardActions>
    </Card>


    // </Collapse>


  );
}
