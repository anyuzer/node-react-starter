import fetch from 'cross-fetch';

import queryStringify from "./Utils/queryStringify";
import requestTemplates from "./Utils/requestTemplates";

//An example client
class ExampleClient {
    constructor() {
        //http://universities.hipolabs.com/search?country=Canada
        this.host = 'http://universities.hipolabs.com';
        this.searchEndpoint = '/search';
    }

    //Search universities by country
    async search(_country) {
        const response = await fetch(`${this.host}${this.searchEndpoint}${this._createSearchQuery(_country)}`, requestTemplates.basicGET);
        return await response.json();
    }

    _createSearchQuery(_country) {
        return queryStringify({
            country: _country.toLowerCase()
        })
    }
}

export default new ExampleClient();