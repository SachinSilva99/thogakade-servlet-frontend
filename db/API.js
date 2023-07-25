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

    async save(type, data) {
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
            xhr.send(data);
        });

    }

    async existsByPk(type, pkName, pk) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', this.api + type + '?' + pkName + '=' + pk);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    console.log(type, ' data retrieved successfully:', responseData);
                    resolve(responseData);
                } else {
                    console.error('Failed to retrieve' + type + 'data Error:', xhr.statusText);
                    reject(new Error('Failed to retrieve ' + type + ' data.'));
                }
            };
            xhr.onerror = () => {
                console.error('Failed to make the request.');
                reject(new Error('Failed to make the request.'));
            };
            xhr.send();
        });
    }

    async delete(type, pkName, pk) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', this.api + type + '?' + pkName + '=' + pk);
            xhr.onreadystatechange = function () {
                if (xhr.status === 200) {
                    console.log(type + ' deleted successfully.');
                    resolve(true);
                } else {
                    resolve(false);
                    reject(new Error('Failed to delete ' + type));
                    console.error('Failed to delete ' + type + ' :', xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error('Failed to make the request.');
            };
            xhr.send();
        });
    }

    async update(type, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', this.api + type);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = () => {
                if (xhr.status === 200) {
                    const responseData = JSON.parse(xhr.responseText);
                    console.log(type, ' data updated successfully:', responseData);
                    resolve(responseData);
                } else {
                    console.error('Failed to update' + type + 'data Error:', xhr.statusText);
                    reject(new Error('Failed to update ' + type + ' data'));
                }
            };
            xhr.onerror = () => {
                console.error('Failed to make the request.');
                reject(new Error('Failed to make the request.'));
            };
            xhr.send(data);
        });
    }
}