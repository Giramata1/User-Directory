
import * as z from "zod";

export interface User {
  id?: number;
  name: string;
  email: string;
  age?: number; 
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
}

export interface UserFormData {
  name: string;
  email: string;
  age: number;
}

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Age must be 18 or older"),
});
