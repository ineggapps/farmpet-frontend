import { gql } from "apollo-boost";

const UPDATE_ACCOUNT = gql`
    mutation updateAccount($avatar:String, $username:String, $firstName:String, $lastName:String, bio:String){
        updateAccount(avatar:$avatar, username:$username, firstName:$firstName, lastName:$lastName, bio:$bio)
    }
`;
