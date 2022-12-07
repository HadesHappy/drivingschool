import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({ url, showVideo, setShowVideo }) => {
  console.log('url: ', url)
  console.log('showVideo: ', showVideo)
  return (
    <>
      {
        showVideo ? (
          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className="fixed inset-0 w-full h-full bg-black opacity-70" />
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
              <div className='relative w-[800px] h-[500px] bg-gray-600'>
                <ReactPlayer
                  className='absoulte top-0 left-0'
                  url='https://vimeo.com/585768792'
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