import axios from "axios";

//Instance 생성
function createInstance() {
    return axios.create({});
}

export const api = createInstance();