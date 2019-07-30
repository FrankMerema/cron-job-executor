# Weather service
[![CircleCI](https://circleci.com/gh/FrankMerema/weather-service.svg?style=svg)](https://circleci.com/gh/FrankMerema/weather-service) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

This service is build for running a express service for the weather api [openweathermap.org](https://openweathermap.org/).

It supports finding a city by name / id and retrieving the weather via the official [api](https://openweathermap.org/current). 

## Installation

The package can be either installed locally and global.

##### Locally

```
npm install @frankmerema/weather-service || yarn add @frankmerema/weather-service
```

##### Globally

```
npm install -g @frankmerema/weather-service || yarn global add @frankmerema/weather-service
```

## How to start
There are multiple ways to start the service. 
- Via weather.service file as a system process
- Via `npm run start:prod --config="location/to/config.json"` (**Note*** project needs to build first)
- Via `weather-service -c="location/to/config.json"` (**Note*** only when installed globally)

#### Weather.service file

In the folder systemd there is a file located called weather.service. This file is intended to run the 
weather service as a real system service.

|line number   | input                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
|1             |**[Unit]**                                                                                     |
|2             |Description=Weather Service                                                                    |
|3             |After=network.target                                                                           |
|4             |                                                                                               |
|5             |**[Service]**                                                                                  |
|6             |Restart=on-failure                                                                             |
|7             |User=root                                                                                      |
|8             |ExecStart=/usr/local/bin/weather-service --config="/usr/local/bin/weather-service.config.json" |
|9             |                                                                                               |
|10            |**[Install]**                                                                                  |
|11            |WantedBy=multi-user.target                                                                     |

##### Explanation weather.service file
- Lines 1–3 give systemd a descriptive name for the service and tell it that it should only be started after the operating system’s networking functionality is up and running.
- Line 6 tells it to restart the service automatically should it fail unexpectedly at any point. 
- Line 7 tells it to run as the “root” user **(Can be changed to own needs)**
- Line 8 tells systemd where to find the service’s implementation and to start it with a config file located in a specific folder **(Change to own config file location or create one)**.
- Lines 10–11 tells systemd how to install our service, and roughly where in the operating system’s boot sequence to start it. 
  In this case, we’ve specified that the service should be started when the operating system has booted as far as a multi user state (meaning the point at which users can establish terminal sessions with the operating system).
  So given that we also said to only start our service after “network.target”, we can expect it to start after networking is established and prior to the system going multi user.
  
> #### Note: This is tested only for the Raspberry Pi
> 
> Copy the weather.service file with the following command:\
> `sudo cp weather.service /etc/systemd/system`
> 
> **Note**: If this is the first time, continue otherwise execute:\
> `sudo systemctl daemon-reload`
> 
> Afterwards run:\
> `sudo systemctl enable weather.service`
> 
> It will respond (hopefully) with:\
> `Created symlink /etc/systemd/system/multi-user.target.wants/weather.service → /etc/systemd/system/weather.service.`
> 
> Now start the service manually:\
> `sudo service weather.service start`
> 
> It will now boot every time the network connection is established and users are able to login.
> 
> If you want to stop or restart the service it's the same as above only change `start` to `stop` or `restart`
>
> To see the logs of the service (and check if its up and running correctly) you can run the command:\
> `sudo journalctl -u weather`


#### NPM Run start

Second option is to start the service by checking out the git repo. You can run `npm | yarn install` to fetch all the packages.
After the install you need to build the project by running `npm run build` and there will be a dist folder.
This is the moment you finally can start running the project.

To start it you need to create a config file under any location on your file system and run the command: `node dist/bin/start.js --config="location/of/config.json""`.
If you don't specify the config file location, the express service will fall back to its default port `8080` and the weather service will not be working due the lack of an API key for [openweathermap.org](https://openweathermap.org/appid)
In this case you still can use the city api to lookup a city by `string (name)` or by `id`.

#### Weather-service (command only when installed global)

If the package is installed globally you can also run the program by executing `weather-service --config="location/of/config.json""`.

## Api

### City endpoints

> Works from version 1.1.x and higher!

For the openweathermap api you need a city name or for a more accurate forecast a city ID.
To find these there are two endpoints for getting info about a city. (see [src/models/city.model.ts](https://github.com/FrankMerema/weather-service/blob/master/src/models/city.model.ts) for more info about the city object) 

| Endpoint                  | Response                                                   | Params                                                                                        |
|---------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `/api/city/name/:name`    | A list of cities which name includes the name to search.   | - **name** (`string`)**:** The name (or part of) for the cities you want information about.   | 
| `/api/city/id/:id`        | A specific city for this id                                | - **id** (`number`)**:** The id for the city you want information about.                      |

> If no cities found for the `name | id` the server responses with `{ "error": "No cities found for <name | id>" }`  

### Status endpoints

It will check if the `api.openweathermap.org` is reachable.


| Endpoint       | Response                                      | 
|----------------|-----------------------------------------------|
| `/`            | `{ "openWeatherMap": "ONLINE" or "OFFLINE" }` |
| `/status`      | `{ "openWeatherMap": "ONLINE" or "OFFLINE" }` |
| `/api/status`  | `{ "openWeatherMap": "ONLINE" or "OFFLINE" }` |

### Weather endpoints

These endpoints are all returning the (found) weather object for the requested city. (see [src/models/open-weather.model.ts](https://github.com/FrankMerema/weather-service/blob/master/src/models/open-weather.model.ts) for more info about the open weather object)

| Endpoint                                 | Response                                                                                                          | Params                                                                                                                                                                                                                                                       |
|------------------------------------------|-------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/api/weather/cityName/:name`            | [open-weather model](https://github.com/FrankMerema/weather-service/blob/master/src/models/open-weather.model.ts) | - **name** (`string`)**:** The name for the city of which you want the current weather                                                                                                                                                                       |
| `/api/weather/cityId/:id`                | [open-weather model](https://github.com/FrankMerema/weather-service/blob/master/src/models/open-weather.model.ts) | - **id** (`number`)**:** The id for the city of which you want the current weather                                                                                                                                                                           |
| `/api/weather/cityCoordinates/:lon/:lat` | [open-weather model](https://github.com/FrankMerema/weather-service/blob/master/src/models/open-weather.model.ts) | - **lon** (`string`)**:** The longitude for the city of which you want the current weather<br> - **lat** (`string`)**:** The latitude for the city of which you want the current weather                                                                     |
| `/api/weather/cityZip/:zip/:country`     | [open-weather model](https://github.com/FrankMerema/weather-service/blob/master/src/models/open-weather.model.ts) | - **zip** (`string`)**:** The 4 digit zip code for the city of which you want the current weather<br> - **country** (`string`)**:** The [alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code of the country, e.g. for the Netherlands it's `nl`  |


## Config file

### serverPort
Description: This port is used by express to run the server

Type: `number`\
Default: `8080`

### openWeatherMapKey
Description: This is the api key from [openweathermap.org](https://openweathermap.org/appid)

Type: `string`

##### Example of a config file:
```json
{
    "serverPort": 1234,
    "openWeatherMapKey": "abc"
}
```
