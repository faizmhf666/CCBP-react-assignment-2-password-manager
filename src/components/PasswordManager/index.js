import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import PasswordContainer from '../PasswordContainer'
import './index.css'

class PasswordManager extends Component {
  state = {
    showPassword: false,
    inputWebsite: '',
    inputUsername: '',
    inputPassword: '',
    passwordList: [],
    searchInput: '',
  }

  deleteDetail = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: updatedList})
  }

  getFilteredList = () => {
    const {passwordList, searchInput} = this.state
    const updatedList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedList
  }

  onAddDetails = () => {
    this.event.preventDefault()

    const {inputWebsite, inputUsername, inputPassword} = this.state
    const newDetails = {
      website: inputWebsite,
      username: inputUsername,
      password: inputPassword,
      id: uuid(),
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newDetails],
    }))
  }

  inputPasswordChange = event => {
    this.setState({inputPassword: event.target.value})
  }

  inputWebsiteChange = event => {
    this.setState({inputWebsite: event.target.value})
  }

  inputUsernameChange = event => {
    this.setState({inputUsername: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  renderInputForm = () => {
    const {inputWebsite, inputUsername, inputPassword} = this.state
    return (
      <div>
        <form onSubmit={this.onAddDetails}>
          <h1>Add New Password</h1>
          <label htmlFor="website">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
          </label>
          <input
            id="website"
            placeholder="Enter Website"
            value={inputWebsite}
            onChange={this.inputWebsiteChange}
          />

          <label htmlFor="username">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
          </label>
          <input
            id="username"
            placeholder="Enter Username"
            value={inputUsername}
            onChange={this.inputUsernameChange}
          />

          <label htmlFor="password">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
          </label>
          <input
            id="password"
            placeholder="Enter Password"
            type="password"
            value={inputPassword}
            onChange={this.inputPasswordChange}
          />
          <button type="submit">Add</button>
        </form>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
      </div>
    )
  }

  renderListDisplay = () => {
    const {showPassword} = this.state
    const filteredList = this.getFilteredList()
    return (
      <div>
        <ul>
          {filteredList.map(each => (
            <PasswordContainer
              passwordDetails={each}
              key={each.id}
              deleteDetail={this.deleteDetail}
              showPassword={showPassword}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderEmpty = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  render() {
    const {passwordList} = this.state
    const count = passwordList.length
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        {this.renderInputForm()}
        <div>
          <h1>Your Passwords</h1>
          <p>{count}</p>
          <div>
            <label htmlFor="search">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
            </label>
            <input
              type="search"
              placeholder="search"
              onChange={this.onSearchInput}
            />
          </div>
          <hr />
          <input type="checkbox" id="checkbox" onChange={this.onCheckChange} />
          <label htmlFor="checkbox">Show passwords</label>
        </div>
        {count === 0 ? this.renderEmpty() : this.renderListDisplay()}
      </div>
    )
  }
}
export default PasswordManager
