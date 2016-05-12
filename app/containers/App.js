import React, {Component, PropTypes as pt} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import NavLink from '../components/NavLink'
import ErrorMessages from './ErrorMessages'
import {logoutUser} from '../actions'
import {pluralize} from '../utils'

export class App extends Component {

  static propTypes = {
    isAuthenticated: pt.bool.isRequired,
    count: pt.number,
    username: pt.string,
    logoutUser: pt.func,
    children: pt.node
  }

  handleLogout = e => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const {count, isAuthenticated, username, children} = this.props

    return (
      <div>
        <div className="top-bar container">
          <div className="content">
            <div className="user-bar">
            {isAuthenticated
              ? <div className="user-bar-inner">
                  <Link to={`/users/${username}`}>Hi, {username}!</Link>
                  <Link to="/" onClick={this.handleLogout}>Log out</Link>
                </div>
              : <div className="user-bar-inner">
                  <Link to="/#todo">Sign up</Link>
                  <Link to="/login">Log in</Link>
                </div>
            }
            </div>
          </div>
        </div>
        <div className="container">
          <header className="app-header">
            <h1 className="content">
              Q<span className="amp">&amp;</span>A React-Redux App<span>single page demo app</span>
            </h1>
          </header>
          <div className="panel-content content">
            <header className="panel-header">
              <div className="grid stretch inner-content">
                <NavLink to="/" className="panel-logo">
                  {count > 0 && `${count} ${pluralize(count, 'question')}`}
                </NavLink>
                <nav className="panel-nav">
                  <NavLink to="/" onlyActiveOnIndex>Questions</NavLink>
                  <NavLink to="/questions/show/answered">Answered</NavLink>
                  <NavLink to="/questions/show/unanswered">Unanswered</NavLink>
                  <NavLink to="/questions/ask">Ask Question</NavLink>
                </nav>
              </div>
            </header>
            <div className="inner-content">
              {children}
            </div>
          </div>
        </div>
        <div className="container">
          <ErrorMessages />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  count: state.meta[ownProps.params.filter || 'all'] &&
    state.meta[ownProps.params.filter || 'all'].count,
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username
})

export default connect(mapStateToProps, {logoutUser})(App)