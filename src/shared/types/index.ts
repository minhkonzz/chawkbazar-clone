export type FirestoreQueryDocumentsConfig = {
   collectionName: string,
   _startAfter?: any,
   _limit?: number,
   _where?: [any, any, any]
};

export type SignInRequestBody = {
   email: string,
   password: string
};

export type SignUpRequestBody = {
   name: string,
   email: string,
   password: string
};

export type RefreshTokensBody = {
   refreshToken: string
}

export type CurrentUser = {
   uuid: string,
   displayName: string,
   email: string,
   emailVerified: boolean,
   phoneNumber: string,
   photoURL: string,
};

