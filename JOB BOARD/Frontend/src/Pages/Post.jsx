import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Posting } from '../Redux/Slices/JobInternSlice';
import { useNavigate } from 'react-router-dom';
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
  console.log('id is',id);
  function handleUserInput(e){
      const {name,value}=e.target;
      setPostData({
          ...postData,
          [name]:value
      })
  }


const [skills, setSkills] = useState(['']);
const [perks, setPerks] = useState(['']);

const handleAddInput = (e) => {
  e.preventDefault()
  setSkills([...skills, '']);
};

const handleRemoveInput = (event) => {
  event.preventDefault();
  // Remove the last element from the array
  const values = [...skills];
  if (values.length > 1) {
    values.pop();
    setSkills(values);
  }
};
const handleRemoveInput1 = (event) => {
  event.preventDefault();
  // Remove the last element from the array
  const values = [...perks];
  if (values.length > 1) {
    values.pop();
    setPerks(values);
  }
};

const handleInputChange = (index, event) => {
  const values = [...skills];
  values[index] = event.target.value;
  setSkills(values);
};



const handleAddInput1 = (e) => {
  e.preventDefault()
  setPerks([...perks, '']);
};



const handleInputChange1 = (index, event) => {
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
    <div className="w- min-h-[100vh] h-fit-content bg-[url('/src/assets/background.jpg')] bg-cover">
        <form className='flex flex-col gap-5 lg:h-[50%] w-[10%]  md:h-[100%] bg-blak md:w-[100%] items-center max-sm:w-[90%] max-sm:h-[75%] max-md:w-[100%] max-md:h-[60%] max-sm:gap-8'>
                    <input placeholder='Enter Company' type='text' name="company" className='p-4' value={postData.company} onChange={handleUserInput}/>
                    <input placeholder='Enter Title' type='text' name="title" className='p-4'  value={postData.title}  onChange={handleUserInput}/>
                    <input placeholder='Enter Venue' type='text' name="venue" className='p-4'  value={postData.venue} onChange={handleUserInput}/>
                    <input placeholder='Enter Salary' type='text' name="salary" className='p-4'  value={postData.salary} onChange={handleUserInput}/>
                    <input placeholder='Enter Salary' type='text' name="stipend" className='p-4'  value={postData.stipend} onChange={handleUserInput}/>
                    <input placeholder='Experience Required' type='text' name="experience" className='p-4'  value={postData.experience} onChange={handleUserInput}/>
                    <input placeholder='Deadline' type='text' name="deadline" className='p-4'  value={postData.deadline} onChange={handleUserInput}/>
                    <textarea placeholder='Enter Description' type='text' name="description" className='p-4'  value={postData.description} onChange={handleUserInput}/>

                    {/* <label for="options" class="block text-sm font-medium text-gray-700">Select an option</label> */}
                    <select id="options" class="mt-1 block w-full border text-3 bg-transparent  lg:w[90%] md:w-[70%] md:h-[10%] lg:h-[30%]  max-sm:h-[20%] border-gray-300 bg-white p-5 rounded-xl shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name='type' value={postData.type} onChange={handleUserInput}>
                        <option value="" disabled selected className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Type</option>
                        <option value="Internship" className='bg-re-300 text-xl itali text-rose-500 focus:bg-red-400'>Internship</option>
                        <option value="Job" className='bg-re-300 text-xl itali text-rose-500 hover:bg-red-400'>Job</option>
                    </select>

                    <div className="flex flex-col gap-3">
                        
                            <div className='flex flex-col gap-3'>
                            {skills.map((input, index) => (
                              <input
                                key={index}
                                type="text"
                                value={input}
                                onChange={(event) => handleInputChange(index, event)}
                                placeholder="Add Skill"
                                className='p-2'
                              ></input>
                            ))}
                            <button onClick={handleRemoveInput}> Remove</button>
                            
                            </div>
                          <button onClick={handleAddInput}>Add More Skill</button>
                      </div>
                      <div className="flex flex-col gap-3">
                        
                        {perks.map((input, index) => (
                          <input
                            key={index}
                            type="text"
                            value={input}
                            onChange={(event) => handleInputChange1(index, event)}
                            placeholder="Add Perks"
                            className='flex p-2'
                          />
                        ))}
                      <button onClick={handleAddInput1}>Add Perks</button>
                  </div>


                  <button onClick={Post}>Submit</button>
                    
            </form>
    </div>
  )
}

export default Post
