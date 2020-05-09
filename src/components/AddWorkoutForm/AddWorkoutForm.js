import React, { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { auth } from "../../api/firebase";


const date2iso = (date) => date.toISOString().slice(0, 10);


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
