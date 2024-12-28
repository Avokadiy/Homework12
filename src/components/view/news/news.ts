import './news.css';

type TData = {
    length: number;
    filter: Function;
}

type TItem = {
    urlToImage: string;
    author: string;
    source: {name:string};
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

type TNews = {
    forEach: Function;
    item: TItem;
    idx: number
}

class News {
    draw(data: TData) {
        const news: TNews = data.length >= 10 ? data.filter((_item: string, idx: number) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: Element|null = document.querySelector('#newsItemTemp');
        
        if (!newsItemTemp) {
            return;
        }

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        news.forEach((item: TItem, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            
            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhotoDOM: HTMLElement | null = newsClone.querySelector('.news__meta-photo');

            if (metaPhotoDOM) {
                metaPhotoDOM.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }

            const metaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');

            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');

            if (metaDate) {
                metaDate.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            }

            const descriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');

            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');

            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');

            if (descriptionContent) {
                descriptionContent.textContent = item.description;
            }

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsDOM = document.querySelector('.news') as HTMLElement;
        newsDOM.innerHTML = '';
        newsDOM.appendChild(fragment);
    }
}

export default News;
