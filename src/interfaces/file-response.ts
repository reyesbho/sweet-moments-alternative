export interface FileUploadResponse {
    message: string;
    file:    File;
}

export interface File {
    url:      string;
    key:      string;
    size:     number;
    mimetype: string;
}
