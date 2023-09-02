import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import {initialState, reducer} from './Reducers/userReducer'
import SubUserPosts from './components/screens/SubUserPosts';
import Search from './components/screens/Search';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user) {
      dispatch({type: "USER", payload: user})
    }
    else {
      history.push("/signin")
    }

  }, [])

  const basePath = "/Socio-Engage"

  return (
      <Switch>
        <Route exact path={basePath+"/"}>
          <Home />
        </Route>
        <Route path={basePath+"/signin"}>
          <Signin />
        </Route>
        <Route path={basePath+"/signup"}>
          <Signup />
        </Route>
        <Route exact path={basePath+"/profile"}>
          <Profile />
        </Route>
        <Route path={basePath+"/createpost"}>
          <CreatePost/>
        </Route>
        <Route path={basePath+"/profile/:userid"}>
          <UserProfile/>
        </Route>
        <Route path={basePath+"/followingpost"}>
          <SubUserPosts/>
        </Route>
        <Route path={basePath+"/search"}>
          <Search/>
        </Route>
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
