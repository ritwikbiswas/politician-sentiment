# PolSent - An analysis of Politician Sentiment 
A web app that extracts sentiment from senator tweets about a search query

## Getting Started
To use this project you need to:
* Navigate to https://politiciansentiment.firebaseapp.com/
* Select a time range of tweets to analyze
* Type in a query to search for 
* Hit enter for analysis/data

## Built With
* JavaScript
* Python
* React.js
* [Rechart.js](http://recharts.org/#/en-US/)
* [Vader Sentiment](https://github.com/cjhutto/vaderSentiment)
* Heroku
* MongoDB
* Node
* Firebase

## Front End
The front end is a React web application which can handle a search query and a time range to search over. The app then scrapes the tweets from all 100 senators that contain the query term and extracts the sentiment from every tweet using [Vader Sentiment](https://github.com/cjhutto/vaderSentiment). The app then displays the sentiment of these tweets broken down by party lines. Other displayed metrics include the overall tweet volume and break down by party. The metrics for a given query is cached in MongoDB to be used in future queries to reduce latency.

## Back End
The backend is a python API written and hosted on heroku which can support a GET request with a given query term and senator twitter handle. The API then scrapes Twitter for tweets of the senator containing the given query. The metrics for tweet volume and sentiment are returned to the front end as a JSON object to be processed and displayed.

## Further development and features
Current features under development include:
* The ability for users to download the data of a given search term to further process/analyze
* Displaying a break down of tweet volume/sentiment by senator 
* Add aditional useful metrics regarding the twitter data
* Make frontend display mobile optimized

## Author
Ritwik Biswas
