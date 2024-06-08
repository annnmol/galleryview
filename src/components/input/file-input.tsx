import { IMedia } from "@/lib/dummy-data";
import { getCoverMedia, getCurrentMediaExtensions } from "@/lib/utils";
import { AppStoreContext } from "@/store/app-store-context";
import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FileInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const { setFilesData, filesData } = useContext(AppStoreContext);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleUploadClick = (event: any) => {
    const file = event.target.files[0];

    const reader: any = new FileReader();
    if (!reader || !file) {
      alert("Invalid File format");
      return null;
    }
    const url = reader?.readAsDataURL(file);

    reader.onloadend = (e: any) => {
      const mimeType = e?.target?.result
        ?.split(",")[0]
        ?.split(":")[1]
        ?.split(";")[0];
      console.log(
        `🚀 ~ file: file-input.tsx:34 ~ handleUploadClick ~ mimeType:`,
        mimeType
      );
      if (!getCurrentMediaExtensions(id ?? "").includes(mimeType)) {
        alert("Invalid File format");
        return;
      }
      onImageChange(file);
    };
  };

  const onImageChange = (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("source", file);

      const newFile: IMedia = {
        id: filesData.length + 1,
        title: file.name,
        type: id ?? "image",
        url: URL.createObjectURL(file),
        cover:
          id === "image" ? URL.createObjectURL(file) : getCoverMedia(id ?? ""),
        createdAt: new Date(),
      };

      console.log(
        `🚀 ~ file: file-input.tsx:59 ~ onImageChange ~ newFile:`,
        newFile
      );

      setFilesData((prev) => [newFile, ...prev]);
      alert("File uploaded successfully");
    }
  };
  return (
    <div className="max-w-sm items-center gap-1.5">
      <Label htmlFor="media">
        <Button onClick={handleButtonClick}>Add {id ?? "Media"}</Button>
      </Label>
      <Input
        id="media"
        name="media"
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept={getCurrentMediaExtensions(id ?? "").join(",")}
        onChange={handleUploadClick}
        value={""}
      />
    </div>
  );
};

export default FileInput;
