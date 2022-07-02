import request from '@/utils/request'
export function jobRecordList(data) {
  return request({
    url: '/gatjob/log/pageLogBySelective',
    method: 'get',
    params: data
  })
}

export function gatJobList(data) {
  return request({
    url: '/gatjob/gat/findBySelective',
    method: 'get',
    params: data
  })
}

export function addGatJob(data) {
  return request({
    url: '/gatjob/gat/addGatJob',
    method: 'post',
    params: data
  })
}

export function updateGatJob(data) {
  return request({
    url: '/gatjob/gat/updateGatJob',
    method: 'post',
    params: data
  })
}

export function updateAndRestart(data) {
  return request({
    url: '/gatjob/gat/updateAndRestart',
    method: 'post',
    params: data
  })
}

export function deleteGatJob(data) {
  return request({
    url: '/gatjob/gat/deleteGatJob',
    method: 'post',
    params: data
  })
}

export function initGatJob(data) {
  return request({
    url: '/gatjob/gat/initGatJob',
    method: 'post',
    params: data
  })
}

export function shutdownGatJob(data) {
  return request({
    url: '/gatjob/gat/shutdownGatJob',
    method: 'post',
    params: data
  })
}

export function addNameSpace(data) {
  return request({
    url: '/gatjob/createJobNamespace',
    method: 'post',
    params: data
  })
}

export function getNameSpaceList() {
  return request({
    url: '/gatjob/findNamespace',
    method: 'get'
  })
}

export function findSharding(data) {
  return request({
    url: '/gatjob/gat/findSharding',
    method: 'get',
    params: data
  })
}

export function disableSharding(data) {
  return request({
    url: '/gatjob/gat/disableSharding',
    method: 'post',
    params: data
  })
}

export function enableSharding(data) {
  return request({
    url: '/gatjob/gat/enableSharding',
    method: 'post',
    params: data
  })
}

export function startNow(data) {
  return request({
    url: '/gatjob/gat/startNow',
    method: 'post',
    params: data
  })
}