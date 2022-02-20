export type AwsType = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export const aws = (): {
  aws: AwsType;
} => ({
  'aws': {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
});