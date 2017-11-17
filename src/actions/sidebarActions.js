/**
 * Created by dandreini16 on 10/22/17.
 */

export const url =  'http://localhost:3000';


const resource = (method, endpoint, payload) => {
    // console.log("THE ENDPOINT: " + endpoint + "\n" + "THE PAYLOAD: " + payload + "\n" + "THE METHOD: " + method)
    const options =  {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (payload) options.body = JSON.stringify(payload)

    // console.log('The options for ', endpoint, options)
    // console.log('The url: ',`${url}/${endpoint}`)
    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
            } else {
                // useful for debugging, but remove in production
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
        .catch(err => console.error(err))
}


export const toggleMenu = (state) => {
    return (dispatch) => dispatch({
        type:"TOGGLEBURGER",
        toggle:!state
    })
}


export const changePage = (page) => {
    return (dispatch) => dispatch({
        type:"CHANGELOCATION",
        location:page
    })
}