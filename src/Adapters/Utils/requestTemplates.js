export default {
    jsonPOST: {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    },
    jsonPATCH: {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    },
    jsonDelete: {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors"
    },
    basicGET: {
        method: "GET",
        mode: "cors",
        headers: {}
    },
    basicDELETE: {
        method: "DELETE",
        mode: "cors",
        headers: {}
    }
};