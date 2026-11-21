export interface ResolveHQUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePictureKey: string | null;
  isActive: boolean;
}