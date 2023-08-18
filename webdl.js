console.log("This is my index js file");

// Initialize the news api parameters
let source = 'the-times-of-india';
let apiKey = '66d0fa774d8a1a26c8a1bfb7e82460ad';
//let apikey = 'pub_17503dcc9b6c7ff8177d0398d79c8f18f80ea';

// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://gnews.io/api/v4/search?q=${"sdg","sustainable development goals"}&from=2023-08-18&source=${source}&apikey=${apiKey}`, true);
//xhr.open('GET', `https://newsapi.org/v2/top-headlines?source=${source}?apiKey=34881b3319f94b7f97ee5e166f3276f0`, true);
//xhr.open('GET', `https://newsdata.io/api/1/news?apikey=pub_17503dcc9b6c7ff8177d0398d79c8f18f80ea&language=en,hi`, true);
// What to do when response is ready

xhr.onload = function () {
    if (this.status ==200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                        aria-expanded="true" aria-controls="collapse${index}">
                                        ${element["title"]}
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse " aria-labelledby="heading${index}"
                                data-parent="#newsAccordion">
                                <div class="card-body">
                                    ${element["content"]}.<a href="${element["url"]} target="_blank ">Read more here</a>
                                </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()