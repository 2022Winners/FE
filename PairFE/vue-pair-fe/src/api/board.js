import {api} from '@/api/index'
const REST_API = `http://localhost:9999`
//게시글 저장
export function saveBoard(formData) {
    // api.defaults.headers
    return api.post(`${REST_API}/api/board`, { headers: { 'Content-Type': 'multipart/form-data' }}, formData)
} 
 // , 'Accept': 'application/json, image/*' 

//게시글 수정
export function updateBoard(boardId, boardData) {
    return api.patch(`${REST_API}/api/board/${boardId}`, boardData)
}

//게시글 삭제
export function deleteBoard(boardId) {
    return api.delete(`${REST_API}/api/board/${boardId}`)
}

//게시글 상세 조회
export function getBoard(boardId) {
    return api.get(`${REST_API}/api/board/${boardId}`);
}

//게시글 검색 조회(방식, 키워드)
export function getBoardList(mode, keyword) {
    return api.get(`${REST_API}/api/boards?mode=${mode}&&keyword=${keyword}`);
}
