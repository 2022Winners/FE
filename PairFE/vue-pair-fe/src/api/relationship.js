import {api} from '@/api/index'
const REST_API = `http://localhost:9999`

//관계 생성
export function follow(relationship) {
    return api.post(`${REST_API}/api/relation`, relationship)
}

//관계 삭제
export function unfollow(relationship) {
    return api.delete(`${REST_API}/api/relation`, relationship)
}