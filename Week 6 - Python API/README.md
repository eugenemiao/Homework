
## WeatherPy Homework

Observable Trend 1
Observable Trend 1
Observable Trend 1



```python
#import dependencies
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import openweathermapy as owm
import requests
import random
import json

from citipy import citipy
from pprint import pprint
from config import api_key
from random import uniform

url = "http://api.openweathermap.org/data/2.5/weather?"
units = "metric"
```

## Generate Cities


```python
cities = []
latitude = []
longitude = []

#generating lat and lng to identify city
for x in range(500):
    x = uniform(-90,90)
    latitude.append(str(x))
    y = uniform(-180, 180)
    longitude.append(str(y))
    city = citipy.nearest_city(x,y)
    name = city.city_name
    cities.append(str(name))

cities_df = pd.DataFrame({'Cities': cities})

#creating empty columns for each city dataframe
cities_df['Latitude'] = latitude
cities_df.round({'Latitude': 3})
cities_df['Temperature'] = ""
cities_df['Humidity'] = ""
cities_df['Cloudiness'] = ""
cities_df['Wind Speed'] = ""

cities_df.head()


#for city in cities:
#        try:
#            query_url = url + "appid=" + api_key + "&units=" + units + "&q=" + name
#            print(query_url)
#            weather_request = requests.get(query_url)
#            weather_json = weather_request.json()
#            pprint(weather_json)
#        except KeyError:
#            Pass

# Plan is to create a for loop that randomly generates a list of latitudes and longitude.
# With each set of lat,lng created it would reference off citiespy for the city name.
# However, some city names aren't in the api.openweathermap so I would create a try and except for errors.
# If the city name generated is in the api.openweathermap, then we can proceed with acquiring its api url, otherwise it would re-loop itself until it matched a proper name.
# except...I don't know how to write it...lol
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Cities</th>
      <th>Latitude</th>
      <th>Temperature</th>
      <th>Humidity</th>
      <th>Cloudiness</th>
      <th>Wind Speed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>saskylakh</td>
      <td>72.6575829363706</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>busselton</td>
      <td>-43.89079310386762</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>riviere-au-renard</td>
      <td>48.86567778118865</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3</th>
      <td>pisco</td>
      <td>-25.871891635057523</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4</th>
      <td>khatanga</td>
      <td>72.44726525846409</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>



## Calling the API


```python
lat_df = []
temp_df = []
humidity_df = []
cloudiness_df = []
wind_speed_df = []

for index, row in cities_df.iterrows():
    #city_name = row['Cities']
    #params['keyword'] = city_name
    
    query_url = url + "appid=" + api_key + "&units=" + units + "&q=" + name
    params = f"row{cities}"
    weather_request = requests.get(query_url, params)
    #print(weather_request)
    weather_request = weather_request.json()
    #pprint(weather_json)
    

    #cities_df.loc[index, "Temperature"] = weather_request["main"]["temp"]
    cities_df.append(weather_request["main"]["temp"])

cities_df.head()
"""
    # update address key value
    params['address'] = f"{city},{state}"

    # make request, print url
    cities_lat_lng = requests.get(base_url, params=params)
    print(cities_lat_lng.url)
    # convert to json
    cities_lat_lng = cities_lat_lng.json()

    cities_pd.loc[index, "Lat"] = cities_lat_lng["results"][0]["geometry"]["location"]["lat"]
    cities_pd.loc[index, "Lng"] = cities_lat_lng["results"][0]["geometry"]["location"]["lng"]
    
#Weather Details
lat = weather_json['coord']['lat']
lon = weather_json['coord']['lon']
temp = weather_json['main']['temp']
humidity = weather_json['main']['humidity']
cloudiness = weather_json['clouds']['all']
wind_speed = weather_json['wind']['speed']

for city in cities_df:
    response = requests.get(query_url).json()
    lat_df.append(response['coord']['lat'])
    temp_df.append(response['main']['temp'])

#print(lat_df)
#print(temp_df)
#weather dictionary containing all variables
"""
"""weather_dict = {
    "city": cities,
    "lat": lat_df,
    "temp": temp_df,
    "humidity": humidity_df,
    "cloudiness": cloudiness_df,
    "wind speed": wind_speed_df
}
weather_data = pd.DataFrame(weather_dict)
weather_data.head() """
```


    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    <ipython-input-64-7fb61ca7319f> in <module>()
         16 
         17     #cities_df.loc[index, "Temperature"] = weather_request["main"]["temp"]
    ---> 18     cities_df.append(weather_request["main"]["temp"])
         19 
         20 cities_df.head()
    

    ~\Anaconda3\lib\site-packages\pandas\core\frame.py in append(self, other, ignore_index, verify_integrity)
       5192             to_concat = [self, other]
       5193         return concat(to_concat, ignore_index=ignore_index,
    -> 5194                       verify_integrity=verify_integrity)
       5195 
       5196     def join(self, other, on=None, how='left', lsuffix='', rsuffix='',
    

    ~\Anaconda3\lib\site-packages\pandas\core\reshape\concat.py in concat(objs, axis, join, join_axes, ignore_index, keys, levels, names, verify_integrity, copy)
        210                        keys=keys, levels=levels, names=names,
        211                        verify_integrity=verify_integrity,
    --> 212                        copy=copy)
        213     return op.get_result()
        214 
    

    ~\Anaconda3\lib\site-packages\pandas\core\reshape\concat.py in __init__(self, objs, axis, join, join_axes, keys, levels, names, ignore_index, verify_integrity, copy)
        270                        ' only pd.Series, pd.DataFrame, and pd.Panel'
        271                        ' (deprecated) objs are valid'.format(type(obj)))
    --> 272                 raise TypeError(msg)
        273 
        274             # consolidate
    

    TypeError: cannot concatenate object of type "<class 'float'>"; only pd.Series, pd.DataFrame, and pd.Panel (deprecated) objs are valid

