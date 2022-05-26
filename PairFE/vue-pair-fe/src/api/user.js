import {api} from '@/api/index'
const REST_API = `http://localhost:9999`

//유저 회원가입
export function join(userData) {
   // return api.post(`${REST_API}/api/user/join`, { headers: { 'Content-Type': 'multipart/form-data' }}, userData)
    return api.post(`${REST_API}/api/user/join`, userData)
}

//유저 로그인
export function login(loginId, loginPw) {
    return api.post(`${REST_API}/api/user/login`, null, {params:{loginId, loginPw}})
}

//유저 수정
export function updateUser(userData) {
    return api.put(`${REST_API}/api/user`, userData)
}

//유저 탈퇴
export function deleteUser(userId) {
    return api.delete(`${REST_API}/api/user/${userId}`)
}

//유저 상세 조회
export function getUser(userId) {
    return api.get(`${REST_API}/api/user/${userId}`)
}

//유저 전체 조회
export function getUserList() {
    return api.get(`${REST_API}/api/users`)
}

//팔로잉 목록 조회
export function getFollowingList(userId) {
    return api.get(`${REST_API}/api/users/following/${userId}`)
}

//팔로우 목록 조회
export function getFollowerList(userId) {
    return api.get(`${REST_API}/api/users/follower/${userId}`)
}