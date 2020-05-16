import { firestore } from './firebase';


class UserApi {
    static collectionRef = firestore.collection("users");

    static connect_users(setData, setLoading) {
        this.collectionRef.orderBy("name", "asc").onSnapshot(querySnapshot => {
            let userObj = {}
            querySnapshot.docs.forEach(doc => {
                userObj[doc.id] = doc.data();
            });
            setData(userObj);
            setLoading(false);
        });
    }

    static put_user(user) {
        user = Object.assign({}, user);
        let userRef = null;
        if (user.id) {
            userRef = this.collectionRef.doc(user.id);
            delete user.id;
        } else {
            userRef = this.collectionRef.doc();
        }
        return userRef.set(user);
    }
}

export default UserApi;