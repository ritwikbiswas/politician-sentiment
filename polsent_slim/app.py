#!/usr/bin/python
import os, sys #os and system calls
import urllib, json #json handling
from pymongo import MongoClient
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer #for sentiment analysis
from twitterscraper import query_tweets
from senators import * #import senator list
from flask import Flask, jsonify #Flask for api
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#function that analyzes input_text and return sentiment object
def sentiment_analysis(input_text):
	#print "sent start"+ strftime("%Y-%m-%d %H:%M:%S", gmtime())
	analyzer = SentimentIntensityAnalyzer()
	vs = analyzer.polarity_scores(input_text)
	#print "sent_done"+ strftime("%Y-%m-%d %H:%M:%S", gmtime())
	return vs

#Simply checks to see if term exists and if so
@app.route('/<string:search_phrase>', methods=['GET'])
@cross_origin()
def extract_tweets(search_phrase):
    #do string splitting to get search phrase and senator handle
    split_array = [x.strip() for x in search_phrase.split(',')]
    print(split_array)
    query = split_array[0]
    senator_handle = split_array[1]
    since_date = split_array[2]
    until_date = split_array[3]
    out = {}
    out['phrase'] = query.lower()
    out['senator_handle'] = senator_handle
    out['metrics'] = {'sentiment':0, 'tweet_volume':0, 'from':"", 'until':""}
    

    #Construct Search Query and senator specific metrics
    query_total = query.lower() + " from:" + senator_handle + " since:" + since_date + " until:" + until_date
    tweet_number = 0.0
    avg_sentiment = 0.0

    #Iterate through tweets calculating total sentiment and updating search volume
    for tweet in query_tweets(query_total):
        tweet_number += 1
        avg_sentiment += sentiment_analysis(tweet.text)["compound"]
        #print(tweet.text)

    #if senators tweet count = 0, reset sent and number to NaN
    tweet_count_str = "none"
    if tweet_number != 0:
        tweet_count_str = str("{0:.2f}".format(avg_sentiment/tweet_number))

    #print and send to out senator specific tweet count
    out['metrics'] = {'sentiment': tweet_count_str, 'tweet_volume' : tweet_number, 'from' : since_date, 'until' : until_date}
    print("senator:"  + senator_handle + "\tS: " + tweet_count_str + "\t  N: " + str(tweet_number))
    
    #return
    output = jsonify(out)
    return output

def get_db():
    connection = MongoClient('mongodb://ds239387.mlab.com:39387, 61016')
    db = connection["polsent"]
    db.authenticate("ritwikbiswas","suripre225")
    return db

def add_country(db):
    db.countries.insert({"name" : "USA"})
    
def get_country(db):
    return db.countries.find_one()

if __name__ == "__main__":
    # db = get_db() 
    # add_country(db)
    # print get_country(db)
    #extract_tweets("trump")
    app.run()


