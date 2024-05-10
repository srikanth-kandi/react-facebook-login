import { Component } from "react";
import SocialButton from './components/SocialButton'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      user: {},
      currentProvider: ''
    }
    this.nodes = {}

    this.onLoginSuccess = this.onLoginSuccess.bind(this)
    this.onLoginFailure = this.onLoginFailure.bind(this)
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this)
    this.onLogoutFailure = this.onLogoutFailure.bind(this)
    this.logout = this.logout.bind(this)
  }

  setNodeRef(provider, node) {
    if (node) {
      this.nodes[provider] = node
    }
  }

  onLoginSuccess(user) {
    this.setState({
      logged: true,
      currentProvider: user._provider,
      user
    })
  }

  onLoginFailure(err) {
    console.error(err)

    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutSuccess() {
    this.setState({
      logged: false,
      currentProvider: '',
      user: {}
    })
  }

  onLogoutFailure(err) {
    console.error(err)
  }

  logout() {
    const { logged, currentProvider } = this.state
    if (logged && currentProvider) {
      this.nodes[currentProvider].props.triggerLogout()
    }
  }

  render() {
    const { logged, user } = this.state;
    return (
      <div className="app-body">
        <h2>React Facebook Login</h2>
        <br />
        {logged ? (
          <div>
            <img src={user._profile.profilePicURL} alt="user image" />
            <h3>User Logged in</h3>
            <p>Name: {user._profile.name}</p>
            <p>Email Address: {user._profile.email}</p>
            <br />
            <br />
            <button onClick={this.logout}>Log out</button>
          </div>
        ) : (
          <SocialButton
            provider='facebook'
            appId={import.meta.env.VITE_FACEBOOK_APP_ID}
            onLoginSuccess={this.onLoginSuccess}
            onLoginFailure={this.onLoginFailure}
            onLogoutSuccess={this.onLogoutSuccess}
            getInstance={this.setNodeRef.bind(this, 'facebook')}
            key={'facebook'}
            onInternetFailure={() => { return true }}
            style={{alignSelf: "center"}}
          >
            Login with Facebook 🚀
          </SocialButton>
        )}
      </div>
    )
  }
}

export default App
