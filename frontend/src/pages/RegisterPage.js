import React from 'react'

export const RegisterPage = () => {
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form action="chat.html">
          <div className="form-control">
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div className="form-control">
            <label for="username">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter password ..."
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </main>
    </div>
  )
}
