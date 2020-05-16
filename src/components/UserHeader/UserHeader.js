import React from 'react';
import styles from './UserHeader.module.css';


export default function UserHeader(props) {
    const {user, losses} = props;

    return (
        <div className={`${styles.wrap}`}>
            <img className={`${styles.pic}`} src={user.image} alt={user.name}></img>
            <span className={`${styles.name}`}>{user.name}</span>
            <span className={`${styles.losses}`}>Aktuální prohry: {losses}</span>
            <span className={`${styles.dinners}`}>Platí večeří: {user.dinners}</span>
        </div>
    )
}
