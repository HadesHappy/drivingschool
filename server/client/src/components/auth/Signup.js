import React, { useState, useEffect } from 'react';
import { signupFields } from "./FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import UploadModal from './Editor/UploadModal';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(fieldsState);
  const [avatar, setAvatar] = useState('/assets/emotions/avatar1.png')
  const { isLoggedIn, register } = useAuth();
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

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

  const onAvatarClick = () => {
    setShowModal(true)
  }

  return (
    <form className="mt-8" encType='multipart/form-data'>
      <div className='flex flex-col justify-center items-center'>
        <img className="rounded-full shadow-xl text-center w-48 h-48 flex items-center justify-center duration-200" src={avatar} alt='avatar' />
      </div>
      <div className='text-center text-sm cursor-pointer mt-2' onClick={onAvatarClick}>
        Upload Avatar
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
      <UploadModal showModal={showModal} setShowModal={setShowModal} setFiles={setAvatar} setFormData={setFormData} formData={formData} />
    </form>
  )
}