import { ArcEvents } from 'arc-lib';

/*
    Meta resolution is generally a pain. While your root address + session should be enough to define data required for your render tree, your page content often wants to decide the state of the meta tags. This is a coordination issue with a bunch of random implications and probably a better solution than this. Regardless, in this case, we basically pass a resolver in with hard timeouts, and expect the render tree to resolve the data we need in a reasonable amount of time, otherwise we decide our social tags just aren't that important and set them to false or a default.
 */
class MetaResolver {
    static get EVENT_CHANGE_TITLE() {
        return 'title';
    }

    static get EVENT_CHANGE_OGTITLE() {
        return 'ogTitle';
    }

    static get EVENT_CHANGE_OGURL() {
        return 'ogUrl';
    }

    static get EVENT_CHANGE_OGIMAGE() {
        return 'ogImage';
    }

    static get EVENT_CHANGE_OGTYPE() {
        return 'ogType';
    }

    static get EVENT_CHANGE_OGDESCRIPTION() {
        return 'ogDescription';
    }

    constructor(_routeData) {
        this.routeData = _routeData;
        ArcEvents.mixin(this);
        this.title = undefined;
        this.titleResolver = null;
        this.titlePromise = null;

        this.ogTitle = undefined;
        this.ogTitleResolver = null;
        this.ogTitlePromise = null;

        this.ogURL = undefined;
        this.ogURLResolver = null;
        this.ogURLPromise = null;

        this.ogImage = undefined;
        this.ogImageResolver = null;
        this.ogImagePromise = null;

        this.ogType = undefined;
        this.ogTypeResolver = null;
        this.ogTypePromise = null;

        this.ogDescription = undefined;
        this.ogDescriptionResolver = null;
        this.ogDescriptionPromise = null;

        this._initPromises();
    }

    setOGFalse() {
        this.setOGTitle('');
        this.setOGDescription('');
        this.setOGType('');
        this.setOGImage('');
        this.setOGUrl('');
    }

    // Title
    async getTitle() {
        return this.titlePromise;
    }

    setTitle(_t1, _t2, _t3, _setOGTitle) {
        let title = _t1 || '';
        title = title && _t2 ? `${title} | ${_t2}` : _t2;
        title = title && _t3 ? `${title} - ${_t3}` : _t3;

        if(title !== this.title) {
            this.title = title;
            this.titleResolver(title);
            this.emit(MetaResolver.EVENT_CHANGE_TITLE, [title]);
        }
        if(_setOGTitle) {
            this.setOGTitle(title);
        }
    }

    // OG:Title
    async getOGTitle() {
        return this.ogTitlePromise;
    }

    setOGTitle(_title) {
        if(_title !== this.ogTitle) {
            this.ogTitle = _title;
            this.ogTitleResolver(_title);
            this.emit(MetaResolver.EVENT_CHANGE_OGTITLE, [_title]);
        }
    }

    // OG:URL
    async getOGUrl() {
        return this.ogURLPromise;
    }

    setOGUrl(_url) {
        _url = `${_url}`;
        if(this.ogURL !== _url) {
            this.ogURL = _url;
            this.ogURLResolver(_url);
            this.emit(MetaResolver.EVENT_CHANGE_OGURL, [_url]);
        }
    }

    // OG:Image
    async getOGImage() {
        return this.ogImagePromise;
    }

    setOGImage(_imageUrl) {
        _imageUrl = ``;
        if(this.ogImage !== _imageUrl) {
            this.ogImage = _imageUrl;
            this.ogImageResolver(_imageUrl);
            this.emit(MetaResolver.EVENT_CHANGE_OGIMAGE, [_imageUrl]);
        }
    }

    // OG:Type
    async getOGType() {
        return this.ogTypePromise;
    }

    setOGType(_type) {
        if(_type !== this.ogType) {
            this.ogType = _type;
            this.ogTypeResolver(_type);
            this.emit(MetaResolver.EVENT_CHANGE_OGTYPE, [_type]);
        }
    }

    // OG:Description
    async getOGDescription() {
        return this.ogDescriptionPromise;
    }

    setOGDescription(_description) {
        if(_description !== this.ogDescription) {
            this.ogDescription = _description;
            this.ogDescriptionResolver(_description);
            this.emit(MetaResolver.EVENT_CHANGE_OGDESCRIPTION, [_description]);
        }
    }

    //Private
    _initPromises() {
        this._initTitle();
        this._initOGTitle();
        this._initOGURL();
        this._initOGImage();
        this._initOGType();
        this._initOGDescription();
    }

    _initTitle() {
        this.titlePromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta title timeout...');
                console.log(this.routeData);
                _resolve('[Website Name]');
            }, 250);
            this.titleResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }

    _initOGTitle() {
        this.ogTitlePromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta ogTitle timeout...');
                _resolve(false);
            }, 250);
            this.ogTitleResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }

    _initOGURL() {
        this.ogURLPromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta ogUrl timeout...');
                _resolve(false);
            }, 250);
            this.ogURLResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }

    _initOGImage() {
        this.ogImagePromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta ogImage timeout...');
                _resolve(false);
            }, 250);
            this.ogImageResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }

    _initOGType() {
        this.ogTypePromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta ogType timeout...');
                _resolve(false);
            }, 250);
            this.ogTypeResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }

    _initOGDescription() {
        this.ogDescriptionPromise = new Promise((_resolve, _reject) => {
            const timeoutId = setTimeout(() => {
                console.log('Meta ogDescription timeout...');
                _resolve(false);
            }, 250);
            this.ogDescriptionResolver = (_val) => {
                clearTimeout(timeoutId);
                _resolve(_val);
            };
        });
    }
}

export default MetaResolver;

