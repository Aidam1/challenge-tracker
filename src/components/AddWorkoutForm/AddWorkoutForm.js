import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../api/firebase";


export default function AddWorkoutForm() {
    const user = useContext(UserContext);
    const {displayName, email} = user;

    return (
        <div>
            <p>Ahoj, jsi přihlášený jako {displayName} ({email})!</p>
            <button onClick={() => {auth.signOut()}}>Odhlásit se</button>
        </div>
    )
}
