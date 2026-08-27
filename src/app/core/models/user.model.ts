
export type UserRole = 'tech' | 'qa' | 'id' | 'gd'

export interface IUser {
  id: string,
  username: string,
  email: string,
  role: UserRole
}

export interface IUserDTO {
  username: string,
  email: string,
  role: UserRole
}

export type UserResponse = IUser[];
