import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with clsx and tailwind-merge for optimal className handling
 * @param inputs - Class values to merge
 * @returns Optimized class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 * @param date - Date object or string
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

/**
 * Debounces a function to limit execution rate
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Truncates text with an ellipsis if it exceeds max length
 * @param text - Text to truncate
 * @param maxLength - Maximum allowed length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

/**
 * Generates a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export function generateId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Converts an object to URL query parameters
 * @param params - Object to convert
 * @returns URL query string
 */
export function objectToQueryString(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
}

/**
 * Deep clones an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Checks if the code is running on the client side
 * @returns boolean indicating client-side environment
 */
export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Capitalizes the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
