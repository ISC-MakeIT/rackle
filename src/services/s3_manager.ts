// TODO env
const S3_PATH = 'https://s3-ap-northeast-1.amazonaws.com/rackle/';

export const S3MoviePath = (fileName: string) => S3_PATH + 'movies/' + fileName;
export const S3ThumbnailPath = (fileName: string) => S3_PATH + 'thumbnails/' + fileName;
