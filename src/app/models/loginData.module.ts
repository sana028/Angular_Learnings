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