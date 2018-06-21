import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    fetchCurrentUser: () =>
      axios.get("/api/users/current_user").then(res => res.data.user),

    updateUserInfo: data => axios.patch("/api/users/current_user", { data }).then(res => res.data.user),
    getBDUnilist: data => axios.post("/api/unilist/bd", { data }),
    getUSAUnilist: data => axios.post("/api/unilist/usa", { data }),
  }
};
