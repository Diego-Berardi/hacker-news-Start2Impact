


import '../scss/main.scss';

const newsList_url = 'https://hacker-news.firebaseio.com/v0/newstories.json';

const newsList_ul = document.querySelector('.news-list');
const loadMore_button = document.querySelector('#load-more');
let indexlist = 0;

async function getList() {
    const response = await fetch(newsList_url);
    const data = await response.json();
    return (data.slice(indexlist,(indexlist + 10)));
}

function displayElement(news)  {
    const newsElement_li = document.createElement('li');
    
    
    const now = new Date().getTime();
    const date = new Date(news.time * 1000);
    // const dateStr = date.toString().split(' GMT')[0];


    
    const risultato = now - date;

    const minuteAgo = Math.floor((risultato / 1000)/60) 
    const hoursAgo =  Math.floor(minuteAgo/60);

    
    newsElement_li.innerHTML = `
        <a href="${news.url}">
            <article class="news-item">
                <h3>${news.title}</h3>
                <p>  ${minuteAgo>60 ? `${hoursAgo} ${ (hoursAgo > 1)? 'hours ago' : 'hour ago'  }` : `${minuteAgo} minutes ago`}  </p>
            </article>
        </a>
    `;
    newsList_ul.appendChild(newsElement_li);
};

async function fetchItems (id)  {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const data = await response.json();
    displayElement(data);
}


async function getItems () {
    const listArr = await getList();
    listArr.forEach(fetchItems);
}

getItems();


loadMore_button.addEventListener('click', () => {
    indexlist += 10;
    getItems();
} )





