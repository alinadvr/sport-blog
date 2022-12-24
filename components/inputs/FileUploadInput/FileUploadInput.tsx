import { toast } from "react-toastify";

interface FileUploadInputProps {
  title: string;
  setUploadedImage: (file: File) => void;
}

export function FileUploadInput({
  title,
  setUploadedImage,
}: FileUploadInputProps) {
  function onChange(file: File) {
    const fileExtension = file.name.split(".")[1];
    if (
      fileExtension === "png" ||
      fileExtension === "jpeg" ||
      fileExtension === "jpg"
    ) {
      setUploadedImage(file);
    } else {
      toast.error("Choose a PNG, JPEG or JPG file");
    }
  }

  return (
    <label className="cursor-pointer text-gray-300">
      {title}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={(e) => e.target.files?.length && onChange(e.target.files[0])}
      />
    </label>
  );
}
