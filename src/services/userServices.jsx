
import axios from 'axios';


export const createUser= async (userObj) =>{
    
    let response = await axios.post(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/registration",
        userObj
       
        
    )
   console.log(response)
    return response;
    
}


export const login = async (user) => {
    let response = await axios.post(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/login",
        user
       
        
    );
    return response;
};



