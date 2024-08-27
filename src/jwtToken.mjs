import jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode'
import { environments } from './environments/environment.mjs';

const generateToken = (userinfo) =>{
    const {id,name}=userinfo;
    const token = jwt.sign({ sub: id, username: name }, environments.Secret_Key, { expiresIn: '1h' });
    console.log(token);
    const decodedToken = jwtDecode(token).exp;
    return {token:token,decodedToken:decodedToken};
}

export default generateToken;