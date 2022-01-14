import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState('2022-01-01')
  const [endDate, setEndDate] = useState('2022-01-05')
  const [likedImages, setLikedImages] = useState([])
  const NASA_URL = 'https://api.nasa.gov/planetary/apod?api_key='
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true)
    const fetchData = async() => {
      const content = await axios.get(`${NASA_URL}${apiKey}`, {
        params: {
          start_date: startDate,
          end_date: endDate,
        }
      });
      setData(content?.data)
      setLoading(false)
    } 
    fetchData()
  }, [startDate, endDate])

  const handleRemove = (id) => {
    setLikedImages(likedImages.filter(image => image !== id))
  }

  const handleAdd = (id) => {
    if (!likedImages.find((image) => image === id)) {
      setLikedImages([...likedImages, id]);
    }
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold py-4">Spacestagram 🚀</h1>
      <div className="flex flex-col">
        <div className="text-2xl text-center font-semibold text-gray-800 py-4">
          See the amazing photos NASA has to offer! 
        </div>
        <div className="text-xl text-center font-semibold text-gray-800 py-4">
          You have {likedImages.length} liked images. 
        </div>
        <form className="flex flex-col gap-4 py-4 mx-auto">
          <div className="flex gap-2">
            <input max={endDate} value={startDate} onChange={e => setStartDate(e.currentTarget.value)} className="px-4 py-2 bg-gray-100" required type="date"/>
            <input min={startDate} value={endDate} onChange={e => setEndDate(e.currentTarget.value)} className="px-4 py-2 bg-gray-100" required type="date"/> 
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="dark:bg-gray-900 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {[].concat(data).map((picture, index) => (
            <div key={index} className="shadow-lg group container rounded-md bg-white max-w-sm flex justify-center items-center content-div"> 
              <div>
                <img className="object-cover h-48 w-96" src={picture?.url} alt={picture?.title} />
                <div className="py-8 px-4 bg-white rounded-b-md">
                  <span className="block text-sm text-gray-600 font-semibold tracking-wide">{picture?.title}</span>
                  <div className="flex gap-4">
                    <span className="block text-md text-gray-600 font-semibold tracking-wide">{picture?.date}</span>
                    <button className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 transition duration-300 ease-in-out hover:bg-blue-600" onClick={() => handleAdd(picture?.url)}>
                      Like
                    </button>
                    <button className="bg-red-500 rounded-lg font-bold text-white text-center px-4 transition duration-300 ease-in-out hover:bg-blue-600" onClick={() => handleRemove(picture?.url)}>
                      Unlike
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}    
    </div>
  )
}

export default App
