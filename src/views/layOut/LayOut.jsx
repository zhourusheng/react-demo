import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import MyRouter from '@/route'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

class MyLayOut extends React.Component {
  state = {
    collapsed: false,
    menuList: [
      {
        name: '测试',
        role: '测试',
        children: [
          {
            name: '子页面1',
            path: '/test',
            role: '测试'
          }
        ]
      },
      {
        name: '测试2',
        path: '/Testt',
        role: '测试2'
      }
    ]
  }

  render() {
    return (
      <Layout className={'local_layout_container'}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            {this.iterateMenu(this.state.menuList)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <MyRouter />
          </Content>
        </Layout>
      </Layout>
    )
  }

  renderMenu() {
    return this.iterateMenu(this.state.menuList)
  }

  iterateMenu(menuList) {
    let target = []
    for (let i in menuList) {
      if (this.hasPermission(menuList[i])) {
        if (menuList[i].hasOwnProperty('children')) {
          target[i] = (
            <SubMenu
              key={menuList[i].name}
              title={
                <span>
                  <Icon type="mail" />
                  <span>{menuList[i].name}</span>
                </span>
              }
            >
              {this.iterateMenu(menuList[i].children)}
            </SubMenu>
          )
        } else {
          target[i] = (
            <Menu.Item key={menuList[i].path}>
              <Link to={menuList[i].path}>{menuList[i].name}</Link>
            </Menu.Item>
          )
        }
      }
    }
    return target
  }

  hasPermission(v) {
    return this.props.authArr.includes(v.role)
  }

  // https://www.jianshu.com/p/77e48c129c16

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

const mapStateToProps = state => {
  return {
    authArr: state.authArr
  }
}

export default connect(
  mapStateToProps,
  null
)(MyLayOut)