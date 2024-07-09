import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function pickAvatarName(name: string) {
  const nameArray = name.split(" ");
  if (nameArray.length > 1) {
    return `${nameArray[0]?.charAt(0).toUpperCase()}${nameArray[1]
      ?.charAt(0)
      .toUpperCase()}`;
  } else return nameArray[0]?.charAt(0).toUpperCase();
}

export function filterPermission(permission: Record<string, number>) {
  return Object.keys(permission || {})
    .filter((key) => permission[key] === 1)
    .map((key) => ({
      label: key.replace(/_/g, " "),
      value: key,
    }));
}

//convert permission array to object
export function convertPermissionIntoObject(
  permissions: { value: string; label: string }[],
) {
  return permissions.reduce((acc, current) => {
    return {
      ...acc,
      [current.value]: 1,
    };
  }, {});
}

export function filterPermissionObject(permissions: Record<string, number>) {
  return Object.keys(permissions || {}).reduce((acc, current) => {
    return {
      ...acc,
      [current]: permissions[current],
    };
  }, {});
}

export function convertDaysToYearsOrMonthsOrDays(days: number) {
  if (days >= 365) {
    return `${Math.floor(days / 365)} year`;
  } else if (days >= 30) {
    return `${Math.floor(days / 30)} month`;
  } else {
    return `${days} days`;
  }
}

export const getBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const processTags = (tags: string) => {
  if (tags.startsWith("#")) {
    // Remove the '#' character
    tags = tags.slice(1);
  }

  // Replace spaces before '#' with empty string
  tags = tags.replace(/ #/g, "#");

  return tags;
};

export function formateDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}
