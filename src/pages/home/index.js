import {Header} from '../../components/Header'
import logo from '../../assets/github.png'
import {ItemList} from '../../components/ItemList'
import { useState } from 'react'

import "./styles.css"

function App() {
  
  const[user,setUser] = useState('');
  const[currentUser, setCurrentUser] = useState(null);
  const[repos,setRepos] = useState(null);

  const handleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    console.log(newUser);
  }

  return (
    <div className="App">
     <Header></Header>
      <div className='conteudo'>
        <img src={logo} className='background' alt='Background'/>
        <div className='info'>
          <div>
            <input name='usuario' value={user} onChange={event => setUser(event.target.value)} placeholder='@username'/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          <div className='perfil'>
            <img src='https://avatars.githubusercontent.com/u/5331264?v=4' className='profile' alt='Imagem' />
            <div>
              <h3>
                Veridiano Barroso
              </h3>
              <span>
                @veridianobarroso
              </span>
              <p>Descrição</p>
            </div>
          </div>
          <hr></hr>

          <div>
            <h4 className='repositorio'>Repositórios</h4>
            <ItemList title='teste1' description='teste1'></ItemList>
            <ItemList title='teste1' description='teste1'></ItemList>
            <ItemList title='teste1' description='teste1'></ItemList>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
