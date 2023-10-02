import AuthPageLoading from "../components/LoadingAnimations/AuthPageLoading";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { useState, useEffect } from "react";
export default function AuthPage ({ setUser }) {

    const [signUpVisible, setSignUpVisible] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])
    
    function handleToggle() {
        setSignUpVisible(!signUpVisible)
    }

    if (isLoading === true) {
        return (
            <AuthPageLoading/>
        )
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
