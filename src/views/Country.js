import React,{ Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Box,
    Container,
    CardMedia
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Who1 from '../assets/images/covidprecuations/Who1.jpg'
import Who2 from '../assets/images/covidprecuations/Who2.jpg'
import Who3 from '../assets/images/covidprecuations/Who3.jpg'
import Who4 from '../assets/images/covidprecuations/Who4.jpg'
import Who5 from '../assets/images/covidprecuations/Who5.png'
import Who6 from '../assets/images/covidprecuations/Who6.jpg'


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Searchloading:false,
          cntryid:'',
          SelectedCountry:{}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
        if(values!== null ){
            this.setState({cntryid:values.name});
        }else{
            this.setState({cntryid:null});
        }
    }
    handleSearch(){
        if(this.state.cntryid !== null && this.state.cntryid !== ''){
                const Countries = this.state.countries_stat;
                this.setState({Searchloading:true});
                const Country = Object.keys(Countries).map((Country)=>{
                    if(Countries[Country].country_name == this.state.cntryid){
                        return Countries[Country];
                    }
                });
                const SelectedCountry = Object.keys(Country).reduce((acc, key) => {
                    const _acc = acc;
                    if (Country[key] !== undefined) _acc[key] = Country[key];
                    return _acc;
                }, {})
                setTimeout(() => {
                    this.setState({SelectedCountry:SelectedCountry})
                    this.setState({Searchloading:false})
                    Object.keys(SelectedCountry).length == 0 ? this.setState({DataAvail:false}) : this.setState({DataAvail:true})
                }, 600)

            }
        }
    render() {
      const countries = CountriesNameCode.countries;
      const SelectedCountry = this.state.SelectedCountry;
        return (
            <Grid container spacing={3}>
                {this.state.Isloading ?
                        <>
                            {/* Card Section */}
                            <Grid item lg={10} md={12} sm={12} xs={12}>
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
                                        clearOnBlur={false}
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
                            </Grid>
                            <Grid item lg={2}  md={12} sm={12} xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    className="search-button"
                                    onClick={this.handleSearch}
                                    startIcon={this.state.Searchloading ? <CircularProgress /> : <Search/>}
                                    >
                                    Search
                                </Button>
                            </Grid>
                        </>
                        :<><Spinner /></>
                    }
                    {
                        this.state.DataAvail == false   ? 
                            <Zoom in={true}>
                                <Grid item lg={12} md={12} xs={12}>
                                    <Typography variant="h1" align="center">OOps...</Typography>
                                    <Typography
                                        align="center"
                                        color="textPrimary"
                                        variant="subtitle2"
                                    ><Box p={2}>
                                        {this.state.cntryid} Data is not available right now . . !
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Zoom>
                        :false
                        
                        // <Zoom in={true}>
                        //     <Grid item lg={12} md={12} xs={12}>
                        //         <Typography variant="h1" align="center">OOps...111</Typography>
                        //         <Typography
                        //             align="center"
                        //             color="textPrimary"
                        //             variant="subtitle2"
                        //         ><Box p={2}>
                        //             {this.state.cntryid} Data is not available
                        //             </Box>
                        //         </Typography>
                        //     </Grid>
                        // </Zoom>
                    }
                    {
                    Object.keys(SelectedCountry).length != 0 ? 
                        // <>
                        //    <Zoom in={true}>
                        //         <Grid item lg={12} md={12} xs={12}>
                        //             <Typography variant="h1" align="center">OOps... </Typography>
                        //             <Typography
                        //                 align="center"
                        //                 color="textPrimary"
                        //                 variant="subtitle2"
                        //             ><Box p={2}>
                        //                 {this.state.cntryid} Data is not available
                        //                 </Box>
                        //             </Typography>
                        //         </Grid>
                        //     </Zoom>
                        // </>
                        Object.keys(SelectedCountry).map((Country)=>(
                            <>
                                <Zoom in={true}>
                                    <Grid item lg={12} md={12} xs={12}>
                                        <Typography variant="h1" align="center">{SelectedCountry[Country].country_name}</Typography>
                                    </Grid>
                                </Zoom>
                                <Zoom in={true}>
                                    <Grid item lg={4} md={12} xs={12}>
                                        <InfoCards heading="Active Cases" icon={<TrendingUp/>} style={{background: '#fdaeae'}} cost={SelectedCountry[Country].active_cases}/>
                                    </Grid>
                                </Zoom>
                                <Zoom in={true}>
                                    <Grid item lg={4} md={12} xs={12}>
                                        <InfoCards heading="New Cases" icon={<TrendingUp/>} style={{background: '#89c9f3'}} cost={SelectedCountry[Country].new_cases}/>
                                    </Grid>
                                </Zoom>
                                <Zoom in={true}>
                                    <Grid item lg={4} md={12} xs={12}>
                                        <InfoCards heading="New Deaths" icon={<TrendingUp/>} style={{background: '#f1cc65'}} cost={SelectedCountry[Country].deaths}/>
                                    </Grid>
                                </Zoom>
                                <Zoom in={true}>
                                
                                <Grid item lg={4} md={12} xs={12}>
                                    <InfoCards heading="Deaths Per 1 Million Population" icon={<TrendingUp/>} style={{background: '#fdaeae'}} cost={SelectedCountry[Country].deaths_per_1m_population}/>
                                </Grid>
                                </Zoom>

                                <Zoom in={true}>
                                
                                <Grid item lg={4} md={12} xs={12}>
                                    <InfoCards heading="Serious Cases" icon={<TrendingUp/>} style={{background: '#89c9f3'}} cost={SelectedCountry[Country].serious_critical}/>
                                </Grid>
                                </Zoom>

                                <Zoom in={true}>
                                
                                <Grid item lg={4} md={12} xs={12}>
                                    <InfoCards heading="Cases Per 1 Million Population" icon={<TrendingUp/>} style={{background: '#f1cc65'}} cost={SelectedCountry[Country].total_cases_per_1m_population}/>
                                </Grid>
                                </Zoom>


                                <Zoom in={true}>
                                
                                <Grid item lg={4} md={12} xs={12}>
                                    <InfoCards heading="Total Cases" icon={<HowToReg/>} style={{background: '#97e8b0'}} cost={SelectedCountry[Country].cases}/>
                                </Grid>
                                </Zoom>


                                <Zoom in={true}>
                                    <Grid item lg={4} md={12} xs={12}>
                                        <InfoCards heading="Total Recovered" icon={<HowToReg/>} style={{background: '#97e8b0'}} cost={SelectedCountry[Country].total_recovered}/>
                                    </Grid>
                                </Zoom>

                                <Zoom in={true}>
                                <Grid item lg={4} md={12} xs={12}>
                                    <InfoCards heading="Total Deaths" icon={<MoodBad/>} style={{background: '#ce5757'}} cost={SelectedCountry[Country].deaths}/>
                                </Grid>
                                </Zoom>

                            </>
                        )):false
                    }
                        <Grid item lg={6} md={6} xs={12}>
                            <img src={Who3} className="who-image" />
                        </Grid>

                        <Grid item lg={6} md={6} xs={12}>
                            <img src={Who1} className="who-image" />
                        </Grid>
                        

                        <Grid item lg={6} md={6} xs={12}>
                            <img src={Who2} className="who-image" />
                        </Grid>
                        
                        <Grid item lg={6} md={6} xs={12}>
                            <img src={Who4} className="who-image" />
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
