import React, { useState, useEffect } from 'react';
import { signupFields } from "./FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { Uploader } from 'uploader'
import { UploadButton } from 'react-uploader'

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

const uploader = Uploader({ apiKey: 'free' });
const options = {
  multi: false,
  styles: {
    colors: {
      primary: "#377dff",     // Hex codes only.
      active: "#528fff"
    },
    fontSizes: {
      base: 16
    }
  },
  editor: {
    images: {
      crop: true,             // false disables the image editor / cropper
      cropRatio: 1 / 1,
      cropShape: "circ"       // "rect" | "circ"
    }
  },
}

const MyUploadButton = ({ setFiles, setFormData, formData }) =>
  <UploadButton uploader={uploader}
    options={options}
    onComplete={files => {      // Optional.
      if (files.length === 0) {
        console.log('No files selected.')
      } else {
        console.log('Files uploaded:');
        console.log(files.map(f => f.fileUrl));
        setFiles(files[0].fileUrl);
        setFormData({ ...formData, image: files[0].fileUrl });
      }
    }}>
    {({ onClick }) =>
      <button onClick={onClick}>
        Upload avatar
      </button>
    }
  </UploadButton>

export default function Signup() {
  const [formData, setFormData] = useState(fieldsState);
  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const [avatar, setAvatar] = useState('/assets/emotions/avatar1.png')
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuth();

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

  return (
    <form className="mt-8" encType='multipart/form-data'>
      <div className='flex flex-col justify-center items-center'>
        <img className="rounded-full shadow-xl text-center w-48 h-48 flex items-center justify-center duration-200" src={avatar} alt='avatar' />
        <MyUploadButton setFiles={setAvatar} setFormData={setFormData} formData={formData} />
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