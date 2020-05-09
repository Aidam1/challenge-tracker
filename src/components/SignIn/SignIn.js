import React from "react";
import { signInWithGoogle } from "../../api/firebase";


const SignIn = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
            <button onClick={() => {signInWithGoogle();}}>
                Sign in with Google
            </button>
            </div>
        </div>
    );
};

export default SignIn;
