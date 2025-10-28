import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatSalary = (salary: string) => {
  return new Intl.NumberFormat('en-US').format(parseInt(salary, 10))
}

export const parseUrlParam = (value: string | null, defaultValue: string, radix: number = 10): number => {
  return parseInt(value || defaultValue, radix)
}
