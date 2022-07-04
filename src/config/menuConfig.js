/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: '首页',
    path: '/dashboard',
    icon: 'home',
    roles: ['admin', 'editor', 'guest']
  },
  {
    title: 'JOB',
    path: '/job',
    icon: 'appstore',
    roles: ['admin', 'editor'],
    children: [
      {
        title: 'gatJob中心',
        path: '/job/gatjob',
        roles: ['admin', 'editor']
      },
      {
        title: 'zkJob中心',
        path: '/job/zkjob',
        roles: ['admin', 'editor']
      },
      {
        title: '执行记录',
        path: '/job/jobrecord',
        roles: ['admin', 'editor']
      }
    ]
  }
]
export default menuList
