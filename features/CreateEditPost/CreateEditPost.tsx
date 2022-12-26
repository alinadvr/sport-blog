import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  convertFromRaw,
  convertToRaw,
  EditorProps,
  EditorState,
} from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import { TextInput } from "../../components/inputs/TextInput";
import { SelectInput } from "../../components/inputs/SelectInput";
import { FileUploadInput } from "../../components/inputs/FileUploadInput";
import { CategoriesDataType } from "../../lib/getReformattedData";
import { PrimaryButton } from "../../components/buttons/PrimaryButton";

interface CommonPostProps {
  userId: number;
  categories: CategoriesDataType[];
  apiRoute: string;
}

interface CreatePostProps extends CommonPostProps {
  postId?: never;
  postTitle?: never;
  postCategoryId?: never;
  postText?: never;
  postImagePreview?: never;
}

interface EditPostPropsPostProps extends CommonPostProps {
  postId: number;
  postTitle: string;
  postCategoryId: number;
  postText: string;
  postImagePreview: string;
}

export const CreateEditPost = ({
  userId,
  categories,
  apiRoute,
  postId,
  postTitle,
  postCategoryId,
  postText,
  postImagePreview,
}: CreatePostProps | EditPostPropsPostProps) => {
  let newEditorState: EditorState = EditorState.createEmpty();
  const router = useRouter();
  if (postText) {
    const rawData = markdownToDraft(postText);
    const contentState = convertFromRaw(rawData);
    newEditorState = EditorState.createWithContent(contentState);
  }
  const [title, setTitle] = useState(postTitle || "");
  const [categoryId, setCategoryId] = useState(postCategoryId || 0);
  const [text, setText] = useState(newEditorState);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uploadedImage) {
      setImagePreview("");
      return;
    }
    setImagePreview(URL.createObjectURL(uploadedImage));
  }, [uploadedImage]);

  function getTextFromEditor(text: EditorState) {
    return draftToMarkdown(convertToRaw(text.getCurrentContent()));
  }

  const handleCreateEditPost = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (postId) formData.append("id", postId.toString());
    formData.append("title", title);
    formData.append("categoryId", categoryId.toString());
    formData.append("text", getTextFromEditor(text));
    formData.append("authorId", userId.toString());

    if (!postImagePreview) {
      if (uploadedImage) formData.append("image", uploadedImage);
      else setError("Image is required");
    } else {
      formData.append(
        "image",
        uploadedImage ? uploadedImage : postImagePreview
      );
    }

    setError("");
    let status = false;
    await axios
      .post(`/api/post/${apiRoute}`, formData)
      .then(() => {
        status = true;
      })
      .catch((err) => {
        status = false;
        toast.error(`Error: ${err.response.data.message || err.message}`);
      });

    setIsLoading(false);
    if (status) {
      await router.push(`/posts`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-5/6 flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-white py-10 lg:w-2/4">
        <div className="w-11/12 overflow-auto md:w-5/6 2xl:w-3/4">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            {"Let's create something new!"}
          </h1>
          <form className="grid gap-2">
            <TextInput
              type="text"
              value={title}
              onChange={setTitle}
              placeholder="Title"
              styleType="post"
            />
            <SelectInput
              defaultValue={categoryId}
              options={categories}
              onChange={setCategoryId}
            />
            {(imagePreview || postImagePreview) && (
              <div className="relative h-[300px] w-full">
                <Image
                  src={
                    imagePreview
                      ? imagePreview
                      : `/images/posts/${postImagePreview}`
                  }
                  layout="fill"
                  objectFit="cover"
                  alt="preview image"
                  className="rounded-xl"
                />
              </div>
            )}
            <Editor
              toolbarClassName="toolbar"
              editorClassName="editor"
              editorState={text}
              onEditorStateChange={setText}
              placeholder="Text"
            />
            {error && <p className="text-red-600">{error}</p>}
            <div className="flex items-center justify-between">
              <FileUploadInput
                title="Upload file"
                setUploadedImage={setUploadedImage}
              />
              <PrimaryButton
                title={apiRoute === "create" ? "Create" : "Edit"}
                type="button"
                buttonType="submit"
                disabled={
                  apiRoute === "create"
                    ? title === "" ||
                      categoryId === 0 ||
                      (postTitle &&
                        getTextFromEditor(text) ===
                          getTextFromEditor(newEditorState)) ||
                      !uploadedImage ||
                      isLoading
                    : (title === postTitle &&
                        getTextFromEditor(text) ===
                          getTextFromEditor(newEditorState) &&
                        categoryId === postCategoryId &&
                        !uploadedImage) ||
                      isLoading
                }
                onClick={handleCreateEditPost}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
