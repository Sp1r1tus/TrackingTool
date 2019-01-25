import axios from 'axios';

export const GET_TRACKINGTOOL_LIST = async () => {
    let res
    // xDreamfactory Call to our API
    await axios.get('...sql_tools/TrackingToolMonitor', {

    }
    )
        .then(response => res = response.data.resource);
    return res

}