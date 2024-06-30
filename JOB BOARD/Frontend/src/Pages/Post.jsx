import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Posting } from '../Redux/Slices/JobInternSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Post = () => {
  const navigate=useNavigate()
  const [postData,setPostData]=useState({
      role:'',
      company:'',
      title:'',
      salary:'',
      experience:'',
      deadline:'',
      description:'',
      id:'',
      skills:'',
      perks:[],
      type:'',
      venue:'',
      stipend:''
  })
  const dispatch=useDispatch()
  const id=useSelector((state)=>state?.auth?.id)
  function handleUserInput(e){
      const {name,value}=e.target;
      setPostData({
          ...postData,
          [name]:value
      })
  }


const [skills, setSkills] = useState(['']);
const [perks, setPerks] = useState(['']);

const handleAddInputSkill = (e) => {
  e.preventDefault()
  setSkills([...skills, '']);
};

const handleRemoveInputSkills = (event) => {
  event.preventDefault();
  // Remove the last element from the array
  const values = [...skills];
  if (values.length > 1) {
    values.pop();
    setSkills(values);
  }
};
const handleRemoveInputPerks = (event) => {
  event.preventDefault();
  // Remove the last element from the array
  const values = [...perks];
  if (values.length > 1) {
    values.pop();
    setPerks(values);
  }
};

const handleInputChangeSkill = (index, event) => {
  const values = [...skills];
  values[index] = event.target.value;
  setSkills(values);
};



const handleAddInputPerks = (e) => {
  e.preventDefault()
  setPerks([...perks, '']);
};



const handleInputChangePerks = (index, event) => {
  const values = [...perks];
  values[index] = event.target.value;
  setPerks(values);
};






async function Post(e){
  e.preventDefault()
  // console.log('reac');
  
  // const res=

  // console.log('brfore changes',postData);
  console.log('id before set',id);
  setPostData((prevPostData) => ({
    ...prevPostData,
    id:id
  }));
  console.log('bMBORITA');
  console.log(!postData.company);
  // console.log(!);
  if(!postData.company || !postData.deadline || !postData.description || !postData.experience || !postData.perks || !postData.skills || !postData.title || !postData.type ||  !postData.venue || (postData.type=='Internship' && !postData.stipend) || (postData.type=='Job' && !postData.salary)){
    console.log('aBhay');
    toast.error('All Fields are required')
           return
      
  }

  console.log('conditon',!postData.salary,!postData.stipend);
  console.log('postdata',postData);
  const res= await dispatch(Posting(postData))
  console.log('resdjdfjdf',res);

  if(res?.payload?.success){
    navigate('/')
  }
  // setPostData('')
  // setPerks('')
  // setSkills('')
  // console.log('after changes',postData);
  // set
  
}

