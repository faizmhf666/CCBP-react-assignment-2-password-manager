const PasswordContainer = props => {
  const {passwordDetails, showPassword, deleteDetail} = props
  const {website, username, password, id} = passwordDetails
  const websiteWord = website[0]

  const passwordOutput = showPassword ? (
    <p>{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )

  const onDelete = () => {
    deleteDetail(id)
  }

  return (
    <li>
      <div>{websiteWord}</div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {passwordOutput}
      </div>
      <button type="button" data-testid="delete" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordContainer
