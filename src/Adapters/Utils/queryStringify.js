import { ArcObject, is } from 'arc-lib';
import serialize from 'serialize-javascript';

export default (_obj) => {
    _obj = ArcObject.wrap(_obj);
    const queryString = _obj.reduce((_array, _val, _key) => {
        switch (is(_val)) {
            case 'undefined': return _array;
            case 'object': case 'array': _array.push(`${encodeURI(_key)}=${serialize(_val)}`); break;
            default: _array.push(`${encodeURI(_key)}=${String(_val)}`); break;
        }
        return _array;
    }, []).join('&');
    return (!_obj.count() ? '' : `?${queryString}`);
};