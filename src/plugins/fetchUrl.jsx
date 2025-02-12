const rootUrl = 'http://167.99.138.67:1111'

const fetchUrl = {
    post: (url, data) => {
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return new Promise(resolve => {
            fetch(rootUrl + url, options)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    },
    get: (url) => {
        return new Promise(resolve => {
            fetch(rootUrl + url)
                .then(res => res.json())
                .then(res => {
                    resolve(res)
                })
        })
    }
}

export default fetchUrl