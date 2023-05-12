import React from 'react'

import axios from 'axios'

const App = () => {
  const [data, setData] = React.useState<any>()

  async function get() {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=332d2f088f6e00e5c68ba3305405a5a1')
      const data = response.data
      setData(data)
      console.log(data)
    }catch(error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    get()
  }, [])

  return (
    <div>
      teste
    </div>
  )
}

export default App
