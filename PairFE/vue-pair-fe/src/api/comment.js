import {api} from '@/api/index'
const REST_API = `http://localhost:9999`


//Comment 등록 - requestbody로 작성되어 있어서 수정 필요!
export function createComment(comment) {
    return api.post(`${REST_API}/api/comment`, comment)
} 

//Comment 수정
export function updateComment(id, comment) {
    return api.put(`${REST_API}/api/comment/${id}`, comment)
}

//Comment 삭제
export function deleteComment(id) {
    return api.delete(`${REST_API}/api/comment/${id}`)
}

//Comment 목록 조회
export function getCommentListByPostId(postId) {
    return api.get(`${REST_API}/api/comments/post/${postId}`);
}

