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
import Typography from '@material-ui/core/Typography';
import Spinner from "../views/Spinner/Spinner";

import MapData from '../assets/localdata/world_countries.json';
import CountriesNameCode from '../assets/localdata/countries_name_code.json';

import axios from "axios";
import moment from 'moment'

class Home extends Component {
    
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
        const options = {
          method: 'GET',
          url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api',
          headers: {
            'x-rapidapi-key': '826ef840c9msha6d7b937a818a54p1592bajsneb1a1e3980d4',
            'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com'
          }
        };
    
        const Newsoptions = {
            method: 'GET',
            url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
            params: {q: 'covid', lang: 'en', media: 'True'},
            headers: {
              'x-rapidapi-key': '826ef840c9msha6d7b937a818a54p1592bajsneb1a1e3980d4',
              'x-rapidapi-host': 'covid-19-news.p.rapidapi.com'
            }
          };
            const preventDefault = (event) => event.preventDefault();
          
          axios.request(Newsoptions).then(function (response) {
              self.setState({ArticleIsloading:false})
              self.setState({Articles:response.data.articles});
              console.log("this.state",self.state.Articles)
    
          }).catch(function (error) {
              console.error(error);
          });
    
        axios.request(options).then(function (response) {
                let data_structure = [];
                let table_data_structure = [];
                Object.keys(response.data.countries_stat).map((countries_stat,index)=>{
                    Object.keys(CountriesNameCode.countries).map((countries,cindex)=>{
                        if(response.data.countries_stat[countries_stat].country_name == CountriesNameCode.countries[countries].name){
                        let data_str = {"id":CountriesNameCode.countries[countries].alpha3,"value":parseFloat(response.data.countries_stat[countries_stat].cases.replace(/,/g, ''))};
                        data_structure.push(data_str)
                        }
                    })
                })
            self.setState({data:data_structure,countries_stat:response.data.countries_stat,world_total:response.data.world_total,Isloading:true,statistic_taken_at:response.data.statistic_taken_at})
            Object.keys(self.state.countries_stat).map((countries_stat,index)=>{
                let data_str = {"id":index+1,"country_name":self.state.countries_stat[countries_stat].country_name,"new_cases":self.state.countries_stat[countries_stat].new_cases,"active_cases":self.state.countries_stat[countries_stat].active_cases,"deaths":self.state.countries_stat[countries_stat].deaths,"total_recovered":self.state.countries_stat[countries_stat].total_recovered};
                table_data_structure.push(data_str)
            })
            self.setState({TableData:table_data_structure})
        }).catch(function (error) {
          self.setState({Isloading:false})
          console.error(error);
        });
      }

    render() {
      const Articles = this.state.Articles;
        // console.log("this.state.data",this.state.TableData)
        return (
            <Grid container spacing={3}>
                {this.state.Isloading ?
                    <>
                        {/* Card Section */}
                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="Active Cases" icon={<TrendingUp/>} style={{background: '#fdaeae'}} cost={this.state.world_total.active_cases}/>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="New Cases" icon={<TrendingUp/>} style={{background: '#89c9f3'}} cost={this.state.world_total.new_cases}/>
                        </Grid>
                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="New Deaths" icon={<TrendingUp/>} style={{background: '#f1cc65'}} cost={this.state.world_total.new_deaths}/>
                        </Grid>

                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="Total Cases" icon={<HowToReg/>} style={{background: '#97e8b0'}} cost={this.state.world_total.total_cases}/>
                        </Grid>

                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="Total Recovered" icon={<HowToReg/>} style={{background: '#97e8b0'}} cost={this.state.world_total.total_recovered}/>
                        </Grid>

                        <Grid item lg={4} md={12} xs={12}>
                            <InfoCards heading="Total Deaths" icon={<MoodBad/>} style={{background: '#ce5757'}} cost={this.state.world_total.total_deaths}/>
                        </Grid>

                        {/* Map Section */}
                        <Grid item lg={12} md={12} xs={12} >
                            <Card elevation={1} >
                                <CardHeader titleTypographyProps={{variant:'h4' }} title="World Wide Update"/>
                                <CardContent className="main-map-div">
                                    <ResponsiveChoropleth
                                                    data={this.state.data}
                                                    features={MapData.features}
                                                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                    colors="nivo"
                                                    domain={[ 0, 1000000 ]}
                                                    unknownColor="#666666"
                                                    label="properties.name"
                                                    valueFormat=".2s"
                                                    projectionTranslation={[ 0.5, 0.5 ]}
                                                    projectionRotation={[ 0, 0, 0 ]}
                                                    enableGraticule={true}
                                                    graticuleLineColor="#dddddd"
                                                    borderWidth={0.5}
                                                    borderColor="#152538"
                                                    legends={[
                                                        {
                                                            anchor: 'bottom-left',
                                                            direction: 'column',
                                                            justify: true,
                                                            translateX: 20,
                                                            translateY: -100,
                                                            itemsSpacing: 0,
                                                            itemWidth: 94,
                                                            itemHeight: 18,
                                                            itemDirection: 'left-to-right',
                                                            itemTextColor: '#444444',
                                                            itemOpacity: 0.85,
                                                            symbolSize: 18,
                                                            effects: [
                                                                {
                                                                    on: 'hover',
                                                                    style: {
                                                                        itemTextColor: '#000000',
                                                                        itemOpacity: 1
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]}
                                                />
                                </CardContent>
                            </Card>
                        </Grid>
                        </>
                        :<><Spinner /></>
                    }
                <Grid item lg={12} md={12} xs={12}>
                    <Table List={this.state.TableData}/>
                </Grid>
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
  )(Home);
