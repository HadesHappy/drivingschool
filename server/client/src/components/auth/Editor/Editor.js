import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

import AvatarImagePath from './111.jpg'

const Editor = ({setFiles, setFormData, formData}) => {
  let editor = useRef(AvatarEditor)
  const [stateValue, setStateValue] = useState({
    image: AvatarImagePath,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    borderRadius: 1000,
    preview: undefined,
    width: 300,
    height: 300,
  })

  const handleNewImage = (e) => {
    if (e.target.files?.[0]) {
      setStateValue({...stateValue, image: e.target.files[0] })
    }
  }

  const handleSave = () => {
    const img = editor.current?.getImageScaledToCanvas().toDataURL()
    const rect = editor.current?.getCroppingRect()
    setFiles(img)
    setFormData({...formData, image: img});
    if (!img || !rect) return

    setStateValue({...stateValue, 
      preview: {
        img,
        rect,
        scale: stateValue.scale,
        width: stateValue.width,
        height: stateValue.height,
        borderRadius: stateValue.borderRadius,
      },
    })
  }

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    setStateValue({...stateValue, scale: scale })
  }

  // const handleBorderRadius = (e) => {
  //   setStateValue({...stateValue, borderRadius: parseInt(e.target.value) })
  // } 

  const handleWidth = (e) => {
    setStateValue({...stateValue, width: parseInt(e.target.value) })
  }

  const handleHeight = (e) => {
    setStateValue({...stateValue, height: parseInt(e.target.value) })
  }

  const logCallback = (e) => {
    console.log('callback', e)
  }

  const handlePositionChange = (position) => {
    setStateValue({...stateValue, position: position })
  }

  return (
    <>
      <div>
        <Dropzone
          onDrop={([image]) => setStateValue({ ...stateValue, image: image })}
          noClick
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="preview">
              <AvatarEditor
                ref={editor}
                scale={stateValue.scale}
                width={stateValue.width}
                height={stateValue.height}
                position={stateValue.position}
                onPositionChange={handlePositionChange}
                borderRadius={
                  stateValue.width / (100 / stateValue.borderRadius)
                }
                onLoadFailure={logCallback.bind('onLoadFailed')}
                onLoadSuccess={logCallback.bind('onLoadSuccess')}
                onImageReady={logCallback.bind('onImageReady')}
                image={stateValue.image}
              />
              <input
                name="newImage"
                type="file"
                onChange={handleNewImage}
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>
        <br />
        <div className='flex flex-row gap-2'>
          Zoom:{' '}
          <input
            name="scale"
            type="range"
            onChange={handleScale}
            min={stateValue.allowZoomOut ? '0.1' : '1'}
            max="10"
            step="0.01"
            defaultValue="1"
          />
        </div>
        
      </div>
      <div className='float-right right-0 text-white bg-[#3598DB] w-32 text-center py-1 rounded-md cursor-pointer' onClick={handleSave}>Done</div>
    </>
    
  )
}

export default Editor