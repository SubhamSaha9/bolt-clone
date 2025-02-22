import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const verifyToken = (res:string)=>{
  return res === "Token is invali";
}

export const countToken = (inputString: string)=>{
  return inputString.trim().split(/\s+/).filter(word=> word).length;
}