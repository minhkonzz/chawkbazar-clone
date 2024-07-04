export default class FirestoreUserServiceUtilities {
   static extractUserMetadata(user: any): any {
      return {
         uid: user.uid,
         displayName: user.displayName,
         email: user.email,
         phoneNumber: user.phoneNumber,
         photoURL: user.photoURL,
         emailVerified: user.emailVerified,
         creationTime: user.metadata.creationTime,
         lastSignInTime: user.metadata.lastSignInTime
      };
   }
}