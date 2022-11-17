import React, { useState } from 'react'
import TabButton from './TabButton';

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState('todotest');

  return (
    <div className='flex flex-row justify-start gap-3'>
      <TabButton text='todo test' id='todotest' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TabButton text='killer test' id='killertest' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TabButton text='preguntas gemelas' id='gemela' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TabButton text='nuevas preguntas' id='newpreguntas' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TabButton text='test por temas' id='testportemas' selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  )
}

export default Tabs