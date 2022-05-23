import {api} from '@/api/index'
const REST_API = `http://localhost:9999`


//like 등록
export function createLike(like) {
    return api.post(`${REST_API}/api/like`, like)
} 

//like 삭제
export function deleteLike(like) {
    return api.delete(`${REST_API}/api/like`, like)
}

