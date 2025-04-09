import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? `${prefix}_` : '';
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
      } else {
          acc[`${pre}${key}`] = obj[key];
      }
      
      return acc;
  }, {});
}