import React, { useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import AddWorkoutForm from "../AddWorkoutForm/AddWorkoutForm";
import SignIn from "../SignIn/SignIn";


export default function Admin() {
    const user = useContext(UserContext);

    return (
        user ?
            <AddWorkoutForm />
        :
            <SignIn />
    );
}
