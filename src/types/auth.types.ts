export interface Auth0Identity {
  issuer: string;
  subject: string;
  email?: string;
  emailVerified?: boolean;
}