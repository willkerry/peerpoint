import { Fetcher } from 'swr';

// Pass a url and JSON body to the fetcher
const fetcher: Fetcher = (url: string, body: Object) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(res => res.json());
}

export default fetcher;