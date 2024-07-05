import axios from "axios";
const   BASE_URL='http://localhost:2325/quiz/'
const quizInstance=axios.create();
quizInstance.defaults.baseURL=BASE_URL
quizInstance.defaults.withCredentials=true
export default quizInstance