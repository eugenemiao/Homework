
## News Mood Homework

1. Measuring the most recent 100 tweets from all 5 media outlets, it appears NYTimes is the most neutral with the least amount of Tweet Polarity.
2. CBS seems to have the largest positive compound average in tweets, indicating their tweets tend to be more positive in sentiment.
3. Based on these findings, NYTimes may be shown as the best neutral news option at this time.


```python
#Dependencies
import tweepy
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from matplotlib import style
style.use('ggplot')

from config import consumer_key, consumer_secret, access_token, access_token_secret

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
```


```python
#Tweepy Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
```


```python
#BBC Sentiment

bbc_twitter = "@BBC"
bbc_positive_list = []
bbc_negative_list = []
bbc_neutral_list = []
bbc_compound_list = []
bbc_sentiments = []

oldest_tweet = None
counter = 1

for x in range(5):
    bbc_public_tweets = api.user_timeline(bbc_twitter, page=x)
    
    for tweet in bbc_public_tweets:
        #print(f'Tweet {counter}: {tweet["text"]}')
        results = analyzer.polarity_scores(tweet["text"])
        compound = results["compound"]
        pos = results["pos"]
        neu = results["neu"]
        neg = results["neg"]
        tweet_count = counter

        bbc_compound_list.append(compound)
        bbc_positive_list.append(pos)
        bbc_neutral_list.append(neu)
        bbc_negative_list.append(neg)
        
        oldest_tweet = tweet["id"] - 1
        
        bbc_sentiments.append({"Date Created": tweet["created_at"],
                                "Compound": compound,
                                "Positive": pos,
                                "Negative": neg,
                                "Neutral": neu,
                                "Tweets ago": counter    
                          })
        
        counter += 1

```


```python
bbc_sentiments_df = pd.DataFrame(bbc_sentiments)
bbc_sentiments_df.head()
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
      <th>Compound</th>
      <th>Date Created</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Tweets ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0000</td>
      <td>Wed Jun 13 19:03:07 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>-0.4005</td>
      <td>Wed Jun 13 18:28:04 +0000 2018</td>
      <td>0.137</td>
      <td>0.863</td>
      <td>0.000</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.3612</td>
      <td>Wed Jun 13 18:01:04 +0000 2018</td>
      <td>0.000</td>
      <td>0.839</td>
      <td>0.161</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.6369</td>
      <td>Wed Jun 13 16:30:31 +0000 2018</td>
      <td>0.000</td>
      <td>0.819</td>
      <td>0.181</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.4019</td>
      <td>Wed Jun 13 16:25:17 +0000 2018</td>
      <td>0.163</td>
      <td>0.837</td>
      <td>0.000</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
#CBS Sentiment

cbs_twitter = "@CBS"
cbs_positive_list = []
cbs_negative_list = []
cbs_neutral_list = []
cbs_compound_list = []
cbs_sentiments = []

oldest_tweet = None
counter = 1

for x in range(5):
    cbs_public_tweets = api.user_timeline(cbs_twitter, page=x)
    
    for tweet in cbs_public_tweets:
        #print(f'Tweet {counter}: {tweet["text"]}')
        results = analyzer.polarity_scores(tweet["text"])
        compound = results["compound"]
        pos = results["pos"]
        neu = results["neu"]
        neg = results["neg"]
        tweet_count = counter

        cbs_compound_list.append(compound)
        cbs_positive_list.append(pos)
        cbs_neutral_list.append(neu)
        cbs_negative_list.append(neg)
        
        oldest_tweet = tweet["id"] - 1
        
        cbs_sentiments.append({"Date Created": tweet["created_at"],
                                "Compound": compound,
                                "Positive": pos,
                                "Negative": neg,
                                "Neutral": neu,
                                "Tweets ago": counter
                          })
        
        counter += 1

```


```python
cbs_sentiments_df = pd.DataFrame(cbs_sentiments)
cbs_sentiments_df.head()
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
      <th>Compound</th>
      <th>Date Created</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Tweets ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.5562</td>
      <td>Tue Jun 12 00:19:23 +0000 2018</td>
      <td>0.315</td>
      <td>0.551</td>
      <td>0.134</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.5093</td>
      <td>Mon Jun 11 22:23:06 +0000 2018</td>
      <td>0.000</td>
      <td>0.829</td>
      <td>0.171</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.2960</td>
      <td>Mon Jun 11 19:01:38 +0000 2018</td>
      <td>0.167</td>
      <td>0.833</td>
      <td>0.000</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0000</td>
      <td>Mon Jun 11 14:00:37 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0000</td>
      <td>Mon Jun 11 06:19:36 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
#CNN Sentiment

cnn_twitter = "@CNN"
cnn_positive_list = []
cnn_negative_list = []
cnn_neutral_list = []
cnn_compound_list = []
cnn_sentiments = []

oldest_tweet = None
counter = 1

for x in range(5):
    cnn_public_tweets = api.user_timeline(cnn_twitter, page=x)
    
    for tweet in cnn_public_tweets:
        #print(f'Tweet {counter}: {tweet["text"]}')
        results = analyzer.polarity_scores(tweet["text"])
        compound = results["compound"]
        pos = results["pos"]
        neu = results["neu"]
        neg = results["neg"]
        tweet_count = counter

        cnn_compound_list.append(compound)
        cnn_positive_list.append(pos)
        cnn_neutral_list.append(neu)
        cnn_negative_list.append(neg)
        
        oldest_tweet = tweet["id"] - 1
        
        cnn_sentiments.append({"Date Created": tweet["created_at"],
                                "Compound": compound,
                                "Positive": pos,
                                "Negative": neg,
                                "Neutral": neu,
                                "Tweets ago": counter
                          })
        
        counter += 1
```


