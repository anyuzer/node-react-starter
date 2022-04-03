/*
    This class directly interfaces with the live DOM. Not to be used in Node or SSR at all. Used for updating Title, or other meta tags as you navigate through a SPA.
 */
class DirectDOM {
    constructor(_document) {
        this.document = _document;
    }

    setTitle(_title) {
        this.document.title = _title;
    }

    setOGTitle(_ogTitle) {
        const node = this._getMetaTagByPropertyAttribute('og:title');
        if(node) {
            node.setAttribute('content', _ogTitle);
        }
    }

    setOGType(_ogType) {
        const node = this._getMetaTagByPropertyAttribute('og:type');
        if(node) {
            node.setAttribute('content', _ogType);
        }
    }

    setOGUrl(_ogUrl) {
        const node = this._getMetaTagByPropertyAttribute('og:url');
        if(node) {
            node.setAttribute('content', _ogUrl);
        }
    }

    setOGImage(_ogImage) {
        const node = this._getMetaTagByPropertyAttribute('og:image');
        if(node) {
            node.setAttribute('content', _ogImage);
        }
    }

    setOGDescription(_ogDescription) {
        const node = this._getMetaTagByPropertyAttribute('og:description');
        if(node) {
            node.setAttribute('content', _ogDescription);
        }
    }

    _getMetaTagByPropertyAttribute(_propertyName) {
        for(let i=0;i<this.document.head.children.length;i++) {
            const node = this.document.head.children[i];
            if(node.getAttribute('property') === _propertyName) {
                return node;
            }
        }
    }
}

export default DirectDOM;