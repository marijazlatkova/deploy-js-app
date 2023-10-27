import { useState } from "react";

export const Login = () => {
  const initData = {
    email: "",
    password: ""
  };

  const [data, setData] = useState(initData);

  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    console.log(data);

    try {
      let res = await fetch(
        "/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        <span>Email</span><br />
        <input type="email" name="email" value={data.email} onChange={dataChange} /><br />
      </label><br />
      <label>
        <span>Password</span><br />
        <input type="password" name="password" value={data.password} onChange={dataChange} /><br />
      </label><br />
      <button onClick={login}>Login</button>
    </div>
  );
};