```python
cnn_sentiments_df = pd.DataFrame(cnn_sentiments)
cnn_sentiments_df.head()
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
      <th>Compound</th>
      <th>Date Created</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Tweets ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.2023</td>
      <td>Thu Jun 14 04:16:00 +0000 2018</td>
      <td>0.000</td>
      <td>0.899</td>
      <td>0.101</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0000</td>
      <td>Thu Jun 14 04:08:00 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.3400</td>
      <td>Thu Jun 14 04:01:03 +0000 2018</td>
      <td>0.165</td>
      <td>0.726</td>
      <td>0.109</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>-0.5423</td>
      <td>Thu Jun 14 03:53:30 +0000 2018</td>
      <td>0.163</td>
      <td>0.837</td>
      <td>0.000</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>-0.5106</td>
      <td>Thu Jun 14 03:46:06 +0000 2018</td>
      <td>0.163</td>
      <td>0.837</td>
      <td>0.000</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Fox Sentiment

fox_twitter = "@FoxNews"
fox_positive_list = []
fox_negative_list = []
fox_neutral_list = []
fox_compound_list = []
fox_sentiments = []

oldest_tweet = None
counter = 1

for x in range(5):
    fox_public_tweets = api.user_timeline(fox_twitter, page=x)
    
    for tweet in fox_public_tweets:
        #print(f'Tweet {counter}: {tweet["text"]}')
        results = analyzer.polarity_scores(tweet["text"])
        compound = results["compound"]
        pos = results["pos"]
        neu = results["neu"]
        neg = results["neg"]
        tweet_count = counter

        fox_compound_list.append(compound)
        fox_positive_list.append(pos)
        fox_neutral_list.append(neu)
        fox_negative_list.append(neg)
        
        oldest_tweet = tweet["id"] - 1
        
        fox_sentiments.append({"Date Created": tweet["created_at"],
                                "Compound": compound,
                                "Positive": pos,
                                "Negative": neg,
                                "Neutral": neu,
                                "Tweets ago": counter
                          })
        
        counter += 1
```


```python
fox_sentiments_df = pd.DataFrame(fox_sentiments)
fox_sentiments_df.head()
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
      <th>Compound</th>
      <th>Date Created</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Tweets ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>-0.1779</td>
      <td>Thu Jun 14 04:15:00 +0000 2018</td>
      <td>0.155</td>
      <td>0.717</td>
      <td>0.127</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.7783</td>
      <td>Thu Jun 14 04:15:00 +0000 2018</td>
      <td>0.000</td>
      <td>0.638</td>
      <td>0.362</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>-0.3400</td>
      <td>Thu Jun 14 04:07:00 +0000 2018</td>
      <td>0.197</td>
      <td>0.673</td>
      <td>0.130</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.3182</td>
      <td>Thu Jun 14 04:01:00 +0000 2018</td>
      <td>0.000</td>
      <td>0.897</td>
      <td>0.103</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0000</td>
      <td>Thu Jun 14 03:47:45 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
#NYTimes Sentiment

ny_twitter = "@nytimes"
ny_positive_list = []
ny_negative_list = []
ny_neutral_list = []
ny_compound_list = []
ny_sentiments = []

oldest_tweet = None
counter = 1

for x in range(5):
    ny_public_tweets = api.user_timeline(ny_twitter, page=x)
    
    for tweet in ny_public_tweets:
        #print(f'Tweet {counter}: {tweet["text"]}')
        results = analyzer.polarity_scores(tweet["text"])
        compound = results["compound"]
        pos = results["pos"]
        neu = results["neu"]
        neg = results["neg"]
        tweet_count = counter

        ny_compound_list.append(compound)
        ny_positive_list.append(pos)
        ny_neutral_list.append(neu)
        ny_negative_list.append(neg)
        
        oldest_tweet = tweet["id"] - 1
        
        ny_sentiments.append({"Date Created": tweet["created_at"],
                                "Compound": compound,
                                "Positive": pos,
                                "Negative": neg,
                                "Neutral": neu,
                                "Tweets ago": counter
                          })
        
        counter += 1
```


