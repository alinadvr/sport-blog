import { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import {
  CurrentUserDataType,
  DataType,
  PostComponentDataType,
} from "../../lib/getReformattedData";
import { sessionOptions } from "../../lib/session";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";

import { Layout } from "../../components/layout/Layout";
import { TextInput } from "../../components/inputs/TextInput";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";
import { FileUploadInput } from "../../components/inputs/FileUploadInput";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { TextareaInput } from "../../components/inputs/TextareaInput";

interface AccountPageProps {
  user: CurrentUserDataType;
  userPosts: PostComponentDataType[];
}

const Account: NextPage<AccountPageProps> = ({ user, userPosts }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [description, setDescription] = useState(user.description);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [displayNickNameInput, setDisplayNickNameInput] = useState(false);
  const [displayDescriptionInput, setDisplayDescriptionInput] = useState(false);

  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUserData = async () => {
    setIsLoading(true);
    setDisplayNickNameInput(false);
    if (description === "") setDescription("No description");
    setDisplayDescriptionInput(false);

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("description", description);
    if (uploadedImage) {
      formData.append("image", uploadedImage);
    }

    await axios
      .post("/api/account/changeUserData", formData)
      .then(() => {
        setSaved(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Error: ${error.response.data.message || error.message}`);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setSaved(false);
  }, [nickname, description, uploadedImage]);

  useEffect(() => {
    if (!uploadedImage) {
      setPreviewImage("");
      return;
    }
    setPreviewImage(URL.createObjectURL(uploadedImage));
    return () => URL.revokeObjectURL(previewImage);
  }, [uploadedImage]);

  return (
    <Layout
      title="My account"
      isLoggedIn={true}
      avatar={user.image}
      isBackToBlogButton={true}
    >
      <div className="mx-auto w-3/4 rounded-xl border-2 border-gray-200 bg-white py-5">
        <div className="justify-around sm:flex 2xl:my-10">
          <div className="grid justify-center sm:block">
            <Image
              src={
                previewImage
                  ? previewImage
                  : user.image
                  ? `/images/avatars/${user.image}`
                  : "/images/avatar.svg"
              }
              width={200}
              height={200}
              objectFit="cover"
              alt="Avatar icon"
              className="rounded-full"
            />
            <div className="my-2.5 text-center">
              <FileUploadInput
                title="Edit"
                setUploadedImage={setUploadedImage}
              />
            </div>
            <div className="hidden justify-center gap-1 sm:grid">
              <PrimaryButton type="link" to="/saved" title="Saved" />
              <PrimaryButton type="link" to="/posts" title="My posts" />
              <PrimaryButton type="link" to="/api/logout" title="Log Out" />
            </div>
          </div>
          <div className="mx-auto flex w-5/6 flex-col justify-between sm:mx-0 sm:w-2/3">
            <div className="grid gap-1">
              <div className="flex justify-between">
                {!displayNickNameInput ? (
                  <>
                    <p className="text-left text-xl sm:text-3xl">{nickname}</p>
                    <PencilIcon
                      className="w-6 cursor-pointer"
                      onClick={() => setDisplayNickNameInput(true)}
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      value={nickname}
                      onChange={setNickname}
                      type="text"
                      styleType="account"
                    />
                    <CheckIcon
                      className="w-8 cursor-pointer"
                      onClick={() => setDisplayNickNameInput(false)}
                    />
                  </>
                )}
              </div>
              <p>{user.email}</p>
              <p className="text-gray-300">Posts amount: {userPosts.length}</p>
              <div className="flex items-start justify-between">
                {!displayDescriptionInput ? (
                  <>
                    <p className="block w-5/6 overflow-auto text-gray-300 sm:h-60">
                      {description}
                    </p>
                    {description && (
                      <PencilIcon
                        className="w-6 cursor-pointer"
                        onClick={() => setDisplayDescriptionInput(true)}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <TextareaInput
                      value={description}
                      onChange={setDescription}
                      styleType="account"
                    />
                    <CheckIcon
                      className="w-8 cursor-pointer"
                      onClick={() => {
                        setDisplayDescriptionInput(false);
                        if (description === "")
                          setDescription("No description");
                      }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="my-5 flex justify-center sm:my-0 sm:justify-end">
              {!saved ? (
                <PrimaryButton
                  buttonType="button"
                  type="button"
                  title="Save"
                  onClick={handleChangeUserData}
                  disabled={
                    isLoading ||
                    (nickname === user.nickname &&
                      description === user.description &&
                      !uploadedImage)
                  }
                  isLoading={isLoading}
                />
              ) : (
                <PrimaryButton
                  title="Saved ✓"
                  type="button"
                  buttonType="button"
                  disabled={true}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto grid w-1/2 gap-1 sm:hidden">
          <PrimaryButton type="link" to="/saved" title="Saved" />
          <PrimaryButton type="link" to="/posts" title="My posts" />
          <PrimaryButton type="link" to="/" title="Log Out" />
        </div>
      </div>
    </Layout>
  );
};

export default Account;

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context) {
    const user = context.req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const response = await fetch("http://localhost:3001/db");
    const data: DataType = await response.json();

    const userPosts = data.posts.filter((post) => post.author_id === user.id);

    return {
      props: {
        user,
        userPosts,
      },
    };
  },
  sessionOptions
);
