import Loadable from 'react-loadable'
import Loading from '@/components/Loading'
const Dashboard = Loadable({ loader: () => import(/* webpackChunkName:'Dashboard' */'@/views/dashboard'), loading: Loading })
const Table = Loadable({ loader: () => import(/* webpackChunkName:'Table' */'@/views/table'), loading: Loading })
const Error404 = Loadable({ loader: () => import(/* webpackChunkName:'Error404' */'@/views/error/404'), loading: Loading })
const User = Loadable({ loader: () => import(/* webpackChunkName:'User' */'@/views/user'), loading: Loading })
const JobRecord = Loadable({ loader: () => import(/* webpackChunkName:'Table' */'@/views/job/jobrecord'), loading: Loading })
const GatJob = Loadable({ loader: () => import(/* webpackChunkName:'Table' */'@/views/job/gatjob'), loading: Loading })
const ZkJob = Loadable({ loader: () => import(/* webpackChunkName:'Table' */'@/views/job/zkjob'), loading: Loading })
const JobDetail = Loadable({ loader: () => import(/* webpackChunkName:'Table' */'@/views/job/jobdetail'), loading: Loading })

export default [
  { path: '/dashboard', component: Dashboard, roles: ['admin', 'editor', 'guest'] },
  { path: '/table', component: Table, roles: ['admin', 'editor'] },
  { path: '/user', component: User, roles: ['admin'] },
  { path: '/error/404', component: Error404 },
  { path: '/job/jobrecord', component: JobRecord, roles: ['admin', 'editor'] },
  { path: '/job/gatjob', component: GatJob, roles: ['admin', 'editor'] },
  { path: '/job/jobdetail', component: JobDetail, roles: ['admin', 'editor'] },
  { path: '/job/zkjob', component: ZkJob, roles: ['admin', 'editor'] }
]
