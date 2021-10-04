  import {
    Divider,
    Card,
    CardContent,
    CardMedia, 
    Typography,
    makeStyles,
    Link
  } from '@material-ui/core';

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
            <Link href={props.link} target='_blank'>

              <div className="word-wrap">

                <Typography
                    variant={"h4"}
                    gutterBottom
                >
                    {props.title.substring(0, 100) + '...'}
                </Typography>
              </div>
            </Link>

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