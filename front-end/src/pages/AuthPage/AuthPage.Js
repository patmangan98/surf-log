import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";

export default function AuthPage ({ setUser }) {
    return (
        <>
        <h1>Sign-Up</h1>
        <SignUpForm setUser={setUser}/>
        <h1>Login</h1>
        <LoginForm setUser={setUser}/>
        </>
    )
}