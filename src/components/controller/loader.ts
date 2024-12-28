type TResponse = {
    ok:boolean,
    status: number,
    statusText: string,
    json:Function
};

type TResponseParams = {
    endpoint: string,
    options?: object
}

class Loader {

    private baseLink: string;
    private options: object;

    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }:TResponseParams,

        callback:Function = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res:TResponse): TResponse {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options:object, endpoint:string): string {
        const urlOptions:Record<string, string> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1); 
    }

    load(method:string, endpoint:string, callback: Function, options: object): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res:TResponse) => res.json())
            .then((data:string[]) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
