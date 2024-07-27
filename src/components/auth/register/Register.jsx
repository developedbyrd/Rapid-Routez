import React, { useState } from "react";
import "./Register.css";
import { Navigate, Link } from "react-router-dom";
import { firestoreDB, doc, setDoc } from "../../../firebase/firebase";
import { useAuth } from "../../../contexts/authContext/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userLoggedIn, currentUser } = useAuth();

  const addUserToFirestore = async (uid, fullName, email, phoneNumber) => {
    try {
      if (!fullName) {
        throw new Error("Full name is required");
      }

      const userDetailsRef = doc(firestoreDB, "User Details", uid);

      await setDoc(userDetailsRef, {
        uid,
        fullName,
        email,
        phoneNumber,
      });
      toast.success("Your Account Created Successfully");
    } catch (error) {
      console.error("Error adding user details: ", error);
      toast.error("Error adding user details");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (!isRegistering) {
        setIsRegistering(true);
        try {
          const userCredential = await doCreateUserWithEmailAndPassword(
            email,
            password,
            fullName
          );
          const user = userCredential.user;
          await addUserToFirestore(user.uid, fullName, email, phoneNumber);
        } catch (error) {
          setErrorMessage(error.message);
          setIsRegistering(false);
        }
      }
    } else {
      toast.error("Your Password and Confirm Password doesn't Match");
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <main className="w-full min-h-[110vh] flex justify-end place-content-center place-items-center bg-slate-100">
        <div className="w-[50%] mix-blend-darken">
          <img src="/register.jpg" alt="" />
        </div>
        <div className="w-[50%] text-gray-600 space-y-5 p-4 mt-20">
          <div className="text-center mb-10">
            <div className="mt-2">
              <h3 className="text-gray-800 text-xl font-medium sm:text-2xl font-apercu">
                Create a New Account
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-600 font-light font-apercu right-[225px] relative">
                Full Name
              </label>
              <input
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="w-[70%] mt-2 px-3 py-2 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-600 font-light font-apercu right-[238px] relative">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-[70%] mt-2 px-3 py-2 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-600 font-light font-apercu right-56 relative">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-[70%] mt-2 px-3 py-2 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-600 font-light font-apercu right-[195px] relative">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="w-[70%] mt-2 px-3 py-2 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm text-gray-600 font-light font-apercu right-[203px] relative">
                Phone Number
              </label>
              <input
                disabled={isRegistering}
                type="number"
                autoComplete="tel-national"
                required
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                className="w-[70%] mt-2 px-3 py-2 text-[#222222] bg-[#ffffffb3] outline-none border focus:border-[#222222] shadow-sm rounded transition duration-300 font-apercu"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-[70%] relative left-[110px] px-4 py-2 text-white font-medium rounded-lg font-apercu ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#222222] hover:bg-[#0c0c0c] hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center font-apercu">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-center text-sm hover:underline font-bold"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
