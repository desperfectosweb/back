
export interface IIncidenceImage {
    //remove comment for compatibility with Firebase Storage, AWS S3, etc.
    uri: string;
    name: string;
    format: string;
    imageBase64: string;
}
