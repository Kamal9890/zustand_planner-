import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import "animate.css"
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

const Api_Key = "AIzaSyDoA6l2RMMwinpZ-3D6mu2CCdm_uOz-DJE"

const App = () => {


  const [message, setMessage] = useState("")
  const [chats, setChats] = useState([])
  const [isTyping,setTyping] = useState(false )

  const createChat = async (e) => {

    try {



      e.preventDefault()
      setChats((prev)=>[
         ...prev,
        {
          
          sender: "me",
          message: message,
          createdAt: new Date()


        }
      ])

      setMessage('')

      setTyping(true)
      const payload = {

        contents: {
          parts: {
            text: `Answer this on short- ${message}`
          }
        }
      }

      const option = {

        headers: {
          "X-goog-api-key": Api_Key

        }

      }

      const { data } = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", payload, option)
      const ai_result = (data.candidates[0].content.parts[0].text);
     setChats((prev)=>[
         ...prev,
        {
          
          sender: "ai",
          message: ai_result,
          createdAt: new Date()


        }
      ])

    } catch (error) {
      toast.error(error.message)
    }

    finally{
      setTyping(false)
    }


  }

  return (
    <div className='min-h-screen bg-gray-200 '>
      <div className='w-9/12 mx-auto  bg-white pt-12 pb-48 min-h-screen'>
        <h1 className='text-3xl text-center font-bold '>
          Ai Chat  </h1>
          

        <div className='p-8 space-y-6 '>


          {
            chats.map((item, index) => (
              <div key={index}>
                {
                  item.sender === "me" &&
                  <div className='flex items-end flex-col gap-2 animate__animated animate__fadeIn '>

                    <div className='bg-rose-200 text-black font-medium  px-6 py-3 rounded-xl w-9/12'>
                      {item.message}

                    </div>
                   
                  </div>

                }
                {
                  item.sender === "ai" &&
                  <div className='flex justify-start flex-col gap-2 animate__animated animate__fadeIn '>

                    <div className='bg-green-200 text-black font-medium  px-6 py-3 rounded-xl w-9/12 '>
                      {item.message}

                    </div>
                  </div>
                }



              </div>
            ))
          }










        </div>

        {
            isTyping &&
            <div className=' flex justify-start px-8 '>
           <small className='text-gray-500 text-sm font-medium animate__animated animate__fadeIn'>Typing..</small>

            </div>
          }





        <div className='bg-indigo-600 p-8 fixed bottom-0 w-9/12  '>
          <form className='flex gap-4 ' onSubmit={createChat}>
            <input
              required
              className='bg-white rounded-xl p-6 w-full'
              placeholder='Chat with ai'
              onChange={(e) => setMessage(e.target.value.trim())}
            />
            <button className=' bg-yellow-500 px-12 rounded-xl text-white flex flex-col items-center justify-center
           hover:bg-green-400 hover:scale-105 transition-transform duration-300 '>
              <ExternalLink />

              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App