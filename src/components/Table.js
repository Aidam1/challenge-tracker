import React from 'react';
import UserApi from '../api/UserApi';


function log_doc(querySnapshot) {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
    });
}


export default function Table() {
    UserApi.get_users().then(log_doc);
    return (
        <div>
            test
        </div>
    )
}
