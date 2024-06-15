import axios from "axios";
const   BASE_URL='http://localhost:2323/api/job'
const jobInstance=axios.create();
jobInstance.defaults.baseURL=BASE_URL
jobInstance.defaults.withCredentials=true
export default jobInstance