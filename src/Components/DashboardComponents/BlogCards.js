  import {
    Divider,
    Card,
    CardContent,
    CardMedia, 
    Typography,
    makeStyles,
    Avatar,
    Box
  } from '@material-ui/core';
import moment from 'moment'

 const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 250,
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        
      }
  });
  const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    "http://i.pravatar.cc/300?img=3",
    "http://i.pravatar.cc/300?img=4"
  ];  
const InfoCards = (props) => {
  console.log(props)
    const classes = useStyles();
    return ( 
        <Card >
            <CardMedia
            className={classes.media}
            image={props.image}
            />
            <CardContent>
            <div className="word-wrap">

            <Typography
                
                variant={"h4"}
                gutterBottom
            >
                {props.title.substring(0, 100) + '...'}
            </Typography>
            </div>

            <div className="word-wrap">
              
            <Typography
                variant={"caption"}
            >
                {props.summary.substring(0, 150) + '...'}

                {/* {props.summary} */}
            </Typography>
            
            </div>
            </CardContent>
            <Divider  light />
            {/* <Box p={2}>
              {faces.map(face => (
                  <Avatar className={classes.avatar} key={face} src={face} />
              ))}
              {moment(props.published_date).from()}
            </Box> */}
        </Card>
    );
}
 
export default InfoCards;