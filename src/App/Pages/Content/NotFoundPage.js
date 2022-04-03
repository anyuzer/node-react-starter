import React from 'react';

const NotFoundPage = (props) => {
    return <div><pre>{JSON.stringify(props, null, 2)}</pre></div>;
    // return <div>Not Found</div>;
};

export default NotFoundPage;