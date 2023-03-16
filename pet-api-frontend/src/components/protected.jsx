import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            setIsLoggedIn(false);
        }
    },[isLoggedIn])

   if (isLoggedIn) {
        return <>{props.children}</>;
   } else {
        return <Navigate to="/auth/login" replace={true} />;
   }
}