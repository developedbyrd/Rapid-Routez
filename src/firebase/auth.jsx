import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

// export const doCreateUserWithEmailAndPassword = async (email, password) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  fullName
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Set the display name directly to fullName
  await updateProfile(userCredential.user, {
    displayName: fullName,
  });
  return userCredential;
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    // Note: The result is handled after redirect, not here
  } catch (error) {
    console.error("Google Sign-In Error:", error.message, error.code);
    throw error;
  }
};

export const handleGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      return result;
    }
  } catch (error) {
    console.error("Redirect Result Error:", error.message, error.code);
    throw error;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
