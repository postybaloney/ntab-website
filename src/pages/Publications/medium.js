const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// const list = ['top_articles":["17c1668882f4"', '"c2672e882288"', '"826c8968adc0"', '"67159097965b"', '"7279990fbc8a"', '"90c42802e4a0"', '"b8441a9629bc"', '"43f86bee1d"', '"f894803bb114"', '"f9eecc746e74"]']
// console.log(list)


xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
        const top_articles = this.responseText.slice(this.responseText.indexOf("top_articles"), this.responseText.indexOf("total_pinned_articles") - 2);
        const top_articles_list = top_articles.split(",");
        for (let i = 0; i < top_articles_list.length; i++) {
            if (i == 0) {
                top_articles_list[i] = top_articles_list[i].slice(16, -1);
            }
        else {
            top_articles_list[i] = top_articles_list[i].slice(1, -1);
        }
    }
    const randomArticle = Math.floor(Math.random() * 3);

    // SECOND API CALL TO FETCH ARTICLE DETAILS
    const xhrArticle = new XMLHttpRequest();
    xhrArticle.withCredentials = true;

    xhrArticle.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const article_details = JSON.parse(this.responseText);
            console.log("Article Details:", article_details);

            //Creating image
            const container = document.getElementById("medium-article-image");
            if (container && article_details.image_url) {
                const articleLink = document.createElement('a');
                articleLink.href = article_details.url;
                articleLink.target = '_blank';
                articleLink.rel = 'noopener noreferrer';

                const articleDescription = document.createElement('p');
                articleDescription.textContent = article_details.title;

                const image = document.createElement('img');
                image.src = article_details.image_url;
                image.alt = article_details.title;
                image.style.maxWidth = "50%";
                image.style.maxHeight = "50%";
                image.style.alignContent = "right";

                articleLink.append(image);
                container.appendChild(articleLink);
                container.appendChild(articleDescription);
            }

        }
    });

    xhrArticle.open("GET", "https://medium2.p.rapidapi.com/article/" + top_articles_list[randomArticle]);
    xhrArticle.setRequestHeader("x-rapidapi-key", "c708aac96dmshd58bc8c19b97c38p168378jsn2b1233da935f");
    xhrArticle.setRequestHeader("x-rapidapi-host", "medium2.p.rapidapi.com");

    xhrArticle.send(null);
	}
});

// xhr.open('GET', 'https://medium2.p.rapidapi.com/user/db47bd277bbb/top_articles');
// // user_id = db47bd277bbb
// xhr.setRequestHeader('x-rapidapi-key', 'c708aac96dmshd58bc8c19b97c38p168378jsn2b1233da935f');
// xhr.setRequestHeader('x-rapidapi-host', 'medium2.p.rapidapi.com');

// xhr.send(data);