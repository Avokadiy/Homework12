import './sources.css';
type TItem = {
    name: string;
    id: string;
}
class Sources {
    draw(data: TItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLElement;

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            return;
        }

        data.forEach((item: TItem) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            const itemNameDOM: Element | null = sourceClone.querySelector('.source__item-name');
            
            if (itemNameDOM) {
                itemNameDOM.textContent = item.name;
            }

            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        let sourcesDOM = document.querySelector('.sources') as HTMLElement;
        sourcesDOM.append(fragment);
    }
}

export default Sources;
