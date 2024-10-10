import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Posting } from '../Redux/Slices/JobInternSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Post = () => {
  const navigate = useNavigate()
  const [postData, setPostData] = useState({
    role: '',
    company: '',
    title: '',
    salary: '',
    experience: '',
    deadline: '',
    description: '',
    id: '',
    skills: '',
    perks: [],
    type: '',
    venue: '',
    stipend: ''
  })
  const dispatch = useDispatch()
  const id = localStorage.id

  function handleUserInput(e) {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value
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
    const values = [...skills];
    if (values.length > 1) {
      values.pop();
      setSkills(values);
    }
  };

  const handleRemoveInputPerks = (event) => {
    event.preventDefault();
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

  async function Post(e) {
    e.preventDefault()
    setPostData((prevPostData) => ({
      ...prevPostData,
      id: id
    }));
    if (!postData.company || !postData.deadline || !postData.description || !postData.experience || !postData.perks || !postData.skills || !postData.title || !postData.type || !postData.venue || (postData.type === 'Internship' && !postData.stipend) || (postData.type === 'Job' && !postData.salary)) {
      toast.error('All Fields are required')
      return
    }
    const res = await dispatch(Posting(postData))
    if (res?.payload?.success) {
      navigate('/')
    }
  }

  useEffect(() => {
    setPostData((prevPostData) => ({
      ...prevPostData,
      skills,
      perks,
    }));
  }, [skills, perks]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className='text-center text-4xl text-white font-bold mb-8'>Add New Post</h1>
        <main className='grid grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <input
              type="text"
              required
              name='title'
              placeholder='Enter Title'
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.title}
              onChange={handleUserInput}
            />
            <input
              type="text"
              required
              name='company'
              placeholder='Enter Company'
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.company}
              onChange={handleUserInput}
            />
            <select
              name='type'
              value={postData.type}
              onChange={handleUserInput}
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value="" disabled>Type</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
            </select>
            <input
              type="text"
              required
              name='experience'
              placeholder='Experience Required'
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.experience}
              onChange={handleUserInput}
            />
            <div className="space-y-2">
              {perks.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  value={input}
                  onChange={(event) => handleInputChangePerks(index, event)}
                  placeholder="Add Perks"
                  className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              ))}
              <div className='flex gap-4 justify-center'>
                <button onClick={handleAddInputPerks} className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800'>Add Perks</button>
                {perks.length > 1 && <button onClick={handleRemoveInputPerks} className='px-4 py-2 bg-red-600  text-white rounded-lg hover:bg-red-800'>Remove Perks</button>}
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <input
              type="text"
              required
              name='venue'
              placeholder='Enter Venue'
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.venue}
              onChange={handleUserInput}
            />
            {postData.type === 'Job' && (
              <input
                type="text"
                required
                name='salary'
                placeholder='Enter Salary in Rupess per Month'
                className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                value={postData.salary}
                onChange={handleUserInput}
              />
            )}
            {postData.type !== '' && postData.type !== 'Job' && (
              <input
                type="text"
                required
                name='stipend'
                placeholder='Enter Stipend in Rupess per Month'
                className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                value={postData.stipend}
                onChange={handleUserInput}
              />
            )}
            <input
              type="date"
              required
              name='deadline'
              placeholder='Enter Deadline'
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.deadline}
              onChange={handleUserInput}
            />
            <textarea
              placeholder='About the Company'
              name="description"
              className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              value={postData.description}
              onChange={handleUserInput}
            />
            <div className="space-y-2">
              {skills.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  value={input}
                  onChange={(event) => handleInputChangeSkill(index, event)}
                  placeholder="Add Skill"
                  className='w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
              ))}
              <div className='flex gap-4 justify-center'>
                <button onClick={handleAddInputSkill} className='px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800'>Add Skill</button>
                {skills.length > 1 && <button onClick={handleRemoveInputSkills} className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800'>Remove Skill</button>}
              </div>
            </div>
          </div>
        </main>
        <button className='mt-8 px-6 py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-800' onClick={Post}>Submit</button>
      </div>
    </div>
  )
}

export default Post
