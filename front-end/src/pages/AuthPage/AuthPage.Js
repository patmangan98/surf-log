import SignUpForm from "../components/SignInForm/SignInForm";
//Renamed form .js
export default function AuthPage ({ setUser }) {
    return (
        <>
        <SignUpForm setUser={setUser}/>
        </>
    )
}