useEffect(() => {
  setPostData((prevPostData) => ({
    ...prevPostData,
    skills,
    perks,
  }));
}, [skills, perks]);

  return (
      <div className='flex items-center justify-center'>

<div className="w- min-h-[100vh]  h-fit-content flex flex-col justify-center items-center bg-red-200 rounded-xl rounded-full bg-content w-[70%] p-[4%]">
  <h1 className='text-center font-sans text-5xl'>Add New Post</h1>
      
            <main className='grid grid-cols-2 w-full gap-x-10 overflow--scroll mt-[5%] '>
                        <div className='gap-y-6'>
                            <div>
                                
                                
                            </div>
                            <div className='flex flex-col gap-1'>
                                    <input 
                                        type="text" 
                                        required 
                                        name='title' 
                                        id='title' 
                                        placeholder='Enter Title' 
                                        className='bg-transparent px-2 py-2 border rounded-xl '
                                        value={postData.title}
                                        onChange={handleUserInput} 
                                        />
                                    <input 
                                        type="text" 
                                        required 
                                        name='company' 
                                        id='company' 
                                        placeholder='Enter Company' 
                                        className='bg-transparent px-2 py-2 border rounded-xl'
                                        value={postData.company}
                                        onChange={handleUserInput} 
                                        />

                                    <select id="options" class="m- h-15 block w-full border text-3 bg-transparent  border-gray-300 bg-white p-5 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='type' value={postData.type} onChange={handleUserInput}>
                                        <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Type</option>
                                        <option value="Internship" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Internship</option>
                                        <option value="Job" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Job</option>
                                    </select>
                                    <input 
                                    type="text" 
                                    required 
                                    name='experience' 
                                    id='experience' 
                                    placeholder='Experience Required' 
                                    className='bg-transparent px-2 py-1 border'
                                    value={postData.experience}
                                    onChange={handleUserInput}
                                     />
                                    <div className="flex flex-col gap-3">
                        
                        {perks.map((input, index) => (
                          <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(event) => handleInputChangePerks(index, event)}
                            placeholder="Add Perks"
                            className='flex p-2 bg-transparent rounded-xl border'
                          />
                        ))}
                      <div className='flex gap-5 justify-center'>
                      <button onClick={handleAddInputPerks} className='px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl'>Add Perks</button>
                      {perks.length>1 &&<button onClick={handleRemoveInputPerks} className='px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl'>Remove Perks</button>}
                      </div>
                  </div>

                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-col gap-1'>
                                        <input 
                                            type="text" 
                                            required 
                                            name='venue' 
                                            id='venue' 
                                            placeholder='Enter venue ' 
                                            className='bg-transparent px-2 py-2 border rounded-xl'
                                            value={postData.venue}
                                            onChange={handleUserInput} 
                                            />
                            </div>

                            <div className='flex flex-col gap-1'>
                                {postData.type=='Job' && <input 
                                    type="text" 
                                    required 
                                    name='salary' 
                                    id='salary' 
                                    placeholder='Enter Salary' 
                                    className='bg-transparent px-2 py-2 border rounded-xl'
                                    value={postData.salary}
                                    onChange={handleUserInput} 
                                    />}
                                {console.log('type',postData.type)}
                                {postData.type!='' && postData.type!='Job' &&  <input 
                                    type="text" 
                                    required 
                                    name='stipend' 
                                    id='stipend' 
                                    placeholder='Enter Stipend' 
                                    className='bg-transparent px-2 py-2 border rounded-xl '
                                    value={postData.stipend}
                                    onChange={handleUserInput} 
                                    /> }   
                            </div>
                            
                            <div className='flex flex-col gap-2'>
                                

                                <input 
                                    type="date" 
                                    required 
                                    name='deadline' 
                                    id='deadline' 
                                    placeholder='Deadline' 
                                    className='bg-transparent px-2 py-1 border'
                                    value={postData.deadline}
                                    onChange={handleUserInput}
                                     />
                                <textarea
                                    placeholder='Enter Description' 
                                    type='text' 
                                    // onResize={none}
                                    // resize-none
                                    name="description" 
                                    className='p-4 bg-transparent border resize-none'  
                                    value={postData.description} 
                                    onChange={handleUserInput}
                                />

<div className='flex flex-col gap-3'>
                            {skills.map((input, index) => (
                              <input
                                key={index}
                                type="text"
                                value={input}
                                onChange={(event) => handleInputChangeSkill(index, event)}
                                placeholder="Add Skill"
                                className='p-2 bg-transparent border rounded-xl '
                              ></input>
                            ))}
                            <div className='flex gap-5 justify-center '>
                                <button onClick={handleAddInputSkill} className='px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl'>Add Skill</button>
                                {console.log('cjeckign length',skills.length)}
                                {skills.length>1 &&<button onClick={handleRemoveInputSkills} className='px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-xl'> Remove Skill</button>}
                            </div>
                            
                            </div>


                            </div>
                        </div>
                    </main>
                    <button className='text-center  bg-gradient-to-r from-cyan-500 to-blue-700  hover:from-pink-500 hover:to-yellow-500 w-[10%] py-3 rounded-xl' onClick={Post}>Submit</button>
    </div>
      </div>
  )
}

export default Post
