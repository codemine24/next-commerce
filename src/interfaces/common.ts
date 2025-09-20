export interface UserNavItem {
    path: string;
    icon?: React.ReactNode;
    name: string;
}

export type FileUploadType = File | string | null;
export type FilesUploadType = (File | string)[];

export interface ExtendFile extends File {
    path?: string;
    preview?: string;
    lastModifiedDate?: Date;
}