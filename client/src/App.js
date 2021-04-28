import React, {useState, useCallback} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import AuthContext from "./context/auth";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import Button from "./components/Button";
import styled from "styled-components";
import logo from "./assets/logo.jpeg";
import colors from "./styles/colors";


const initialState = {
  username: "",
  roomId: "Lobby"
}

const StyledApp = styled.div`
  header {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5rem;
    background-color: ${colors.blue2};
    box-shadow: 0 5px 20px 5px rgba(0 0 0 / 15%);
    
    div {
      display: flex;
      align-items: center;
      
      img {
        width: 5rem;
        border-radius: 50%;
        margin-right: 10px;
      }
      
      p {
        font-weight: lighter;
        font-size: 3rem;
      }
      
      .greeting {
        font-weight: normal;
        font-size: 2rem;
        margin-right: 2rem;
      }
    }
  }
`;

function App() {
  const [auth, setAuthUser] = useState(initialState);

  const logout = useCallback(() => {
    setAuthUser(initialState);
  }, []);

  const login = useCallback(auth => setAuthUser(auth), [])

  return (
    <StyledApp>
      <header>
        <div>
          <img src={logo} alt="logo" />
          <p>Our Chat</p>
        </div>

        {auth.username && <div>
          <p className='greeting'>Greeting {auth.username}</p>
          <Button onClick={logout}>Logout</Button>
        </div>}
      </header>
      <AuthContext.Provider value={{auth, login, logout}}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/chat/:roomId' exact component={Chat}/>
            <Route path="**">
              <Redirect to={auth.username ? '/chat/:roomId' : '/login'}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </StyledApp>
  );
}

export default App;
