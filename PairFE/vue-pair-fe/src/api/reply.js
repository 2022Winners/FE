import {api} from '@/api/index'
const REST_API = `http://localhost:9999`

//대댓글 생성
export function createReply(replyData) {
    return api.post(`${REST_API}/api/reply`, replyData)
}

//내가 쓴 댓글 목록 조회
export function getReplyListByUserId(userId) {
    return api.get(`${REST_API}/api/replys/user/${userId}`)
}

//대댓글 수정
export function updateReply(replyId, replyData) {
    return api.patch(`${REST_API}/api//reply/${replyId}`, replyData)
}

//대댓글 삭제
export function deleteReply(replyId) {
    return api.delete(`${REST_API}/api//reply/${replyId}`)
}