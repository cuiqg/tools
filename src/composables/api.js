export const bing = () => {
  const bingApiHost = import.meta.env.VITE_BING_API_HOST ?? 'https://api.7ed.net/bing/api'

  return new Promise((resolve) => {
    const queryParams = (new URLSearchParams({
      cn: true,
      rand: false
    })).toString()
    resolve(`${bingApiHost}?${queryParams}`)
  })
}

export const soup = async () => {
  const soupApiHost = import.meta.env.VITE_SOUP_API_HOST ?? 'https://api.7ed.net/soup/api'

  return await fetch(soupApiHost).then((response) => {
    if (!response.ok) {
      console.error('Fetch Http Error: ', `status=${response.status}`)
      throw new Error('Network response was not ok')
    }
    return response.json()
  }).then((res) => {
    if (res.code === 1) {
      return res.badsoup
    }
    else {
      return ''
    }
  }).catch((error) => {
    console.error('Fetch Error: ', error)
  })
}
