import React from 'react'
import MyLayOut from './views/layOut/LayOut'
import './App.css'
import './assets/styles/andtEdit/part_andt_edit.scss'
// 这里的scss文件不能再css文件里面引入，必须在scss或者js文件里面引入

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SinglePage from '@/views/test/SinglePage'

import { connect } from 'react-redux'
import { setAuthArr } from './store/action'

class App extends React.Component {
  componentDidMount() {
    const { setAuthArr } = this.props
    const arr = ['权限测试1', '权限测试2', '权限测试3']
    setTimeout(() => {
      setAuthArr(arr)
    }, 100)
  }

  render() {
    return (
      <Router basename="/react_test">
        <Switch>
          <Route path="/singlePage" component={SinglePage} />
          <Route path="/" component={MyLayOut} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatchToProps = {
  setAuthArr
}

export default connect(
  null,
  mapDispatchToProps
)(App)
