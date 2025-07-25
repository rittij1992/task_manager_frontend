import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = ()=>{
    const token  = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return(
        (token && user) ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
    )
}
export default AuthGuard;