import React from "react";

function RegisterForm({
  saveUser,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={saveUser}>
      <div className="form-group m-3">
        <label className="form-label">Your Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group m-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group m-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={!email || !password || !username}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
