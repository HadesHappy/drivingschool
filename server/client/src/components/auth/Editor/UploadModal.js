import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

const UploadModal = ({ showModal, setShowModal, setFiles, setFormData, formData }) => {
  let editor = useRef(AvatarEditor)
  const [stateValue, setStateValue] = useState({
    image: '',
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    borderRadius: 1000,
    width: 300,
    height: 300,
  })

  const handleNewImage = (e) => {
    if (e.target.files?.[0]) {
      setStateValue({ ...stateValue, image: e.target.files[0] })
    }
  }

  const handleSave = () => {
    const img = editor.current?.getImageScaledToCanvas().toDataURL()
    var blobBin = atob(img.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], { type: 'image/png' });

    const rect = editor.current?.getCroppingRect()
    setFiles(img)
    setFormData({ ...formData, image: file });
    if (!file || !rect) return

    setShowModal(false)
  }

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    setStateValue({ ...stateValue, scale: scale })
  }

  const logCallback = (e) => {
    // console.log('callback', e)
  }

  const handlePositionChange = (position) => {
    setStateValue({ ...stateValue, position: position })
  }
  return (
    <>
      {
        showModal ? (
          <>
            <div className='fixed inset-0 z-50 overflow-y-auto'>
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-50"
              ></div>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                <div className="my-6">
                  <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none px-48 py-20">
                    {
                      stateValue?.image ?
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
                        :
                        <>
                          <input type="file" onChange={handleNewImage} />
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null
      }
    </>
  )
}

export default UploadModal