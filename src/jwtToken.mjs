import jwt from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode'
import { environments } from './environments/environment.mjs';

const generateToken = (userinfo) =>{
    const {Id,Name,Access}=userinfo[0];
    const role = Access === 1 ? 'admin':'user';
    const token = jwt.sign({ sub: Id, username: Name, role:role }, environments.Secret_Key, { expiresIn: '1h' });
    const decodedToken = jwtDecode(token);
    return {token:token,decodedToken:decodedToken.exp,role:decodedToken.role};
}

export default generateToken;