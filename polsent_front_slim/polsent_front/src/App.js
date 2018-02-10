import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fire from './fire';
import $ from 'jquery';
import Modal, {closeStyle} from 'simple-react-modal'
import {LineChart, PieChart, Pie, Cell, Sector, ResponsiveContainer, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
var myInit = { method: 'GET',
               mode: 'no-cors',
               cache: 'default' };
const RADIAN = Math.PI / 180;
const COLORS = ['#F44336', '#2196F3', '#9C27B0', '#FF8042'];
var data = [{name: 'Group A', value: 600}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const senators=[
        {"name": "Doug Jones", "twitter_handle": "GDouglasJones", "state": "Alabama", "party": "D"},
        {"name": "Richard Shelby", "twitter_handle": "SenShelby", "state": "Alabama", "party": "R"},
        {"name": "Dan Sullivan", "twitter_handle": "SenDanSullivan", "state": "Alaska", "party": "R"},
        {"name": "Lisa Murkowski", "twitter_handle": "lisamurkowski", "state": "Alaska", "party": "R"},
        {"name": "John McCain", "twitter_handle": "SenJohnMcCain", "state": "Arizona", "party": "R"},
        {"name": "Jeff Flake", "twitter_handle": "JeffFlake", "state": "Arizona", "party": "R"},
        {"name": "Tom Cotton", "twitter_handle": "SenTomCotton", "state": "Arkansas", "party": "R"},
        {"name": "John Boozman", "twitter_handle": "JohnBoozman", "state": "Arkansas", "party": "R"},
        {"name": "Dianne Feinstein", "twitter_handle": "SenFeinstein", "state": "California", "party": "D"},
        {"name": "Kamala Harris", "twitter_handle": "KamalaHarris", "state": "California", "party": "D"},
        {"name": "Cory Gardner", "twitter_handle": "SenCoryGardner", "state": "Colorado", "party": "R"},
        {"name": "Michael Bennet", "twitter_handle": "SenBennetCO", "state": "Colorado", "party": "D"},
        {"name": "Richard Blumenthal", "twitter_handle": "SenBlumenthal", "state": "Connecticut", "party": "D"},
        {"name": "Chris Murphy", "twitter_handle": "ChrisMurphyCT", "state": "Connecticut", "party": "D"},
        {"name": "Tom Carper", "twitter_handle": "SenatorCarper", "state": "Delaware", "party": "D"},
        {"name": "Chris Coons", "twitter_handle": "ChrisCoons", "state": "Delaware", "party": "D"},
        {"name": "Bill Nelson", "twitter_handle": "SenBillNelson", "state": "Florida", "party": "D"},
        {"name": "Marco Rubio", "twitter_handle": "marcorubio", "state": "Florida", "party": "R"},
        {"name": "David Perdue", "twitter_handle": "sendavidperdue", "state": "Georgia", "party": "R"},
        {"name": "Johnny Isakson", "twitter_handle": "SenatorIsakson", "state": "Georgia", "party": "R"},
        {"name": "Brian Schatz", "twitter_handle": "SenBrianSchatz", "state": "Hawaii", "party": "D"},
        {"name": "Mazie Hirono", "twitter_handle": "maziehirono", "state": "Hawaii", "party": "D"},
        {"name": "Jim Risch", "twitter_handle": "SenatorRisch", "state": "Idaho", "party": "R"},
        {"name": "Mike Crapo", "twitter_handle": "MikeCrapo", "state": "Idaho", "party": "R"},
        {"name": "Tammy Duckworth", "twitter_handle": "senjohnbarrasso", "state": "Illinois", "party": "D"},
        {"name": "Dick Durbin", "twitter_handle": "SenatorDurbin", "state": "Illinois", "party": "D"},
        {"name": "Todd Young", "twitter_handle": "SenToddYoung", "state": "Indiana", "party": "R"},
        {"name": "Joe Donnelly", "twitter_handle": "SenDonnelly", "state": "Indiana", "party": "D"},
        {"name": "Joni Ernst", "twitter_handle": "SenJoniErnst", "state": "Iowa", "party": "R"},
        {"name": "Chuck Grassley", "twitter_handle": "ChuckGrassley", "state": "Iowa", "party": "R"},
        {"name": "Pat Roberts", "twitter_handle": "SenPatRoberts", "state": "Kansas", "party": "R"},
        {"name": "Jerry Moran", "twitter_handle": "JerryMoran", "state": "Kansas", "party": "R"},
        {"name": "Mitch McConnell", "twitter_handle": "SenateMajLdr", "state": "Kentucky", "party": "R"},
        {"name": "Rand Paul", "twitter_handle": "RandPaul", "state": "Kentucky", "party": "R"},
        {"name": "John Kennedy", "twitter_handle": "SenJohnKennedy", "state": "Louisiana", "party": "R"},
        {"name": "Bill Cassidy", "twitter_handle": "BillCassidy", "state": "Louisiana", "party": "R"},
        {"name": "Angus King", "twitter_handle": "SenAngusKing", "state": "Maine", "party": "I"},
        {"name": "Susan Collins", "twitter_handle": "SenatorCollins", "state": "Maine", "party": "R"},
        {"name": "Ben Cardin", "twitter_handle": "SenatorCardin", "state": "Maryland", "party": "D"},
        {"name": "Chris Van Hollen", "twitter_handle": "ChrisVanHollen", "state": "Maryland", "party": "D"},
        {"name": "Elizabeth Warren", "twitter_handle": "SenWarren", "state": "Massachusetts", "party": "D"},
        {"name": "Ed Markey", "twitter_handle": "SenMarkey", "state": "Massachusetts", "party": "D"},
        {"name": "Gary Peters", "twitter_handle": "SenGaryPeters", "state": "Michigan", "party": "D"},
        {"name": "Debbie Stabenow", "twitter_handle": "SenStabenow", "state": "Michigan", "party": "D"},
        {"name": "Amy Klobuchar", "twitter_handle": "amyklobuchar", "state": "Minnesota", "party": "D"},
        {"name": "Al Franken", "twitter_handle": "alfranken", "state": "Minnesota", "party": "D"},
        {"name": "Thad Cochran", "twitter_handle": "SenThadCochran", "state": "Mississippi", "party": "R"},
        {"name": "Roger Wicker", "twitter_handle": "SenatorWicker", "state": "Mississippi", "party": "R"},
        {"name": "Roy Blunt", "twitter_handle": "RoyBlunt", "state": "Missouri", "party": "R"},
        {"name": "Claire McCaskill", "twitter_handle": "clairecmc", "state": "Missouri", "party": "D"},
        {"name": "Jon Tester", "twitter_handle": "SenatorTester", "state": "Montana", "party": "D"},
        {"name": "Steve Daines", "twitter_handle": "SteveDaines", "state": "Montana", "party": "R"},
        {"name": "Ben Sasse", "twitter_handle": "SenSasse", "state": "Nebraska", "party": "R"},
        {"name": "Deb Fischer", "twitter_handle": "SenatorFischer", "state": "Nebraska", "party": "R"},
        {"name": "Cortez Masto", "twitter_handle": "SenCortezMasto", "state": "Nevada", "party": "D"},
        {"name": "Dean Heller", "twitter_handle": "SenDeanHeller", "state": "Nevada", "party": "R"},
        {"name": "Maggie Hassan", "twitter_handle": "SenatorHassan", "state": "New Hampshire", "party": "D"},
        {"name": "Jeanne Shaheen", "twitter_handle": "SenatorShaheen", "state": "New Hampshire", "party": "D"},
        {"name": "Bob Menendez", "twitter_handle": "SenatorMenendez", "state": "New Jersey", "party": "D"},
        {"name": "Cory Booker", "twitter_handle": "CoryBooker", "state": "New Jersey", "party": "D"},
        {"name": "Martin Heinrich", "twitter_handle": "MartinHeinrich", "state": "New Mexico", "party": "D"},
        {"name": "Tom Udall", "twitter_handle": "SenatorTomUdall", "state": "New Mexico", "party": "D"},
        {"name": "Kirsten Gillibrand", "twitter_handle": "SenGillibrand", "state": "New York", "party": "D"},
        {"name": "Chuck Schumer", "twitter_handle": "SenSchumer", "state": "New York", "party": "D"},
        {"name": "Thom Tillis", "twitter_handle": "SenThomTillis", "state": "North Carolina", "party": "R"},
        {"name": "Richard Burr", "twitter_handle": "SenatorBurr", "state": "North Carolina", "party": "R"},
        {"name": "Heidi Heitkamp", "twitter_handle": "SenatorHeitkamp", "state": "North Dakota", "party": "D"},
        {"name": "John Hoeven", "twitter_handle": "SenJohnHoeven", "state": "North Dakota", "party": "D"},
        {"name": "Sherrod Brown", "twitter_handle": "SenSherrodBrown", "state": "Ohio", "party": "D"},
        {"name": "Rob Portman", "twitter_handle": "senrobportman", "state": "Ohio", "party": "R"},
        {"name": "James Lankford", "twitter_handle": "SenatorLankford", "state": "Oklahoma", "party": "R"},
        {"name": "Jim Inhofe", "twitter_handle": "jiminhofe", "state": "Oklahoma", "party": "R"},
        {"name": "Ron Wyden", "twitter_handle": "RonWyden", "state": "Oregon", "party": "D"},
        {"name": "Jeff Merkley", "twitter_handle": "SenJeffMerkley", "state": "Oregon", "party": "D"},
        {"name": "Pat Toomey", "twitter_handle": "SenToomey", "state": "Pennsylvania", "party": "R"},
        {"name": "Bob Casey", "twitter_handle": "SenBobCasey", "state": "Pennsylvania", "party": "D"},
        {"name": "Jack Reed", "twitter_handle": "SenJackReed", "state": "Rhode Island", "party": "D"},
        {"name": "Sheldon Whitehouse", "twitter_handle": "SenWhitehouse", "state": "Rhode Island", "party": "D"},
        {"name": "Tim Scott", "twitter_handle": "SenatorTimScott", "state": "South Carolina", "party": "R"},
        {"name": "Lindsey Graham", "twitter_handle": "GrahamBlog", "state": "South Carolina", "party": "R"},
        {"name": "Mike Rounds", "twitter_handle": "SenatorRounds", "state": "South Dakota", "party": "R"},
        {"name": "John Thune", "twitter_handle": "SenJohnThune", "state": "South Dakota", "party": "R"},
        {"name": "Lamar Alexander", "twitter_handle": "SenAlexander", "state": "Tennessee", "party": "R"},
        {"name": "Bob Corker", "twitter_handle": "SenBobCorker", "state": "Tennessee", "party": "R"},
        {"name": "Ted Cruz", "twitter_handle": "SenTedCruz", "state": "Texas", "party": "R"},
        {"name": "John Cornyn", "twitter_handle": "JohnCornyn", "state": "Texas", "party": "R"},
        {"name": "Orrin Hatch", "twitter_handle": "SenOrrinHatch", "state": "Utah", "party": "R"},
        {"name": "Mike Lee", "twitter_handle": "SenMikeLee", "state": "Utah", "party": "R"},
        {"name": "Patrick Leahy", "twitter_handle": "SenatorLeahy", "state": "Vermont", "party": "D"},
        {"name": "Bernie Sanders", "twitter_handle": "SenSanders", "state": "Vermont", "party": "I"},
        {"name": "Tim Kaine", "twitter_handle": "timkaine", "state": "Virginia", "party": "D"},
        {"name": "Mark Warner", "twitter_handle": "MarkWarner", "state": "Virginia", "party": "D"},
        {"name": "Patty Murray", "twitter_handle": "PattyMurray", "state": "Washington", "party": "D"},
        {"name": "Maria Cantwell", "twitter_handle": "SenatorCantwell", "state": "Washington", "party": "D"},
        {"name": "Joe Manchin", "twitter_handle": "Sen_JoeManchin", "state": "West Virginia", "party": "D"},
        {"name": "Shelley Moore Capito", "twitter_handle": "SenCapito", "state": "West Virginia", "party": "R"},
        {"name": "Tammy Baldwin", "twitter_handle": "SenatorBaldwin", "state": "Wisconsin", "party": "D"},
        {"name": "Ron Johnson", "twitter_handle": "SenRonJohnson", "state": "Wisconsin", "party": "R"},
        {"name": "Mike Enzi", "twitter_handle": "SenatorEnzi", "state": "Wyoming", "party": "R"},
        {"name": "John Barraso", "twitter_handle": "senjohnbarrasso", "state": "Wyoming", "party": "R"}]

var senator_info={}


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



//var fetch = require('node-fetch');
class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { loadHidden:true, state:{}, download_info:[], sent_graph:[], window_size: 12, selectedOption: '', status:"", total_tweet_volume:10, messages: [], sent_dem_sum:0, sent_rep_sum:0, sent_ind_sum:0, sent_dem:0, sent_rep:0, sent_ind:0, vol_dem:0, vol_rep:0, vol_ind:0, loading:"", data:[
      ]}
  }
  componentWillMount(){
    this.setState({download_info:['num',',name',',party',',state',',m1_sent',',m1_vol',',m2_sent',',m2_vol',',m3_sent',',m3_vol',',m4_sent',',m4_vol',',m5_sent',',m5_vol',',m6_sent',',m6_vol',',m7_sent',',m7_vol',',m8_sent',',m8_vol',',m9_sent',',m9_vol',',m10_sent',',m10_vol',',m11_sent',',m11_vol',',m12_sent',',m12_vol']});
    this.setState({sent_graph:[
                          {name: 'Rep', sentiment: -.3},
                          {name: 'Dem', sentiment: .5},
                          {name: 'Ind', sentiment: -.1}]});
    this.setState({vol_graph:[{name: 'Group A', value: 600}, {name: 'Group B', value: 200},
                  {name: 'Group C', value: 100}]});
  }

  _downloadTxtFile = () => {
    var element = document.createElement("a");
    var output = this.state.download_info
    var file = new Blob(output, {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    var out_text = this.state.term + ".txt"
    element.download = out_text;
    element.click();
  }

  show(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  addQuery(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    this.setState(this.state.loadHidden: false)
    /* Send the message to Firebase */
    //fire.database().ref('query').update({"term": this.inputEl.value} );
    var a = this.inputEl.value
    this.setState(this.state.term: a) // <- clear the input
    this.inputEl.value = '';
    this.state.loadHidden = true
  }
 handleSubmit(event) {
    event.preventDefault();
    this.setState({loadHidden: false})
    this.setState({status: ""})
    this.setState({avg:""})
    this.setState({ term: this.element.value });
    console.log(this.state.term)
    this.setState({total_tweet_volume: 0})
    this.setState({sent_dem_sum: 0})
    this.setState({sent_dem: 0})
    this.setState({vol_dem: 0})

    this.setState({sent_rep_sum: 0})
    this.setState({sent_rep: 0})
    this.setState({vol_rep: 0})

    this.setState({sent_ind_sum: 0})
    this.setState({sent_ind: 0})
    this.setState({vol_ind: 0})

    this.setState({sent_graph:[
                          {name: 'Rep', sentiment: 0},
                          {name: 'Dem', sentiment: 0},
                          {name: 'Ind', sentiment: 0}]});
    this.setState({vol_graph:[
                          {name: 'Group A', value: 0}, {name: 'Group B', value: 0},
                  {name: 'Group C', value: 0}]});
    var num_months = this.state.window_size
    var search_in_mongo = (String(this.element.value)).toLowerCase()
    if (num_months != 12) {
      search_in_mongo += String(num_months)
    }
    var url_mongo = "https://polsentmongo.herokuapp.com/terms/" + search_in_mongo
    console.log(url_mongo);
    console.log('fetching mongo');
    var do_full_calculation = false;
    fetch(url_mongo, { method: 'GET'}) // Make sure fetch is cross-origin, it's not by default (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) since the target URL of the API is a different 'origin' to our react app
        .then((resp) => resp.json())
        .then((resp) => { // data input parameter is the result of the resolved resp.json() Promise (see https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
            console.log("response: " + resp)
            if (resp['phrase'] != "matoosha123polagrep") {
              console.log("Found data!")
              this.setState({loadHidden: true})
              this.setState({sent_dem: resp['combined']['sentiment']['D']})
              this.setState({sent_rep: resp['combined']['sentiment']['R']})
              this.setState({sent_ind: resp['combined']['sentiment']['I']})
              this.setState({vol_dem: resp['combined']['tweet_volume']['D']})
              this.setState({vol_rep: resp['combined']['tweet_volume']['R']})
              this.setState({vol_ind: resp['combined']['tweet_volume']['I']})
              this.setState({total_tweet_volume: resp['combined']['tweet_volume']['Total']})
              this.setState({sent_graph:[
                            {name: 'Rep', sentiment: parseFloat(this.state.sent_rep)},
                            {name: 'Dem', sentiment: parseFloat(this.state.sent_dem)},
                            {name: 'Ind', sentiment: parseFloat(this.state.sent_ind)}]});
              this.setState({vol_graph:[
                            {name: 'Group A', value: this.state.vol_rep}, {name: 'Group B', value: this.state.vol_dem},
                    {name: 'Group C', value: this.state.vol_ind}]});
              data = this.state.vol_graph
              console.log(this.state.vol_dem);
              console.log(this.state.vol_rep);
              console.log(this.state.vol_ind);
              console.log(this.state.vol_graph);

            }
            else {
              console.log("Starting calculation...")
              var dates = [{'from': '2017-01-01', 'until': '2017-02-01'},
                           {'from': '2017-02-01', 'until': '2017-03-01'},
                           {'from': '2017-03-01', 'until': '2017-04-01'},
                           {'from': '2017-04-01', 'until': '2017-05-01'},
                           {'from': '2017-05-01', 'until': '2017-06-01'},
                           {'from': '2017-06-01', 'until': '2017-07-01'},
                           {'from': '2017-07-01', 'until': '2017-08-01'},
                           {'from': '2017-08-01', 'until': '2017-09-01'},
                           {'from': '2017-09-01', 'until': '2017-10-01'},
                           {'from': '2017-10-01', 'until': '2017-11-01'},
                           {'from': '2017-11-01', 'until': '2017-12-01'},
                           {'from': '2017-12-01', 'until': '2018-01-01'}]

              var url = "https://polsent.herokuapp.com/" + (String(this.element.value)).toLowerCase()
              console.log(url)
              console.log('fetching it');
              var responses = []
              var response_count = 0;
              //loop through every senator
              for (var i=0; i<senators.length; i++) {
                var temp_url = url
                temp_url += ","
                temp_url += senators[i]['twitter_handle']
                //Create dictionary here
                senator_info[senators[i]['twitter_handle']] = {'name' : senators[i]['name'], 'party' : senators[i]['party'], 'state' : senators[i]['state']}
                //add to download output
                this.setState({download_info: this.state.download_info.concat(['\n', i, ',', senators[i]['name'], ',', senators[i]['party'], ',', senators[i]['state']])});
                //console.log(senator_info)
                for (var a=dates.length-1; a>=12-num_months; a--) {
                  var temp_url_2 = temp_url
                  temp_url_2 += ","
                  temp_url_2 += dates[a]['from']
                  temp_url_2 += ","
                  temp_url_2 += dates[a]['until']

                  fetch(temp_url_2, { method: 'GET'}) // Make sure fetch is cross-origin, it's not by default (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) since the target URL of the API is a different 'origin' to our react app
                    .then((resp) => resp.json())
                    .then((resp) => { // data input parameter is the result of the resolved resp.json() Promise (see https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
                      //console.log(resp)
                      responses.push(resp)
                      response_count += 1
                      var current_status = parseFloat(100.0*response_count/(num_months*100)).toFixed(0)
                      current_status = ' [' + current_status + '%]'
                      console.log(current_status)
                      this.setState({status: current_status})
                      if (response_count == num_months*100-2) {
                        //console.log(responses)
                        this.setState({status: ""})
                        this.setState({loadHidden: true})
                        //Implement all the full senator information later when USED
                        var out={}
                        var output_phrase = (String(this.element.value)).toLowerCase()
                        if (num_months != 12) {
                          output_phrase += String(num_months)
                        }
                        out['phrase'] = output_phrase
                        out['combined']={}
                        //out['combined']['count'] = {"D":0, "R":0, "I":0}
                        out['combined']['sentiment'] = {"D":this.state.sent_dem, "R":this.state.sent_rep, "I":this.state.sent_ind}
                        out['combined']['tweet_volume'] = {"D":this.state.vol_dem, "R":this.state.vol_rep, "I":this.state.vol_ind,"Total":this.state.total_tweet_volume}
                        fetch('https://polsentmongo.herokuapp.com/terms/', {
                          method: 'post',
                          headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json, text/plain, */*'
                          },
                         body:JSON.stringify(out)
                        }).then(res=>res.json())
                          .then(res => console.log(res));
                        console.log(out)
                      }
                      //ADDD TWEET VOLUME AND SENTIMENT INFORMATION TO OUTPUT FILE HERE//////
                      var avg_sentiment_piece_download = 0.0
                          if (resp['metrics']['sentiment'] != "none")
                            avg_sentiment_piece_download = parseFloat(resp['metrics']['sentiment'])
                      this.setState({download_info: this.state.download_info.concat([',', avg_sentiment_piece_download, ',', resp['metrics']['tweet_volume']])});
                      //Take incoming resp and add it to corresponding sentime
                      console.log(senator_info[resp['senator_handle']]['name'] + " " + senator_info[resp['senator_handle']]['party'])
                      var current_senator_party = senator_info[resp['senator_handle']]['party']
                      switch(current_senator_party) {
                        case "R":
                          //collect tweet volume and append to overall
                          var rep_vol = this.state.vol_rep + parseInt(resp['metrics']['tweet_volume'])
                          this.state.total_tweet_volume += parseInt(resp['metrics']['tweet_volume'])
                          //collect avg sentiment and append to overall
                          var avg_sentiment_piece = 0.0
                          if (resp['metrics']['sentiment'] != "none")
                            avg_sentiment_piece = parseFloat(resp['metrics']['sentiment'])
                          var total_rep_sent = this.state.sent_rep_sum + parseFloat(resp['metrics']['tweet_volume']) * avg_sentiment_piece
                          //calculate overall party sentiment avg here
                          var avg_rep_sentiment = 0
                          if (rep_vol !=0)
                            avg_rep_sentiment = total_rep_sent/rep_vol
                          //assign back to global variables including graphs
                          this.setState({ sent_rep: avg_rep_sentiment});
                          this.setState({ sent_rep_sum: total_rep_sent});
                          this.setState({ vol_rep: rep_vol});
                          this.setState({sent_graph:[
                                    {name: 'Rep', sentiment: avg_rep_sentiment},
                                    {name: 'Dem', sentiment: this.state.sent_dem},
                                    {name: 'Ind', sentiment: this.state.sent_ind}]});
                          this.setState({vol_graph:[
                                    {name: 'Group A', value: rep_vol}, {name: 'Group B', value: this.state.vol_dem},
                            {name: 'Group C', value: this.state.vol_ind}]});
                          break;
                        case "D":
                          //collect tweet volume and append to overall
                          var dem_vol = this.state.vol_dem + parseInt(resp['metrics']['tweet_volume'])
                          this.state.total_tweet_volume += parseInt(resp['metrics']['tweet_volume'])
                          //collect avg sentiment and append to overall
                          var avg_sentiment_piece = 0.0
                          if (resp['metrics']['sentiment'] != "none")
                            avg_sentiment_piece = parseFloat(resp['metrics']['sentiment'])
                          var total_dem_sent = this.state.sent_dem_sum + parseFloat(resp['metrics']['tweet_volume']) * avg_sentiment_piece
                          //calculate overall party sentiment avg here
                          var avg_dem_sentiment = 0
                          if (dem_vol !=0)
                            avg_dem_sentiment = total_dem_sent/dem_vol
                          //assign back to global variables including graphs
                          this.setState({ sent_dem: avg_dem_sentiment});
                          this.setState({ sent_dem_sum: total_dem_sent});
                          this.setState({ vol_dem: dem_vol});
                          this.setState({sent_graph:[
                                    {name: 'Rep', sentiment: this.state.sent_rep},
                                    {name: 'Dem', sentiment: avg_dem_sentiment},
                                    {name: 'Ind', sentiment: this.state.sent_ind}]});
                          this.setState({vol_graph:[
                                    {name: 'Group A', value: this.state.vol_rep}, {name: 'Group B', value: dem_vol},
                            {name: 'Group C', value: this.state.vol_ind}]});
                          break;
                        case "I":
                          //collect tweet volume and append to overall
                          var ind_vol = this.state.vol_ind + parseInt(resp['metrics']['tweet_volume'])
                          this.state.total_tweet_volume += parseInt(resp['metrics']['tweet_volume'])
                          //collect avg sentiment and append to overall
                          var avg_sentiment_piece = 0.0
                          if (resp['metrics']['sentiment'] != "none")
                            avg_sentiment_piece = parseFloat(resp['metrics']['sentiment'])
                          var total_ind_sent = this.state.sent_ind_sum + parseFloat(resp['metrics']['tweet_volume']) * avg_sentiment_piece
                          //calculate overall party sentiment avg here
                          var avg_ind_sentiment = 0
                          if (ind_vol !=0)
                            avg_ind_sentiment = total_ind_sent/ind_vol
                          //assign back to global variables including graphs
                          this.setState({ sent_ind: avg_ind_sentiment});
                          this.setState({ sent_ind_sum: total_ind_sent});
                          this.setState({ vol_ind: ind_vol});
                          this.setState({sent_graph:[
                                    {name: 'Rep', sentiment: this.state.sent_rep},
                                    {name: 'Dem', sentiment: this.state.sent_dem},
                                    {name: 'Ind', sentiment: avg_ind_sentiment}]});
                          this.setState({vol_graph:[
                                    {name: 'Group A', value: this.state.vol_rep}, {name: 'Group B', value: this.state.vol_dem},
                            {name: 'Group C', value: ind_vol}]});
                          break;
                        default:
                          console.log("none!")
                          break;
                      }

                    })
                    .catch(function(error) {
                        console.log(JSON.stringify(error));
                    });
                }
              }
            }

            //this.setState({ term: data }); // setState sets the component state with the data from the API response
        })
        .catch(function(error) {
            console.log("incorrect JSON format")
        });
    console.log("here I am")


  }

  toggleHidden () {
    this.setState({
      loadHidden: !this.state.loadHidden
    })
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption});
    this.setState({window_size: selectedOption.value})
    console.log(`Selected: ${selectedOption.label}`);
  }
  state = { showing: true };
  render() {
    // //You must use window.$ or $ will be undefined
    // window.$(document).ready(function() {
    //     window.$('.modal').modal();
    // });
    const { showing } = this.state;
    return (
      <div>
      <div class="row">
            <div class="col s6">
              <h1 class="w800"><i>PolSent</i></h1>
              <h5 class="w300">An analysis of senator tweets  <a onClick={this.show.bind(this)}> <i class="material-icons valign-center">info_outline</i></a></h5>
            </div>

      </div>
      <div>

      <Modal
      containerStyle={{background: 'white'}} //changes styling on the inner content area
      containerClassName="test"
      closeOnOuterClick={true}
      show={this.state.show}
      onClose={this.close.bind(this)}>

      <a class="closeStyle" onClick={this.close.bind(this)}>X</a>
      <div>
        GIVE INFORMATION ABOUT USAGE HERE
      </div>

      </Modal>
      </div>
      <div>
        <input id="myInput" />
        <button onClick={this._downloadTxtFile}>Download txt</button>
      </div>
      <div class="row">
         <div class="col s9">
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="text" placeholder="Search Term Here" ref={el => this.element = el} />
              </label>
            </form>
          </div>
          <div class="col s3">
            Choose window size:
            <Select
              name="form-field-name"
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={[
                { value: 1, label: '1 month' },
                { value: 2, label: '2 months' },
                { value: 3, label: '3 months' },
                { value: 4, label: '4 months' },
                { value: 5, label: '5 months' },
                { value: 6, label: '6 months' },
                { value: 7, label: '7 months' },
                { value: 8, label: '8 months' },
                { value: 9, label: '9 months' },
                { value: 10, label: '10 months' },
                { value: 11, label: '11 months' },
                { value: 12, label: '12 months' },
              ]}
            />
          </div>
      </div>
      <div>
        {!this.state.loadHidden && <Child />}
      </div>
          <div class = "row">
            <div class = "center">
              <font size="6"><b>{this.state.term}</b></font><span class="green-text">{this.state.status}</span>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
            <div class="center">Average Sentiment by Party ({this.state.window_size} months)</div>
              <BarChart width={600} height={350} data={this.state.sent_graph}
                    >
                   <XAxis dataKey="name"/>
                   <barCategoryGap/>
                   <YAxis type="number" domain = {['auto', 'auto']}/>
                   <CartesianGrid strokeDasharray="1 1"/>
                   <Tooltip/>
                   <Bar dataKey="sentiment" fill="#2196F3" >
                     {
                        data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                   </Bar>

              </BarChart>
            </div>
            <div class="col s6">
            <div class="center">{this.state.window_size} Month Tweet Volume ({this.state.total_tweet_volume})</div>
              <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={this.state.vol_graph}
                  dataKey="value"
                  cx={280}
                  cy={150}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  fill="#8884d8"
                >
                  {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                  }
                </Pie>
              </PieChart>
            </div>
          </div>
      </div>
    );
  }
}

const Child = () => (
  <div class="progress">
      <div class="indeterminate"></div>
  </div>
)

export default App;
