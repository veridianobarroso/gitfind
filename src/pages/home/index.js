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

    if(newUser.name){
      const {avatar_url, name, bio,login} = newUser;
      setCurrentUser({avatar_url,name,bio,login});
      
      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }

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

          {currentUser?.name ? (<> 
          <div className='perfil'>
            <img src={currentUser.avatar_url} className='profile' alt='Imagem' />
            <div>
              <h3>
                {currentUser.name}
              </h3>
              <span>
              @{currentUser.login}
              </span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          </>) : null} 

          
          {repos?.length ? (<> 
            <hr></hr>
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo => (
              <ItemList title={repo.name} description={repo.description}></ItemList>
            ))}
   
          </div>          
          </>) : null}

        </div>
        
      </div>
    </div>
  );
}

export default App;
