import React, { useState, useEffect } from 'react';
import { signupFields } from "./FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { FaUpload } from 'react-icons/fa'
import { FileUploader } from 'react-drag-drop-files'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [formData, setFormData] = useState(fieldsState);
  const [isHover, setIsHover] = useState(false)
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const [avatar, setAvatar] = useState('/assets/emotions/avatar1.png')
  const fileTypes = ['JPG', 'PNG', 'GIF', 'jpg', 'png', 'gif'];
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  const handleClick = async () => {
    if (formData.image === '' || formData.image === undefined) {
      toast.error('Please upload the Avatar.')
    }
    else {
      if (formData.name === '' || formData.password === '' || formData.confirmPassword === '')
        toast.error('Fill all the blanks')
      else if (formData.password !== formData.confirmPassword)
        toast.error("Password doesn't match")
      else {
        await register(formData)
      }
    }
  }

  const handleDropChange = async (dropFile) => {
    setAvatar(URL.createObjectURL(dropFile))
    setFormData({ ...formData, image: dropFile })
  }

  return (
    <form className="mt-8" encType='multipart/form-data'>
      <div className='flex flex-col justify-center items-center'>
        <FileUploader
          handleChange={handleDropChange}
          name="file"
          types={fileTypes}
          children={
            <div className="rounded-full shadow-lg text-center w-48 h-48 flex items-center justify-center duration-200 cursor-pointer" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
              {
                isHover ?
                  <FaUpload className='text-center w-28 h-28 text-[#3598DB]' />
                  :
                  <img className="rounded-full h-full  text-[#3598DB]" src={avatar} alt="Avatar Upload" />
              }
            </div>
          }
        />
      </div>
      <>
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={formData[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
        <FormAction handleClick={handleClick} text="Signup" />
      </>
    </form>
  )
}