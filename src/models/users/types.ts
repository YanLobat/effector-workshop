export type FirebaseUser = {
  email: string;
  avatar?: string;
  fullName?: string;
  tableID: string;
  id?: string;
}

export type UsersMap = {
  [key: string]: FirebaseUser
}

export type TableIDUsersMap = {
  [key: string]: FirebaseUser[]
}