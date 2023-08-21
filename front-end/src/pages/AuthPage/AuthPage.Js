import SignUpForm from "../components/SignInForm/SignInForm";

export default function AuthPage ({ setUser }) {
    return (
        <>
        <SignUpForm setUser={setUser}/>
        </>
    )
}