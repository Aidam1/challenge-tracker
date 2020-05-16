import React, { useContext, useState } from "react";
import { UserContext } from "../../providers/UserProvider";
import { StateContext } from "../../providers/StateProvider";
import { auth } from "../../api/firebase";
import WorkoutApi from "../../api/WorkoutApi";
import styles from './AddWorkoutForm.module.css'
import { Formik, Form, Field } from 'formik';
import { Redirect } from "react-router-dom";

const date2iso = (date) => date.toISOString().slice(0, 10);
let today = date2iso(new Date());

export default function AddWorkoutForm() {
    const user = useContext(UserContext);
    const { displayName, email } = user;

    const { users } = useContext(StateContext);
    const [redirect, setRedirect] = useState(false);

    const getInitialValues = () => {
        let initialValues = {
            date: today,
            exercise: "",
            users: {},
        }
        Object.keys(users).forEach(user => { initialValues.users[user] = "" });
        return initialValues;
    }

    const formatData = data => {
        data.date = date2iso(new Date(data.date));
        data.performances = {};
        data.exercise = data.exercise.toLowerCase();
        for (const user in data.users) {
            if (!data.users[user]) {
                delete data.users[user];
            } else {
                data.performances[user] = {
                    value: Number(data.users[user])
                }
            }
        }
        delete data.users;
        return data;
    }

    let onSubmit = values => {
        let formattedData = formatData(values);

        WorkoutApi.put_workout(formattedData)
            .then(result => {
                console.log(result, "result");
                setRedirect(true)
            },
                reject => console.log(reject, "error"))
    }

    const renderUsers = () => {
        if (Object.keys(users).length > 0) {
            return (Object.keys(users).map(user =>
                <div className={`${styles.fieldContainer}`} key={users[user].name}>
                    <label htmlFor={`users.${user}`} className={`${styles.label}`}>{users[user].name}</label>
                    <Field type='number' className={`${styles.input} `} id={`users.${user}`} name={`users.${user}`} />
                </div>
            )
            )
        }
    }

    return (
        <div>
            {redirect && <Redirect to="/" />}

            <div className={`${styles.loginContainer}`}>
                <span>{displayName} ({email})</span>
                <button className={`${styles.button} ${styles.buttonLogout}`} onClick={() => { auth.signOut() }}>Odhlásit se</button>
            </div>

            <div className={`${styles.formContainer}`}>
                {Object.keys(users).length > 0 && !redirect &&
                    <Formik initialValues={getInitialValues()} onSubmit={onSubmit} >
                        <Form className={`${styles.form}`}>

                            <h1>Zadat výsledky</h1>

                            <div className={`${styles.fieldContainer}`}>
                                <label htmlFor='date' className={`${styles.label}`}>Datum</label>
                                <Field type='date' className={`${styles.input} `} id='date' name='date' />
                            </div>

                            <div className={`${styles.fieldContainer}`}>
                                <label htmlFor='exercise' className={`${styles.label}`}>Cvik</label>
                                <Field type='text' className={`${styles.input} `} id='exercise' name='exercise' required />
                            </div>

                            {renderUsers()}

                            <button type="submit" className={`${styles.button} ${styles.buttonSubmit} `}>Odeslat</button>
                        </Form>
                    </Formik>
                }
            </div>
        </div>

    )
}
