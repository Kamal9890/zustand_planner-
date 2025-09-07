import { Download, Trash2, Upload } from 'lucide-react'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useImageStore } from './zustand/useimageStore.js'


const Five_MB = (5*1024*1024)

const App = () => {

  const {images,setImage, deleteImage}= useImageStore()



  const handleFile = (e)=>{
    const input = e.target
    const file = input.files[0]

    if(!file.type.startsWith("image/"))
    {
      return toast.error("Please select an image file ", {position :"top-center"})

    }
    if(file.size > Five_MB)
      {
         return toast.error("File size too large upload less than 5 mb ", {position :"top-center"})
        
      }


     const filereader = new FileReader()
     filereader.readAsDataURL(file)

     filereader.onload= ()=>{
      setImage({
        id: Date.now(),
        name:file.name,
        size:file.size,
        binary:filereader.result,
        createdAt:new Date()
      })

      toast.success("New image added",{position:"top-center"})

     }

   


  }

  const downloadImage=(item)=>{

    const a= document.createElement("a")
    a.href = item.binary
    a.download = item.name
    a.click()
    a.remove()

  }

  return (
    <div className= "min-h-screen bg-gray-200 lg:px-0 px-8">
     <div className='lg:w-9/12 mx-auto py-10 space-y-8 '>
       <h1 className='text-4xl font-bold text-center  '>
        Image Storage
      </h1>

      <button className='w-full relative cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg lg:w-9/12 mx-auto border-2 border-dashed border-white flex flex-col items-center gap-3 
      text-white bg-blue-500 py-10  rounded-xl '>
       <Upload className='w-16 h-16'/>
        <h1 className='text-xl font-medium '>Click me to add an image</h1>

        <input onChange={handleFile}
        type="file" className='absolute top-0 left-0 w-full h-full rounded-xl opacity-0' />

     
      </button>
    <div className='grid lg:grid-cols-3 gap-8'>
      {
        images.map((item,index)=>(
          <div key={index}  className='overflow-hidden'>
            <img src={item.binary} alt=""  className='w-full h-[150px] object-cover rounded-t-xl hover:scale-110 transition-transform duration-300 hover:shadow-lg '/>
            <div className='bg-white p-3 rounded-b-xl'>
              <h1 className='font-semibold'>{item.name}</h1>
              <p className='text-gray-500'>{((item.size/1024)/1024).toFixed(1)}Mb</p>
              <div className=' flex gap-3 mt-3'>
                <button className='w-8 h-8 bg-green-400 rounded flex items-center justify-center text-white
                hover:bg-cyan-500 hover:scale-110 transition-transform duration-300  ' onClick={()=>downloadImage(item)}>
                  <Download  className='w-4 h-4'/>

                </button>

                 <button className='w-8 h-8 bg-rose-400 rounded flex items-center justify-center text-white
                hover:bg-pink-500 hover:scale-110 transition-transform duration-300  ' onClick={()=>deleteImage(item.id)}>
                  <Trash2  className='w-4 h-4'/>

                </button>
                
              </div>
            </div>
           
          </div>
        ))
      }
    </div>


      
     </div>

     <ToastContainer/>

    </div>
  )
}

export default App