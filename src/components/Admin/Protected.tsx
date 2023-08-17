import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Protected = (props) => {
  const {Component} = props
  const navigate = useNavigate();
  useEffect(() =>{
    let login = localStorage.getItem('login');
    if(!login){
      navigate('/admin_login')
    }
  }) 
  return (
    <div>
        <Component />
    </div>
  )
}

export default Protected