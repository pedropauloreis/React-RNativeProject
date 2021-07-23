import React, {useState} from 'react';
import api from '../../services/api';

const commonFunctions = require('../../util/commonFunctions');

export default function Login({history}){
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(true);
        
    async function handleSubmit(event){
      event.preventDefault();
 
      if (!commonFunctions.validateEmail(email))
      {
        setEmailValid(false);
        return;
      }

      //email address
      // api.post('./sessions', {email: email})
      const response = await api.post('/sessions', {email});
  
      const {_id} = response.data;
      localStorage.setItem('user', _id);
      history.push('/dashboard')
    }

    return (
        <>
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL <span style={emailValid ? {} : {color:'#ff0000'}} >*</span></label>
          
          <input 
            type="email" 
            id="email" 
            placeholder="Seu melhor e-mail"
            value={email}
            style={emailValid ? {} : {borderColor:'#ff0000'}}
            onChange={event => setEmail(event.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>
        </form>
        </>
        )
}