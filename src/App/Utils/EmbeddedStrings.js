//Hardcoding Strings in a front end app is one of the core evils. Use a centralized place to manage them. Enables easy localization when required.
class EmbeddedStrings {
    static PAGE_HOME_HELLO() {
        return 'hello world!'
    }

    static PAGE_NOT_FOUND() {
        return `Oops. You didn't find what you were looking for?`
    }

    static PAGE_ERROR() {
        return `Something when horribly wrong. We've recorded the issue and are looking into it!`
    }
}

export default EmbeddedStrings;