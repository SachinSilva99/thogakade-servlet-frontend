export class API {
    constructor() {
        this.api = 'http://localhost:8001/thogakade/';
    }

    getAll(type) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.api + type);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const responseData = JSON.parse(xhr.responseText);
                        const dataArray = Array.isArray(responseData) ? responseData : [responseData];
                        resolve(dataArray);
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.onerror = () => {
                reject('Failed to make the request.');
            };
            xhr.send();
        });
    }

    async save(type, customer) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.api + type);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.status === 201) {
                    resolve(type + ' saved successfully:', xhr.responseText);
                } else {
                    reject(new Error('Failed to save student data'));
                }
            };
            xhr.onerror = () => {
                console.error('Failed to make the request.');
            };
            xhr.send(customer);
        });

    }

    async existsByPk(customer, pk) {


    }
}