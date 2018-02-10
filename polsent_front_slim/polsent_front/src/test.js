import React, { Component } from 'react';
import fire from './fire';
var url = "https://guarded-scrubland-57415.herokuapp.com/terms/" + "Hillary"
var myInit = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
fetch(url, myInit)
.then(function(response) {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  console.log("hey")
  return response.json();
})
.then(function(data) {
  console.log("hello")
});