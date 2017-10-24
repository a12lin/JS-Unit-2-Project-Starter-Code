/*

APIs to use:
- Reddit: https://www.reddit.com/dev/api
- Guardian: https://open-platform.theguardian.com/access/
- Financial Times: https://developer.ft.com/;
- ESPN: https://www.programmableweb.com/api/espn
- NewsAPI: https://newsapi.org/



Pseudocode:

API interactions
- Get data from each API above
- Grab the relevant pieces of information (header, date/time, image, category/tag, ranking/impressions, summary, full text) from the returned objects
- Store these pieces of information in variables, for later usage

DOM manipulation
- On page load, display loading container (waiting text)

- When APIs have successfully returned relevant information, hide the loading container and replace the content of the #main container with the default content (top/first news article from each API)
- Add a dropdown that allows user to select a specific news source; once selected all content is replaced with top 5 news articles from that specific news source
- Add an input text box that allows users to type in search terms, which will filter the articles displayed by the search term
- When users click on the main Feedr logo, it replaces content with the default content

- When user clicks on an article, it generates a popup with a summary of that article
-------- Add a "Read More" link that, when clicked, displays the full text of the article
-------- Add a "X" that, when clicked, hides the popup

- BONUS: add infinite scrolling

