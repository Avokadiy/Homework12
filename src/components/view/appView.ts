import News from './news/news';
import Sources from './sources/sources';

export class AppView {

    public news: News;
    public sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: { articles: string }) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(Object(values));
    }

    drawSources(data: { sources: string }) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(Object(values));
    }
}

export default AppView;
