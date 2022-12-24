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
import { SecondaryButton } from "../../components/buttons/SecondaryButton";
import { CategoriesDataType } from "../../lib/getReformattedData";

interface CreateEditPostProps {
  userId: number;
  categories: CategoriesDataType[];
  apiRoute: string;
  postId?: number;
  postTitle?: string;
  postCategoryId?: number;
  postText?: string;
  postImagePreview?: string;
}

export const CreateEditPost = ({
  userId,
  categories,
  apiRoute,
  postId,
  postTitle = "",
  postCategoryId = 0,
  postText,
  postImagePreview = "",
}: CreateEditPostProps) => {
  let newEditorState: EditorState = EditorState.createEmpty();
  const router = useRouter();
  if (postText) {
    const rawData = markdownToDraft(postText);
    const contentState = convertFromRaw(rawData);
    newEditorState = EditorState.createWithContent(contentState);
  }
  const [title, setTitle] = useState(postTitle);

  const [categoryId, setCategoryId] = useState(postCategoryId);
  const [text, setText] = useState(newEditorState);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(postImagePreview);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!uploadedImage) {
      setImagePreview("");
      return;
    }
    setImagePreview(URL.createObjectURL(uploadedImage));
  }, [uploadedImage]);

  const handleCreateEditPost = async () => {
    setIsLoading(true);
    const formData = new FormData();
    if (postId) formData.append("id", postId.toString());
    formData.append("title", title);
    formData.append("categoryId", categoryId.toString());
    formData.append(
      "text",
      draftToMarkdown(convertToRaw(text.getCurrentContent()))
    );
    formData.append("image", uploadedImage ? uploadedImage : imagePreview);
    formData.append("authorId", userId.toString());

    let status = false;
    await axios
      .post(`/api/post/${apiRoute}`, formData)
      .then(() => {
        status = true;
      })
      .catch((err) => {
        status = false;
        console.log("err", err);
        toast.error(`Error: ${err.response.data.message}`);
      });

    setIsLoading(false);
    if (status) {
      await router.push(`/posts`);
    }
  };

  return (
    <div
      className="flex w-5/6 flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-white py-10 lg:w-2/4"
      style={{ paddingTop: 30, paddingBottom: 30 }}
    >
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
          {imagePreview && (
            <div className="relative w-full" style={{ height: 300 }}>
              <Image
                src={
                  imagePreview.startsWith("blob")
                    ? imagePreview
                    : `/images/posts/${imagePreview}`
                }
                layout="fill"
                alt="preview image"
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
          <div className="flex items-center justify-between">
            <FileUploadInput
              title="Upload file"
              setUploadedImage={setUploadedImage}
            />
            <SecondaryButton
              title="Create"
              type="button"
              buttonType="submit"
              disabled={
                title === postTitle &&
                categoryId === postCategoryId &&
                text === newEditorState &&
                !uploadedImage &&
                !isLoading
              }
              onClick={handleCreateEditPost}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
