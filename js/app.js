/*
  Please add all Javascript code to this file.
  GA JS-SF-8 Annie Lin
*/

let source1 = "New York Times";
let source2 = "Breitbart";
let source3 = "Hacker News";

let newsSources = [source1, source2, source3];

const apiTechcrunch = "https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=APIKEY";
const apiBreitbart = "https://newsapi.org/v1/articles?source=breitbart-news&apiKey=APIKEY";
const apiESPN = "https://newsapi.org/v1/articles?source=espn&apiKey=APIKEY";
const apiWSJ = "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=latest&apiKey=APIKEY";
const apiNYT = "https://newsapi.org/v1/articles?source=the-new-york-times&apiKey=APIKEY";
const apiHackerNews = "https://accesscontrolalloworiginall.herokuapp.com/https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";




let popArticle = function() {
    $("#main section").on("click", "a", function() {
        let title = $(this).find("h3").text();
        let description = $(this).next().next().text();
        let url = $(this).next().next().next().text();
        $("#popUp").removeClass("hidden").removeClass("loader");
        $("#popUp h1").text(title);
        $("#popUp p").text(description);
        $(".popUpAction").on("click", function() {
            $(this).attr("href", url);
        });
    });
};

let loadArticles = function(ajax) { 
    let article = "";
    if($("span").text() === "Hacker News") {
        for (let i=0; i<5; i++) {
            let apiHackerNewsIndiv = "https://hacker-news.firebaseio.com/v0/item/" + ajax[i] + ".json";
                fetch(apiHackerNewsIndiv).then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.statusText);
                }
                }).then(function(data) {
                    console.log(data);
                    article = `
                        <article class="article">
                            <section class="featuredImage">
                            <img src="https://news.ycombinator.com/favicon.ico" alt="" />
                            </section>
                            <section class="articleContent">
                                <a href="#"><h3>${data.title}</h3></a>
                                <h6>${data.by}</h6>
                                <div class="hidden">${data.text}</div>
                                <div class="hidden">${data.url}</div>
                            </section>
                            <section class="impressions">
                            ${data.score}
                            </section>
                            <div class="clearfix"></div>
                        </article>
                     `;
                    $("#main").append(article);
                });
            };   
            popArticle();         
    }
    else {
        for (let i=0; i<5; i++) {
            article = `
            <article class="article">
                <section class="featuredImage">
                <img src=${ajax.articles[i].urlToImage} alt="" />
                </section>
                <section class="articleContent">
                    <a href="#"><h3>${ajax.articles[i].title}</h3></a>
                    <h6>${ajax.articles[i].author}</h6>
                    <div class="hidden">${ajax.articles[i].description}</div>
                    <div class="hidden">${ajax.articles[i].url}</div>
                </section>
                <section class="impressions">
                
                </section>
                <div class="clearfix"></div>
            </article>
        `;
        $("#main").append(article);
        };
        popArticle();
    };
};





let loadingInProgress = function() {
    $("#popUp").addClass("loader");
    $("#popUp").removeClass("hidden");
};

let loadingDone = function() {
    $("#popUp").addClass("hidden");
};

let loadingError = function(ajax) {
    let errorMessage = `
        <h2>Error: ${ajax.statusText}</h2>
      `;
    $("#main").append(errorMessage);
};



let clearArticles = function() {
    $("#main").children().remove();
}





function makeRequest(url) {
  console.log('Making request');
  loadingInProgress();
  // closeButton();
  fetch(url).then(function(response) {
  if (response.ok) {
      return response.json();
  } else {
      console.log(response.statusText);
      loadingDone();
      loadingError(response);
  }
  }).then(function(data) {
      console.log(data);
      loadingDone();
      loadArticles(data);
  });
};







let dropDown = function() {
    let dropDownItems = "";
    for (let i=0; i<newsSources.length; i++) {
        dropDownItems = `
        <li><a href="#">${newsSources[i]}</a></li>
         `;
        $("nav ul li ul").append(dropDownItems);
    };
    $("li").on("click", "a", function() {
        if($(this).text() === "Breitbart") {
            clearArticles();
            makeRequest(apiBreitbart);
            $(this).parents().find("span").text("Breitbart");
        }
        else if($(this).text() === "New York Times") {
            clearArticles();
            makeRequest(apiNYT);
            $(this).parents().find("span").text("New York Times");
        }
        else if($(this).text() === "Hacker News") {
            clearArticles();
            makeRequest(apiHackerNews);
            $(this).parents().find("span").text("Hacker News");
        }
        else {};
    });
};

/*
let dropDown = function() {
    $("li a").on("click", function() {
        if($(this).text() === "TechCrunch") {
            makeRequest(apiTechcrunch);
            $(this).parents().find("span").text("TechCrunch");
        }
        else {};
    });
};
*/

// makeRequest(apiTechcrunch);


let closeButton = function() {
    $(".closePopUp").on("click", function() {
        $("#popUp").addClass("hidden");
    });
};

let search = function(e) {
    $("#search img").on("click", function() {
        $("#search").toggleClass("active");
    });
    $("input").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $("#search").toggleClass("active"); 
        };
    });
};






dropDown();

search();

closeButton();

$("h1").on("click", function() {
    window.location.reload();
});
