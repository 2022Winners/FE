import {api} from '@/api/index'
const REST_API = `http://localhost:9999`


//POST 등록
export function createPost(post) {
    return api.post(`${REST_API}/api/post`, post)
} 

// //POST 수정
// export function updatePost(formData) {
//     return api.put(`${REST_API}/api/post`,{ headers: { 'Content-Type': 'multipart/form-data' }}, formData)
// }

//POST 삭제
export function deletePost(id) {
    return api.delete(`${REST_API}/api/post/${id}`)
}

//POST 상세 조회
export function getPost(id, userId) {
    return api.get(`${REST_API}/api/post/${id}?userId=${userId}`);
}

//POST 검색 조회 or 전체 리스트 조회(방식, 키워드)
export function getPostList(mode, keyword, userId) {
    return api.get(`${REST_API}/api/posts?mode=${mode}&&keyword=${keyword}&&userId=${userId}`);
}

//파트별 POST 조회
export function getPartList(part, userId) {
    return api.get(`${REST_API}/api/posts/${part}?userId=${userId}`);
}

//User와 같은 나이대가 좋아하는 POST LIST 조회
export function getAgeLikeList(userId) {
    return api.get(`${REST_API}/api/posts/age?userId=${userId}`);
}

//User와 같은 성별이 좋아하는 POST LIST 조회
export function getGenderLikeList(userId) {
    return api.get(`${REST_API}/api/posts/gender?userId=${userId}`);
}

//User가 좋아하는 POST LIST
export function getUserLikeList(userId) {
    return api.get(`${REST_API}/api/posts/like?userId=${userId}`);
}

//조회순 POST LIST
export function getTopList(userId) {
    return api.get(`${REST_API}/api/posts/top?userId=${userId}`);
}


