import React, { useContext, useState } from "react";
import {AuthContext} from '../../contexts/AuthContext'
export default function UserForm() {
  //user form
  const {user} = useContext(AuthContext)
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
  };

  return (
    <div>
      <fieldset>
        <legend>User Form</legend>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            name="phoneno"
            placeholder="Phone Number"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Create User" />
        </form>
      </fieldset>
     
    </div>
  );
}
