export interface responseData{
   message: string,
    auth: {
        token:string,
        decodedToken:string,
        role: string,
        id: string
    }
}

export interface loginPayload{
   email:string,
   password:string
}

export interface UserData{
    id:number;
    name:string,
    email:string,
    password:string,
    Designation:string,
    Skills:string,
    photo:string,
    about:string,
    access:boolean
}