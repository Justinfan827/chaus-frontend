/**
 * Created by Jeffr on 7/18/2017.
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


export const selectUser = (netid) => {
    console.log("SELECT USER: ", netid)
    return (dispatch) => {
        dispatch(get_availability(netid));
        resource('GET', 'user/'+netid).then( r => {
            return dispatch({
                type: "USER_SELECTED",
                user: r[0]
            })
        })
    }

}

export const get_netids = () => {
    return (dispatch) => {
        resource('GET', 'netids').then( r => {
            console.log(r)
            dispatch({
                type: "GET_NETIDS",
                netids: r
            })
        })
    }
}

export const toggle_availability = (dayname, hour, availability, changed) => {
  return (dispatch) => dispatch({
    type: "CHANGE_HOUR_"+dayname,
    hour: hour,
    available: !availability,
    changed: changed
  })
}

export const save_changes = (week, netid) => {
  return (dispatch) => {
    console.log(week, netid)
    resource('PUT', 'master/update/availability/'+netid, week).then( info => {
      dispatch({
        type: "CHANGES_SAVED",
        changes_saved: true
      })
    })
  }
}

export const get_availability = (netid) => {
    return (dispatch) => {
        resource('GET', 'master/available/'+netid).then( schedule => {
            schedule.map(day => {
                Object.keys(day).map(weekLetter => {
                    console.log("DAY: " + weekLetter)
                    console.log(day[weekLetter])
                    day[weekLetter].map((x) => {

                    })
                    dispatch({
                       type:"CHANGE"+weekLetter,
                       state:day[weekLetter]
                    })

                })
            })
        })
    }
}