```python
ny_sentiments_df = pd.DataFrame(ny_sentiments)
ny_sentiments_df.head()
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
      <th>Compound</th>
      <th>Date Created</th>
      <th>Negative</th>
      <th>Neutral</th>
      <th>Positive</th>
      <th>Tweets ago</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0000</td>
      <td>Thu Jun 14 04:21:03 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0000</td>
      <td>Thu Jun 14 04:10:20 +0000 2018</td>
      <td>0.000</td>
      <td>1.000</td>
      <td>0.000</td>
      <td>2</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.2960</td>
      <td>Thu Jun 14 04:02:04 +0000 2018</td>
      <td>0.118</td>
      <td>0.699</td>
      <td>0.183</td>
      <td>3</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.8074</td>
      <td>Thu Jun 14 03:47:07 +0000 2018</td>
      <td>0.000</td>
      <td>0.722</td>
      <td>0.278</td>
      <td>4</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.5267</td>
      <td>Thu Jun 14 03:32:01 +0000 2018</td>
      <td>0.085</td>
      <td>0.704</td>
      <td>0.211</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Create Sentiment plot
bbc_x_vals = bbc_sentiments_df["Tweets ago"]
bbc_y_vals = bbc_sentiments_df["Compound"]
plt.scatter(bbc_x_vals, bbc_y_vals, marker = "o", color = "skyblue", edgecolors = "black", label = "BBC")

cbs_x_vals = cbs_sentiments_df["Tweets ago"]
cbs_y_vals = cbs_sentiments_df["Compound"]
plt.scatter(cbs_x_vals, cbs_y_vals, marker = "o", color = "green", edgecolors = "black",  label = "CBS")

cnn_x_vals = cnn_sentiments_df["Tweets ago"]
cnn_y_vals = cnn_sentiments_df["Compound"]
plt.scatter(cnn_x_vals, cnn_y_vals, marker = "o", color = "red", edgecolors = "black", label = "CNN")

fox_x_vals = fox_sentiments_df["Tweets ago"]
fox_y_vals = fox_sentiments_df["Compound"]
plt.scatter(fox_x_vals, fox_y_vals, marker = "o", color = "blue", edgecolors = "black", label = "FOX")

ny_x_vals = ny_sentiments_df["Tweets ago"]
ny_y_vals = ny_sentiments_df["Compound"]
plt.scatter(ny_x_vals, ny_y_vals, marker = "o", color = "yellow", edgecolors = "black", label = "NYTimes")

# # Incorporate the other graph properties
plt.title("Sentiment Analysis of Media Tweets")
plt.ylabel("Tweet Polarity")
plt.xlabel("Tweets Ago")
plt.legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0.)
plt.savefig("Sentiment Analysis of Media Tweets.png")



```


![png](output_14_0.png)



```python
#Identify Sentiment mean
#Only the compound value
bbc_mean = bbc_sentiments_df["Compound"].mean()

cbs_mean = cbs_sentiments_df["Compound"].mean()

cnn_mean = cnn_sentiments_df["Compound"].mean()

fox_mean = fox_sentiments_df["Compound"].mean()

ny_mean = ny_sentiments_df["Compound"].mean()

print(bbc_mean)
print(cbs_mean)
print(cnn_mean)
print(fox_mean)
print(ny_mean)
```

    0.16869299999999998
    0.3593549999999999
    -0.070491
    0.056334
    -0.029197999999999995
    


```python
# Create a bar chart based upon the above data
news_twitter = ["BBC", "CBS", "CNN", "FOX", "NYTimes"]
news_mean = [bbc_mean, cbs_mean, cnn_mean, fox_mean, ny_mean]

# Set the color for each news outlet
sentiment_bar = plt.bar(news_twitter, news_mean, color="b", width = 1.0, align="center")
sentiment_bar[0].set_color('skyblue')
sentiment_bar[1].set_color('g')
sentiment_bar[2].set_color('r')
sentiment_bar[4].set_color('y')

# Create the ticks for our bar chart's x axis
tick_locations = [value for value in news_twitter]
plt.xticks(tick_locations, news_twitter)
#plt.xlim(-0.75, len(news_twitter)-0.25)
#plt.ylim(min(news_mean) + 0.05, max(news_mean) + 0.05)

now = datetime.now()
now = now.strftime("%Y/%m/%d")
plt.title(f"Overall Media Sentiment Based on Twitter ({now})")
plt.ylabel("Tweet Polarity")

# Save figure 
plt.savefig("Overall_Media_Sentiment_Based_on_Twitter.png")
```


![png](output_16_0.png)

