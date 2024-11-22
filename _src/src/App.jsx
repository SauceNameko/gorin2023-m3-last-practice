
import './App.css'
import { LoginScene } from './components/LoginScene/LoginScene';
import { SelectScene } from './components/SelectScene/SelectScene';
import { useLogin } from './hooks/useLogin'

function App() {
  const { isLogin, login,logout } = useLogin();
  return (
    <>
      {!isLogin && <LoginScene login={login}></LoginScene>}
      {isLogin && <SelectScene isLogin={isLogin} logout={logout} ></SelectScene>}
    </>
  )
}

export default App
