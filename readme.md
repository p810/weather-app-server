# weather-app-server
> Gateway REST API that acts as a proxy for location and weather related data

## About
This is part of a small project that I'm working on to showcase my understanding of TypeScript and React (among other things). This API acts as a gateway to other APIs, returning a transformed JSON response to the app when it needs information about the user's location or weather forecast.

### How it works
For the purposes of the app, this API exposes a few simple endpoints that take the user's zip code or latitude and longitude, and return extended location information or a weather forecast, depending on the resource requested.

When Express processes a request, it will reference a list of API client objects and start with the first to attempt to get the necessary information. If there was an error with the request, or sufficient information wasn't returned, then it will move to the next API until there is a satisfactory response, or there are no more adapters to try.

Under the hood, the API client adapter will transform the response it retrieves from the third party API into a schema that the app understands, and return it as JSON. Express will then issue this response, or an error type object if there was an issue.

As it relates to the code base, I've chosen to use a mixture of object oriented and functional approaches to various problems because I want to display my ability to work with either paradigm, but more so because I feel that JavaScript is a good language for working with a mixture of the two styles due to its support for first class functions.

## Getting started
> :bulb: **Note:** This is under active development in my free time, so as of right now, there isn't much functionality available from the API. I've just finished the first adapter for the MapQuest API, and will be moving onto the adapter selection functionality next, then will implement the remaining adapters / endpoints.

Clone this repo, then do the following to install necessary dependencies, compile the code, and start the server:

```
npm install
npm run compile
npm run start
```
