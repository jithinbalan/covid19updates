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
import { HowToReg,MoodBad,TrendingUp } from '@material-ui/icons';
import * as actionCreator from "../store/actions/actions";
import { connect } from "react-redux";
import Spinner from "./Spinner/Spinner";

import MapData from '../assets/localdata/world_countries.json';
import CountriesNameCode from '../assets/localdata/countries_name_code.json';

import axios from "axios";
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {  Search} from '@material-ui/icons';
import { object } from 'prop-types';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Isloading:false,
          ArticleIsloading:true,
          Articles:{},
          Dummy:['1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1',],
          TableData:[]
        };
        this.handleChange = this.handleChange.bind(this);
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
            const filter = createFilterOptions();

            axios.request(options).then(function (response) {
                let data_structure = [];
                Object.keys(response.data.countries_stat).map((countries_stat,index)=>{
                    Object.keys(CountriesNameCode.countries).map((countries,cindex)=>{
                        if(response.data.countries_stat[countries_stat].country_name == CountriesNameCode.countries[countries].name){
                        let data_str = {"id":CountriesNameCode.countries[countries].alpha3,"value":parseFloat(response.data.countries_stat[countries_stat].cases.replace(/,/g, ''))};
                        data_structure.push(data_str)
                        }
                    })
                })
                self.setState({data:data_structure,countries_stat:response.data.countries_stat,world_total:response.data.world_total,Isloading:true,statistic_taken_at:response.data.statistic_taken_at})
            }).catch(function (error) {
            self.setState({Isloading:false})
            console.error(error);
            });
        }

    handleChange = (event, values) => {
        const Countries = this.state.data;
        Object.keys(Countries).filter((Country)=>{
            
            console.log(Country) 

            console.log(values.alpha3) 
        })

    }
    render() {
      const countries = CountriesNameCode.countries
        return (
            <Grid container spacing={3}>
                {this.state.Isloading ?
                    <>
                        {/* Card Section */}
                        <Grid item lg={12} md={12} xs={12}>
                            {/* <Paper component="form" > */}
                                    <Autocomplete
                                        id="country-select-demo"
                                        className="country-select-demo"
                                        // style={{ width: 300 }}
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(option) => (
                                            <>
                                            {option.name} ({option.alpha3})
                                            </>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                            {...params}
                                            label="Choose a country"
                                            variant="outlined"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                            />
                                        )}
                                        onChange={this.handleChange}
                                    />
                            {/* </Paper> */}
                        </Grid>
                        {/* <Grid item lg={2} md={12} xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className="search-button"
                                startIcon={<Search />}
                                // onClick=
                            >
                                Search
                            </Button>
                        </Grid> */}
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
                        
                        </>
                        :<><Spinner /></>
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
  )(Home);
