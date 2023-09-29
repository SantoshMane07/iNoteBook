import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {

  return (
    <div className='container my-3'>
      <h1 className='my-2'>Welcome to iNotebook Website</h1>
      <p>You can access your notes from any where, login or signup to start using</p>
      <p>Simply add, update, delete, notes</p>
    </div>
  )
}

export default About
