import axios from 'axios'
import * as urls from '../Urls'

export const baseUrl = 'https://kophy-rpa.herokuapp.com/api/v1'
const accessToken = window.localStorage.getItem('accessToken')
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
axios.defaults.headers['x-access-token'] = `${accessToken}`

// export const validateFormEmail = (data) =>
//   axios({
//     method: "post",
//     url: urls.validateEmailUrl,
//     data,
//   });

// export const getWorkspaceStats = (id) =>
//   axios({
//     method: "get",
//     url: urls.getWorkspaceStatsUrl,
//     params: {
//       id,
//     },
//   });

export const getWorkspaceStats = () =>
    axios({
        method: 'get',
        url: urls.getWorkspaceStatsUrl,
    })

export const getFlows = () =>
    axios({
        method: 'get',
        url: urls.getFLowsUrl,
    })

export const getRobots = () =>
    axios({
        method: 'get',
        url: urls.RobotsUrl,
    })

export const deleteProjectFlow = (id) =>
    axios({
        method: 'delete',
        url: `${baseUrl}/flow/${id}`,
    })
export const consoleFunctions = () =>
    axios({
        method: 'get',
        url: urls.consoleFunctionsUrl,
    })

export const billingSubscriptions = () =>
    axios({
        method: 'get',
        url: urls.billingSubscriptionsUrl,
    })

    export const deleteUser = (id) =>
    axios({
        method: 'delete',
        url: `${baseUrl}/workspace/user/${id}`,
    })

export const createTrigger = (data) =>
  axios({
    method: "post",
    url: urls.createTriggerUrl,
    data,
  });

  export const retrieveFlowData = (id) =>
  axios({
      method: 'get',
      url: `${baseUrl}/flow/${id}`,
  })

  export const getUsers = (id) =>
  axios({
      method: 'get',
      url: urls.getUsersUrl, 
      
  })

  export const saveFlowData = (data, id, flowDataId) =>
  axios({
    method: "post",
    url: `${baseUrl}/flow/${id}/${flowDataId}`,
    data,
  });

  export const addRobot = (data) =>
  axios({
    method: "post",
    url: urls.RobotsUrl,
    data,
  });

  export const deleteRobot = (id) =>
    axios({
        method: 'delete',
        url: `${baseUrl}/bots/${id}`,
    })

    export const updateRobot = (data, id) =>
    axios({
        method: 'patch',
        url: `${baseUrl}/bots/${id}`,
        data
    })

    export const updateFlow = (data, id) =>
    axios({
        method: 'patch',
        url: `${baseUrl}/flow/${id}`,
        data
    })

    export const workspaceInvite = (data) =>
    axios({
        method: 'put',
        url: urls.workspaceInviteUrl,
        data
    })

    export const shareFlow = (data, id) =>
    axios({
      method: "post",
      url: `${baseUrl}/flow/${id}/share`,
      data,
    });

    export const inviteUserToFlow = (data, id) =>
    axios({
      method: "post",
      url: `${baseUrl}/flow/${id}/invite`,
      data,
    });

    // Create New Version
    export const addFlowData = (data, id) =>
    axios({
      method: "post",
      url: `${baseUrl}/flow/${id}`,
      data,
    });

