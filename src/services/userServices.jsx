
import axios from 'axios';


export const createUser= async (userObj) =>{
    
    let response = await axios.post(
        "https://bookstore.incubation.bridgelabz.com/bookstore_app/swagger/api/#/User/post_bookstore_user_registration",
        userObj
       
        
    )

    return response;
}


export const login = async (userObj) => {
    let response = await axios.post(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/login",
        userObj
       
        
    );
    return response;
};



