import React, { useEffect, useState } from 'react'
import 'animate.css'
import { Badge, Button, Card, DatePicker, Empty, Form, Input, Modal, Popconfirm, Select, Tag } from "antd"
import { Delete, Plus } from 'lucide-react'
import { usePlanner } from './store/usePlanner'
import '@ant-design/v5-patch-for-react-19'
import moment from 'moment'

const desc = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate necessitatibus, natus esse pariatur quo ipsam voluptatibus atque velit asperiores illo quam optio delectus quibusdam iste delenitinam neque consectetur dignissimos quasi! Aliquam, quis ipsam?"



const App = () => {

  const [form] = Form.useForm()
  const [open,setOpen] = useState(false)
  const [timer,setTimer]= useState(new Date().toLocaleTimeString())
  const {tasks,addTask,deleteTask,updateStatus,deleteAllTask} = usePlanner()

  const highestTask = tasks.filter((item)=>item.priority==="highest") 
  const mediumTask = tasks.filter((item)=>item.priority==="medium") 
  const lowestTask = tasks.filter((item)=>item.priority==="lowest") 

  const createTask =(value)=>{
    value.status ="pending"
    value.id = Date.now()
    value.createdAt = new Date()

   addTask(value)
   handleClose()

  }

  const handleClose =()=>{
    setOpen(false)
    form.resetFields()
  }
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimer(new Date().toLocaleTimeString())
    },1000)

    return ()=>{
      clearInterval(interval)
    }

  },[])


  return (
    <div className='bg-gray-200 h-screen overflow-hidden '>
      <nav className='bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8 
      text-white bg-gradient-to-r from-rose-500 via-slate-800 to-slate-900  '>

        <div className='flex items-center'>
          <button className='w-10 h-10  bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_50%,_hsl(316.2,_71.84929055810092%,_56.558726527465055%)_100%)] rounded-full font-bold text-white
          '>PL</button>
          <h1 className='text-2xl font-bold ml-px'>anner</h1>
        </div>

        <div className='flex gap-5 items-center'>



      
           <h1 className ="text-2xl font-bold">{timer}</h1>
            <DatePicker className="!py-1.5 lg:block hideen" />

           <button onClick={()=>setOpen(true)} className='focus:shadow-lg hover:scale-105 transition-translate 
           items-center py-2 px-3 rounded text-sm bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600
            text-white flex gap-1 font-medium '  >
              <Plus className="w-4 h-4 " />
              Add Task
            </button>

            <Popconfirm title ="Do you want to delete all task" onConfirm={()=>deleteAllTask()}>
                <button  className='focus:shadow-lg hover:scale-105 transition-translate 
           items-center py-2 px-3 rounded text-sm bg-gradient-to-tr from-rose-600 via-red-500 to-rose-600
            text-white flex gap-1 font-medium '  >
              <Delete className="w-4 h-4 " />
              Delete All Task
            </button>

            </Popconfirm>
            

        </div>
        

       


      </nav>

      <section className='fixed  left-0 h-[calc(100%-120px)] w-full  top-[60px] overflow-x-auto
       overflow-y-visible  grid lg:grid-cols-3 gap-8 p-8'>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>

          <Badge.Ribbon text="Highest" className='!bg-gradient-to-br !from-rose-500 !via-pink-500
           !to-rose-500 font-medium !z-[20000]'/>

          <div className='bg-white h-full min-h-0 rounded-lg overflow-auto p-6 space-y-8 '>
            
            <div className='flex flex-col gap-8'>
              {
                highestTask.length ===0 &&
                (
                  <>
                  <Empty  description = "There is no task added as highest priority"/>
                   <button onClick={()=>setOpen(true)} className=' w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate 
           items-center py-2 px-3 rounded text-sm bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600
            text-white flex gap-1 font-medium '  >Add Task</button>

                  </>
                )
               
              }
              {
                highestTask.map((item,index)=>(
                  <Card hoverable key={index}>

                    <Card.Meta title={item.title}
                      description={item.description }/>

                    <div className="mt-4 flex justify-between items-center">

                      {
                        item.status ==="pending"
                        &&
                        <Tag className="capitalize" > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="inProgress"
                        &&
                        <Tag className="capitalize" color='geekblue' > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="completed"
                        &&
                        <Tag className="capitalize" color='green' > {item.status}
                        </Tag>

                      }
                      <div>
                         <Popconfirm title ="Do you want to delete all task" onConfirm={()=>deleteTask(item.id)}>
                           <Tag className='!bg-rose-500 !border-rose-500 !text-white ' >Delete</Tag>

                         </Popconfirm>
                        
                       
                      </div>

                      <Select size='small' placeholder ="Change Status" onChange={(change)=> updateStatus(item.id,change)}>
                        <Select.Option value="pending">Pending</Select.Option>
                         <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                     
                    </div>
                     <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A') } </label>


                  </Card>
                ))
              }
            </div>


          </div>

        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>

          <Badge.Ribbon text="Medium" className='bg-gradient-to-br !from-indigo-600 !via-blue-500
           !to-indigo-500 font-medium !z-[20000]'/>



          <div className='bg-white h-full min-h-0 rounded-lg overflow-auto p-6 space-y-8 '>
            
            <div className='flex flex-col gap-8'>
              
{
                mediumTask.length ===0 &&
                (
                  <>
                  <Empty  description = "There is no task added as medium priority"/>
                   <button onClick={()=>setOpen(true)} className=' w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate 
           items-center py-2 px-3 rounded text-sm bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600
            text-white flex gap-1 font-medium '  >Add Task</button>

                  </>
                )
               
              }


              {
                mediumTask.map((item,index)=>(
                  <Card hoverable key={index}>

                    <Card.Meta title={item.title}
                      description={item.description }/>

                    <div className="mt-4 flex justify-between items-center">

                      {
                        item.status ==="pending"
                        &&
                        <Tag className="capitalize" > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="inProgress"
                        &&
                        <Tag className="capitalize" color='geekblue' > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="completed"
                        &&
                        <Tag className="capitalize" color='green' > {item.status}
                        </Tag>

                      }
                      <div>
                        
                         <Popconfirm title ="Do you want to delete all task" onConfirm={()=>deleteTask(item.id)}>
                           <Tag className='!bg-rose-500 !border-rose-500 !text-white ' >Delete</Tag>

                         </Popconfirm>
                      </div>

                      <Select size='small' placeholder ="Change Status" onChange={(change)=> updateStatus(item.id,change)}>
                        <Select.Option value="pending">Pending</Select.Option>
                         <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                     
                    </div>
                     <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A') } </label>



                  </Card>
                ))
              }
            </div>


          </div>





        </div>

        <div className='lg:h-full lg:min-h-0 h-[300px]'>

          <Badge.Ribbon text="Lowest" className='bg-gradient-to-br !from-amber-600 !via-orange-500
           !to-amber-500 font-medium !z-[20000]'/>


<div className='bg-white h-full min-h-0 rounded-lg overflow-auto p-6 space-y-8 '>
            
            <div className='flex flex-col gap-8'>
              {
                lowestTask.length ===0 &&
                (
                  <>
                  <Empty  description = "There is no task added as lowest priority"/>
                   <button onClick={()=>setOpen(true)} className=' w-fit mx-auto focus:shadow-lg hover:scale-105 transition-translate 
           items-center py-2 px-3 rounded text-sm bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-600
            text-white flex gap-1 font-medium '  >Add Task</button>

                  </>
                )
               
              }
              {
                lowestTask.map((item,index)=>(
                  <Card hoverable key={index}>

                    <Card.Meta title={item.title}
                      description={item.description }/>

                    <div className="mt-4 flex justify-between items-center">

                      {
                        item.status ==="pending"
                        &&
                        <Tag className="capitalize" > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="inProgress"
                        &&
                        <Tag className="capitalize" color='geekblue' > {item.status}
                        </Tag>

                      }
                      {
                        item.status ==="completed"
                        &&
                        <Tag className="capitalize" color='green' > {item.status}
                        </Tag>

                      }
                      <div>
                        
 <Popconfirm title ="Do you want to delete all task" onConfirm={()=>deleteTask(item.id)}>
                           <Tag className='!bg-rose-500 !border-rose-500 !text-white ' >Delete</Tag>

                         </Popconfirm>
                      </div>

                      <Select size='small' placeholder ="Change Status" onChange={(change)=> updateStatus(item.id,change)}>
                        <Select.Option value="pending">Pending</Select.Option>
                         <Select.Option value="inProgress">inProgress</Select.Option>
                          <Select.Option value="completed">Completed</Select.Option>
                      </Select>
                     
                    </div>
                     <label className='text-slate-600 text-xs flex mt-3'>{moment(item.createdAt).format('DD MMM YYYY hh:mm A') } </label>



                  </Card>
                ))
              }
            </div>


          </div>





        </div>





      </section>

      <footer className='text-white bg-gradient-to-l from-rose-500 via-slate-800 to-slate-900
      bg-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8 '>
         <h1 className ="text-2xl font-bold">Toatal tasks -{tasks.length}</h1>
         <a href="https://zustand-planner.vercel.app/" className='hover:underline'> https://zustand-planner.vercel.app/</a>


      </footer>

      <Modal open={open} footer ={null} onCancel={handleClose} maskClosable={false}>
        <h1 className='text-lg font-medium mb-4'>New Task </h1>
        <Form onFinish={createTask} form={form} >
          <Form.Item
          name ="title"
          rules={[{required:true}]}>
            <Input placeholder='Task name' 
            size='large'/>
          </Form.Item>

          <Form.Item
          name ="description"
          rules={[{required:true}]}>
            <Input.TextArea
            placeholder='Task description goes here' 
            rows={5}/>
          </Form.Item>

           <Form.Item
          name ="priority"
          rules={[{required:true}]}>
            <Select size='large' placeholder="Choose Priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item>
            <Button htmlType='submit' type ='primary'>Submit</Button>
          
          </Form.Item>
        </Form>

      </Modal>




    </div>
  )
}

export default App
