import React, {useState} from 'react'

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

interface UserInfo {
  [key: string]: string
  name: string
}

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  if (username && password) {
    return {
      message: 'SUCCESS',
      token: 'TOKEN',
    }
  }
  return {
    message: 'FAIL',
    token: '',
  }
}

const getUserInfo = async (token: string): Promise<{ name: string } | null> => {
  if (token) {
    return {name: 'blueStragglr'}
  }
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  return null
}

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({name: ''});

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    
    const loginResult = await login(formData.get('username') as string, formData.get('password') as string);
    if (!loginResult) return;

    const {message, token} = loginResult;
    if (message === 'SUCCESS') {
      const obj: UserInfo|null = await getUserInfo(token);
      
      for (const key in obj) {
        if (key && obj[key]) {
          setUserInfo(prev => ({...prev, [key]: obj[key]}));
        }
      }
    }
  }

  return (<div>
    <h1>
      Login with Mock API
    </h1>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit" value="Submit">submit</button>
    </form>
    <div>
      <h2>
        User info
      </h2>
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default LoginWithMockAPI
