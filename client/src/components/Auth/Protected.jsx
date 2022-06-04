import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";


const Protected = ({ children }) => {
    const { isLogin } = useContext(AuthContext);
    const location = useLocation();

    if (!isLogin) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
};

export default Protected;
