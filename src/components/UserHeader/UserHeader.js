import React from 'react';
import styles from './UserHeader.module.css';


export default function UserHeader() {
    return (
        <div className={`${styles.wrap}`}>
            <img className={`${styles.pic}`} src="https://i.imgur.com/2npXo0v.jpg" alt="Daniel"></img>
            <span className={`${styles.name}`}>Daniel Melo</span>
            <span className={`${styles.losses}`}>Aktuální prohry: 1</span>
            <span className={`${styles.dinners}`}>Dluží večeří: 1 </span>
        </div>
    )
}
