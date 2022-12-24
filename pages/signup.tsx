import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { isUserLogged } from "../lib/getUser";

import { Layout } from "../components/layout/Layout";
import { TextInput } from "../components/inputs/TextInput";
import { PrimaryButton } from "../components/buttons/PrimaryButton";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmedPassword) {
      setError("Passwords do not match");
    } else {
      setIsLoading(true);
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setError("");
        await router.push("/login");
      } else {
        setError("User already exists");
        // toast.error(`Error: ${response.statusText}`);
      }
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Sign up" isLoggedIn={false} isBackToBlogButton={true}>
      <div className="central-container flex h-1/2 w-5/6 flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white sm:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-4xl">{"Let's get started!"}</h1>
        <p className="text-gray-300">Create a new account</p>
        <form className="mx-auto grid w-2/3 gap-1.5">
          <TextInput
            type="email"
            value={email}
            onChange={setEmail}
            styleType="login"
            placeholder="Email"
            error={error}
          />
          <TextInput
            type="password"
            value={password}
            onChange={setPassword}
            styleType="login"
            placeholder="Password"
            error={error}
          />
          <TextInput
            type="password"
            value={confirmedPassword}
            onChange={setConfirmedPassword}
            styleType="login"
            placeholder="Confirmed password"
            error={error}
          />
          {error && (
            <p className="text-center text-lg text-rose-600">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <Link href="/signup">
              <a className="cursor-pointer text-left text-sm text-black hover:underline sm:text-base">
                Have an account?
              </a>
            </Link>
            <PrimaryButton
              type="button"
              title="Sign Up"
              buttonType="submit"
              onClick={handleSignUp}
              disabled={!email || !password || !confirmedPassword || isLoading}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;

export const getServerSideProps = isUserLogged;

// <>
//   <Head>
//     <title>Sign Up</title>
//   </Head>
//
//   <div className="h-screen overflow-hidden">
//     <Header isLoggedIn={false} />
//     <BackToBlogButton />
//
//     <main className="mx-auto h-full w-5/6">
//       <div className="m-auto flex h-2/3 flex-col items-center justify-center">
//         <h1 className="text-4xl">{"Let's get started!"}</h1>
//         <p className="mt-1 mb-6 text-gray-200">Create a new account</p>
//         <PrimaryInputField
//           type="email"
//           placeholder="Email"
//           styleType="signup"
//           onValueChange={setEmail}
//           error={error}
//         />
//         <PrimaryInputField
//           type="password"
//           placeholder="Password"
//           styleType="signup"
//           onValueChange={setPassword}
//           error={error}
//         />
//         <PrimaryInputField
//           type="password"
//           placeholder="Confirm password"
//           styleType="signup"
//           onValueChange={setConfirmedPassword}
//           error={error}
//         />
//         {error && <p className="text-lg text-rose-600">{error}</p>}
//         <div className="my-1 flex w-full items-center justify-between sm:w-1/3">
//           <Link href="/login">
//             <a className="cursor-pointer text-black-200 hover:underline">
//               Have an account?
//             </a>
//           </Link>
//           <PrimaryButton
//             type="button"
//             title="Sign Up"
//             onClick={handleSignUp}
//             disabled={!email || !password || !confirmedPassword}
//           />
//         </div>
//       </div>
//     </main>
//   </div>
// </>
