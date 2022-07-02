import request from '@/utils/request'
export function zkJobList(data) {
  return request({
    url: '/gatjob/zk/listByNamespace',
    method: 'get',
    params: data
  })
}

export function getByJobName(data) {
  return request({
    url: '/gatjob/zk/getByJobName',
    method: 'get',
    params: data
  })
}

export function deleteZKJob(data) {
  return request({
    url: '/gatjob/zk/deleteZKJob',
    method: 'post',
    params: data
  })
}

export function listShardingInfo(data) {
  return request({
    url: '/gatjob/zk/listShardingInfo',
    method: 'get',
    params: data
  })
}

export function disableSharding(data) {
  return request({
    url: '/gatjob/zk/disableSharding',
    method: 'post',
    params: data
  })
}

export function enableSharding(data) {
  return request({
    url: '/gatjob/zk/enableSharding',
    method: 'post',
    params: data
  })
}

export function startNow(data) {
  return request({
    url: '/gatjob/zk/startNow',
    method: 'post',
    params: data
  })
}

export function getZKUsedNamespace() {
  return request({
    url: '/gatjob/zk/getZKUsedNamespace',
    method: 'get'
  })
}