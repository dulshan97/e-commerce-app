export interface ValidationSchema {
    email: string;
    password: string;
  }


export interface ValidationSchema {
  id?:string,
  password: string;
  email: string;
  name?: string;
  isAuthenticated?: boolean;
  registeredAt?:string
}

export interface LoginValidationSchema {
  email: string;
  password: string;
}


