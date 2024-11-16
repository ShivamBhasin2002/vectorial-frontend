import { BinIcon } from "@assets/icons/binIcon";
import { FileIcon } from "@assets/icons/fileIcon";
import { UploadIcon } from "@assets/icons/uploadIcon";
import { sideBarStates } from "@store/pageStore";
import { useProductStore } from "@store/productsStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React from "react";

const FileComponet = ({
  fileUrl,
  fileType,
}: {
  fileUrl: string;
  fileType: sideBarStates;
}) => {
  const { deleteFile, selectedProductId } = useProductStore();
  const deleteFileHandler = () => {
    deleteFile({
      fileType,
      productId: selectedProductId as string,
      fileUrl,
    });
  };
  const fileName = fileUrl.slice(fileUrl.lastIndexOf("/") + 1);
  return (
    <div className="flex gap-4 px-4 py-2 items-center">
      <FileIcon className="w-6 h-6" />
      <a
        href={fileUrl}
        className={clsx(
          "rounded-lg cursor-pointer w-full p-2 overflow-hidden whitespace-nowrap text-ellipsis"
        )}
      >
        {fileName}
      </a>
      <BinIcon className="w-7 h-7 flex-shrink-0 cursor-pointer" onClick={deleteFileHandler} />
    </div>
  );
};

export const FilesListing = ({ fileType }: { fileType: sideBarStates }) => {
  const { productId } = useParams();
  const { products, uploadFile } = useProductStore();
  const selectedProduct = products[productId as string];
  const fileUrls =
    fileType === "Transcripts"
      ? selectedProduct?.interviewTranscripts
      : selectedProduct?.fileUris;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await uploadFile({
        files: e.target.files,
        fileType,
        productId: productId as string,
      });
    }
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      {Boolean(fileUrls && fileUrls.length) &&
        fileUrls.map((fileUrl) => (
          <FileComponet fileUrl={fileUrl} key={fileUrl} fileType={fileType} />
        ))}
      <label
        htmlFor="fileInput"
        className="focus:outline-none flex gap-2 justify-center items-center p-2 w-full text-white bg-green h-12 mt-auto rounded-3xl cursor-pointer"
      >
        <UploadIcon />
        <div className="whitespace-nowrap text-white font-bold">
          New {fileType === "Files" ? "Source" : "Transcript"}
        </div>
      </label>
      <input
        type="file"
        onChange={(e) => handleFileChange(e)}
        multiple
        style={{ display: "none" }}
        id="fileInput"
      />
    </div>
  );
};
