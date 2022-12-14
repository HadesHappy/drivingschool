import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ url, showVideo, setShowVideo }) => {
  console.log('url: ', url)
  console.log('showVideo: ', showVideo)
  const onClick = (e) => {
    if(e.target.id === 'out_range')
       setShowVideo(false)
  }
  return (
    <>
      {
        showVideo ? (
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className="fixed inset-0 w-full h-full bg-black opacity-70" />
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0" id='out_range' onClick={onClick}>
              <div className='relative w-[720px] h-[360px] bg-gray-300'>
                <ReactPlayer
                  className='absoulte top-0 left-0'
                  url='https://vimeo.com/781100951'
                  width='100%'
                  height='100%'
                  playing={true}
                  controls={true}
                />
              </div>
            </div>
          </div>
        )
          :
          null
      }
    </>
  )
}

export default VideoPlayer