import axios from "axios";

// includes the credentials (like an address on envelope) with requests for
// proper communication

export default axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,

})

