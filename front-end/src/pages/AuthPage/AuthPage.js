import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignInForm/SignInForm";
import { useState } from "react";
//Renamed form .js
export default function AuthPage ({ setUser }) {

    const [signUpVisible, setSignUpVisible] = useState(true)
    
    function handleToggle() {
        setSignUpVisible(!signUpVisible)
    }

    if (signUpVisible === true) {
        return (
            <SignUpForm setUser={setUser} setSignUpVisible={setSignUpVisible} handleToggle={handleToggle}/>
        )
    }

    if (signUpVisible === !true) {
        return (
            <LoginForm setUser={setUser} setSignUpVisible={setSignUpVisible} handleToggle={handleToggle}/>
        )
    }

}
