import { sideBarStates } from "@store/pageStore";
import { useProductStore } from "@store/productsStore";
import clsx from "clsx";
import { useParams } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";

const FileComponet = ({
  fileUrl,
  fileType,
}: {
  fileUrl: string;
  fileType: sideBarStates;
}) => {
  const { deleteFile, selectedProductId } = useProductStore();
  const fileName = fileUrl.slice(fileUrl.lastIndexOf("/") + 1);
  return (
    <div className="flex gap-2">
      <a
        href={fileUrl}
        className={clsx(
          "rounded-lg cursor-pointer w-full p-2 bg-grey hover:bg-purps/20 font-bold overflow-hidden whitespace-nowrap text-ellipsis flex-1"
        )}
      >
        {fileName}
      </a>
      <div
        className="rounded-lg cursor-pointer h-[40px] w-[40px] bg-grey hover:bg-red-200 text-red-600 flex justify-center items-center"
        onClick={() => {
          deleteFile({
            fileType,
            productId: selectedProductId as string,
            fileUrl,
          });
        }}
      >
        <IoTrashBin />
      </div>
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
        className="focus:outline-none hover:bg-yellow flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-yellow h-10 mt-auto overflow-hidden"
      >
        <FaPlus />
        <div className="whitespace-nowrap text-black font-bold">
          New {fileType === "Files" ? "File" : "Transcript"}
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
