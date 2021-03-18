import axios from "axios";
import MapData from '../../assets/localdata/countries_name_code.json';
import CountriesNameCode from '../../assets/localdata/countries_name_code.json';
const initialState = {
	Isloading:true,
	ArticleIsloading:true,
	Articles:{},
	world_total:{}
};


const reducer = (state = initialState, action) => {
  const newState = { ...state };
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
  switch (action.type) {
    case "GET_WORLD_DATA": 
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
            newState.data = data_structure;
            newState.countries_stat = response.data.countries_stat;
            newState.world_total = response.data.world_total;
            newState.Isloading = false;
            newState.statistic_taken_at = response.data.statistic_taken_at;
      }).catch(function (error) {
        newState.Isloading = true;
        console.error(error);
      });
    break;

    case "GET_NEWS_DATA":
        axios.request(Newsoptions).then(function (response) {
          newState.ArticleIsloading = false;
          newState.Articles = response.data.articles;
        }).catch(function (error) {
          console.error(error);
        });
    break;

    case "LOADING":
      newState.loading = true;
	break;

  }
  return newState;
};

export default reducer;
