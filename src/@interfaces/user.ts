export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

export interface UserType {
  /** User unique identifier */
  id: string;
  /** User last name */
  last_name: string;
  /** User first name */
  name: string;
  /** Profile image URL */
  image?: string;
  /** User email address */
  email: string;
  /** User verify email status */
  is_email_verified: boolean;
  /** User role */
  role: UserRole;
  /** Indicates if the user is active */
  is_active?: boolean;
  /** Indicates if the user is banned */
  is_banned?: boolean;
  /** User account creation timestamp */
  created_at?: string;
  /** User last update timestamp */
  updated_at?: string;
  /** User deletion timestamp (if soft deleted) */
  deleted_at?: string;
  /** User password (hashed) */
  password: string;
}
