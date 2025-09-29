export interface UserNavItem {
    path: string;
    icon?: React.ReactNode;
    name: string;
}

export interface ExtendFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}

export type SearchParams = { [key: string]: string | string[] | undefined }