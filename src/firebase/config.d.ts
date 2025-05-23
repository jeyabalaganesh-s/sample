declare module '../firebase/config' {
  export const auth: import('firebase/auth').Auth;
  export const googleProvider: import('firebase/auth').GoogleAuthProvider;
  export const analytics: import('firebase/analytics').Analytics;
}
