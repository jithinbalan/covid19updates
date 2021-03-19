import React,{ Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
  } from '@material-ui/core';
import SalesOverview from  '../Components/DashboardComponents/SalesOverview'  
import Visitors from  '../Components/DashboardComponents/Visitors'  
import InfoCards from '../Components/DashboardComponents/InfoCard';
import Contacts from '../Components/DashboardComponents/Contact';
import Table from './Table'
import BlogCard from '../Components/DashboardComponents/BlogCards';
import us1 from '../assets/images/backgrounds/u1.jpg'
import us2 from '../assets/images/backgrounds/u2.jpg'
import us3 from '../assets/images/backgrounds/u3.jpg'
import us4 from '../assets/images/backgrounds/u4.jpg'
import { HowToReg,MoodBad,TrendingUp } from '@material-ui/icons';
import * as actionCreator from "../store/actions/actions";
import { connect } from "react-redux";
import { ResponsiveChoropleth } from '@nivo/geo';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Spinner from "./Spinner/Spinner";

import MapData from '../assets/localdata/world_countries.json';
import CountriesNameCode from '../assets/localdata/countries_name_code.json';

import axios from "axios";
import moment from 'moment'
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';

class News extends Component {
    
    // componentDidMount() {
    //     const { getWorldData,getNewsData} = this.props;
    //     getWorldData();
    //     getNewsData();
    // }

        constructor(props) {
            super(props);
            this.state = {
                Isloading:false,
                ArticleIsloading:true,
                Articles:{},
                Dummy:['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1',],
                TableData:[]
            };
        }
        componentDidMount(){
            let self = this;
            const Newsoptions = {
                method: 'GET',
                url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
                params: {q: 'covid', lang: 'en', media: 'True'},
                headers: {
                'x-rapidapi-key': '826ef840c9msha6d7b937a818a54p1592bajsneb1a1e3980d4',
                'x-rapidapi-host': 'covid-19-news.p.rapidapi.com'
                }
            };

            axios.request(Newsoptions).then(function (response) {
                self.setState({ArticleIsloading:false})
                self.setState({Articles:response.data.articles});
                console.log("this.state",self.state.Articles)
            }).catch(function (error) {
                console.error(error);
            });
        }

    render() {
      const Articles = this.state.Articles;
        // console.log("this.state.data",this.state.TableData)
        return (
            <Grid container spacing={3}>
                    {this.state.ArticleIsloading == false ? 
                            Object.keys(Articles).map(function(Article, index) {
                                return(
                                    <Zoom in={true}>
                                        <Grid item lg={4} md={12} xs={12} key={index}>
                                            <BlogCard summary={Articles[Article].summary} image={Articles[Article].media} title={Articles[Article].title}/>
                                        </Grid>
                                    </Zoom>
                                    
                                );
                            })
                        : <Spinner/>
                    }
            </Grid>
            
        );
    }
}
 
const mapStateToProps = state => {
    return {
        data:state.data,
		countries_stat:state.countries_stat,
		world_total:state.world_total,
		Isloading:state.Isloading,
		statistic_taken_at:state.statistic_taken_at,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
        getWorldData: () => dispatch(actionCreator.getWorldData()),
        getNewsData: () => dispatch(actionCreator.getNewsData()),
    };
  };
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(News);
