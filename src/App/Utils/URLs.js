//Hardcoding URLs in a front end app is one of the core evils. Use a centralized place to manage them.
//These should be embedded urls, or link urls NOT Client urls (which should be maintained in the client)
class URLs {
    static baseUrl() {
        return 'http://localhost:8800'
    }
}

export default URLs;