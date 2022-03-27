# weather-app

03/27/22
I am starting the weather-app project today.  This project is meant to refine my understanding of utilizing APIs and asynchronous functions.  Specifically, I will be using the information from OpenWeather.  I am going to write this script using promises without the async and await notation.  The reason for this is that I still do not have a strong grasp on the concepts of promises, so I would like to utilize without any shortcuts in this project.  Perhaps, I will create a replika of this project once I have completed it that uses Async and Await instead of the full promise style.

As far as design goes, I am going to have a large search bar at the top of the page for searching the cities.  The current weather is going to be displayed below that in two rows with the top one being important information and the lower one being extra details.  At the bottom, I will have the daily/hourly forecasts.  I will make this eight boxes long to cover an entire week. I will go for a blue theme.

Asynchronous functions are going to be important when calling the information from OpenWeather.  Essentially, I will want to fill in all the document elements with the requested information once the information has been retried.  The DOM component will be in the "then" section of the promise.  As far as error handling goes, I will need to create an error message that displays across the entire page which I can probably use the catch function for.

Details about the weather will be captured as object.  There is a good chance I may create separate objects for the current weather and the forecasted weather because of differences in the details shown.  These object can be created by finding the correct information in the API calls and assigning it to one of the object properties.

Adding DOM elements, object assignment, and API calls can have their own separate modules.  The only other thing I can imagine having its own module is the error handling system.