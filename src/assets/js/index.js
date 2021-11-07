


import '../scss/main.scss';

const newsList_url = 'https://hacker-news.firebaseio.com/v0/newstories.json';

const newsList_ul = document.querySelector('.news-list');
const loadMore_button = document.querySelector('#load-more');
let indexlist = 0;


// fetch and return the list of id news
async function getList() {
    const response = await fetch(newsList_url);
    const data = await response.json();
    return (data.slice(indexlist,(indexlist + 10)));
}

function displayElement(news)  {

    // calculate the time of relase of the news
    const now = new Date().getTime();
    const date = (news.time * 1000);
    const risultato = now - date;
    const secondsAgo = Math.floor(risultato / 1000);
    const minuteAgo = Math.floor(secondsAgo/60) 
    const hoursAgo =  Math.floor(minuteAgo/60);

    // create and display the news element
    const newsElement_li = document.createElement('li');
    newsElement_li.innerHTML = `
        <a href="${news.url}">
            <article class="news-item">
                <h3>${news.title}</h3>
                <p>${(minuteAgo>60) ? `${hoursAgo} ${(hoursAgo > 1)? 'hours ago' : 'hour ago'  }` : `${(minuteAgo > 0) ? `${minuteAgo} minutes ago`: `${secondsAgo} seconds ago`}`}</p>
            </article>
        </a>
    `;
    newsList_ul.appendChild(newsElement_li);
};

// fetch the news
async function fetchItems (id)  {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const data = await response.json();
    displayElement(data);
}


async function loadNews () {
    const listArr = await getList();
    listArr.forEach(fetchItems);
}

// initial display of the first 10 news
loadNews();

// load more news on click
loadMore_button.addEventListener('click', () => {
    indexlist += 10;
    loadNews();
})



