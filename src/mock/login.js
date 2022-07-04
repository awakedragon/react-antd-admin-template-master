const tokens = {
  admin: 'admin-token',
  guest: 'guest-token',
  editor: 'editor-token'
}

const users = {
  'admin-token': {
    id: 'admin',
    role: 'admin',
    name: '关爱通',
    avatar: 'https://static01.imgkr.com/temp/09c609756bd748a9a3beabceb89bf1a6.png',
    description: '拥有系统内所有菜单和路由权限'
  }
}

export default {
  login: (config) => {
    const { username } = JSON.parse(config.body)
    const token = tokens[username]
    if (!token) {
      return {
        status: 1,
        message: '用户名或密码错误'
      }
    }
    return {
      status: 0,
      token
    }
  },
  userInfo: (config) => {
    const token = config.body
    const userInfo = users[token]
    if (!userInfo) {
      return {
        status: 1,
        message: '获取用户信息失败'
      }
    }
    return {
      status: 0,
      userInfo
    }
  },
  getUsers: () => {
    return {
      status: 0,
      users: Object.values(users)
    }
  },
  deleteUser: (config) => {
    const { id } = JSON.parse(config.body)
    const token = tokens[id]
    if (token) {
      delete tokens[id]
      delete users[token]
    }
    return {
      status: 0
    }
  },
  editUser: (config) => {
    const data = JSON.parse(config.body)
    const { id } = data
    const token = tokens[id]
    if (token) {
      users[token] = { ...users[token], ...data }
    }
    return {
      status: 0
    }
  },
  ValidatUserID: (config) => {
    const userID = config.body
    const token = tokens[userID]
    if (token) {
      return {
        status: 1
      }
    } else {
      return {
        status: 0
      }
    }
  },
  addUser: (config) => {
    const data = JSON.parse(config.body)
    const { id } = data
    tokens[id] = `${id}-token`
    users[`${id}-token`] = {
      ...users['guest-token'],
      ...data
    }
    return {
      status: 0
    }
  },
  logout: (_) => {
    return {
      status: 0,
      data: 'success'
    }
  }
}
