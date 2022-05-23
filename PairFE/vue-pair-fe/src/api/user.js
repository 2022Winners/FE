import {api} from '@/api/index'

//유저 회원가입
export function join(userData) {
    return api.post('/api/user/join', userData)
}

//유저 로그인
export function login(loginId, loginPw) {
    return api.post('/api/user/login', loginId, loginPw)
}

//유저 로그아웃
export function logout() {
    return api.get('/api/user')
}

//유저 수정
export function updateUser(userId, userData) {
    return api.patch(`/api/user/${userId}`, userData)
}

//유저 탈퇴
export function deleteUser(userId) {
    return api.delete(`/api/user/${userId}`)
}

//유저 상세 조회
export function getUser(userId) {
    return api.get(`/api/user/${userId}`)
}
