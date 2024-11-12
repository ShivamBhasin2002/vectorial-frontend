"use client";
import React, { useEffect } from "react";
import { FaEye, FaSignOutAlt } from "react-icons/fa";
import { useProductStore } from "@store/productsStore";
import { useRouter } from "next/navigation";
import { usePageStore } from "@store/pageStore";
import NewProduct from "./newProduct";
import { VscExtensions } from "react-icons/vsc";
import nookies from "nookies";

const Navbar = () => {
  const router = useRouter();
  const { products, fetchProducts } = useProductStore();
  const { toggleNewProductPanelOpen } = usePageStore();
  const name = "Shivam Bhasin";
  const email = "bhasinshivam2002@gmail.com";

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="h-screen bg-cream text-black flex flex-col max-h-screen items-center fixed overflow-hidden left-0 top-0 bottom-0  border-l border-l-grey w-[290px]">
        <div
          className="flex gap-2 items-center cursor-pointer w-full p-5 border-b border-borderGray"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.84853 5L12 0.848528L16.1515 5L12 9.15147L7.84853 5Z"
              fill="#7ADEA0"
              stroke="#36434D"
              stroke-width="1.2"
            />
            <path
              d="M7.84853 19L12 14.8485L16.1515 19L12 23.1515L7.84853 19Z"
              fill="#7ADEA0"
              stroke="#36434D"
              stroke-width="1.2"
            />
            <path
              d="M14.8485 12L19 7.84853L23.1515 12L19 16.1515L14.8485 12Z"
              fill="#7ADEA0"
              stroke="#36434D"
              stroke-width="1.2"
            />
            <path
              d="M0.848528 12L5 7.84853L9.15147 12L5 16.1515L0.848528 12Z"
              fill="#7ADEA0"
              stroke="#36434D"
              stroke-width="1.2"
            />
          </svg>

          <div className="whitespace-nowrap font-extrabold text-[24px]">
            Vectorial AI
          </div>
        </div>
        {/* <div className="flex-1 w-full block">
          <ul className="overflow-y-auto">
            {Object.values(products).map((product, index) => (
              <li
                key={index}
                className={clsx(
                  "truncate px-2 py-1 hover:bg-darkGrey hover:font-bold rounded-lg cursor-pointer mb-1",
                  selectedProductId === product.productId &&
                    "bg-darkGrey font-bold"
                )}
                title={product.productName}
                onClick={() => {
                  setSelectedProduct(product.productId);
                  router.push(`/dashboard/product/${product.productId}`);
                }}
              >
                {product.productName}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="mt-auto flex gap-2 p-3 flex-col w-full">
          <button
            className="focus:outline-none flex gap-3 items-center py-3 px-4"
            onClick={() => {
              toggleNewProductPanelOpen(true);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.75C5.44629 1.75 1.75 5.44629 1.75 10C1.75 14.5537 5.44629 18.25 10 18.25C14.5537 18.25 18.25 14.5537 18.25 10C18.25 5.44629 14.5537 1.75 10 1.75ZM10 2.25C14.2832 2.25 17.75 5.7168 17.75 10C17.75 14.2832 14.2832 17.75 10 17.75C5.7168 17.75 2.25 14.2832 2.25 10C2.25 5.7168 5.7168 2.25 10 2.25ZM10 3C9.8623 3 9.75 3.1123 9.75 3.25C9.75 3.3877 9.8623 3.5 10 3.5C10.1377 3.5 10.25 3.3877 10.25 3.25C10.25 3.1123 10.1377 3 10 3ZM11.3232 3.12891C11.2012 3.12598 11.0957 3.21094 11.0713 3.33105C11.0449 3.46582 11.1328 3.59766 11.2686 3.625C11.4033 3.65137 11.5352 3.56348 11.5625 3.42871C11.5889 3.29297 11.501 3.16113 11.3662 3.13379C11.3516 3.13184 11.3379 3.12988 11.3232 3.12891ZM8.68457 3.12988C8.66797 3.12988 8.65137 3.13086 8.63477 3.13379C8.49902 3.16113 8.41113 3.29297 8.43848 3.42871C8.45117 3.49316 8.48926 3.55078 8.54492 3.58789C8.59961 3.62402 8.66699 3.6377 8.73242 3.625C8.86816 3.59766 8.95605 3.4668 8.92871 3.33105C8.90527 3.21484 8.80371 3.13086 8.68457 3.12988ZM7.41895 3.51367C7.38574 3.51367 7.35254 3.51953 7.32129 3.53223C7.19336 3.58594 7.13281 3.73145 7.18652 3.85938C7.23926 3.9873 7.38477 4.04785 7.5127 3.99512C7.64063 3.94141 7.70117 3.7959 7.64844 3.66797C7.60938 3.5752 7.51953 3.51465 7.41895 3.51367ZM12.5889 3.51367C12.4854 3.51172 12.3916 3.57227 12.3516 3.66797C12.2988 3.7959 12.3594 3.94141 12.4873 3.99512C12.6152 4.04785 12.7607 3.9873 12.8135 3.85938C12.8672 3.73145 12.8066 3.58594 12.6787 3.53223C12.6504 3.52051 12.6191 3.51465 12.5889 3.51367ZM6.25293 4.13672C6.20215 4.13672 6.15234 4.15137 6.11035 4.17969C5.99609 4.25586 5.96484 4.41113 6.04199 4.52637C6.11816 4.64062 6.27344 4.67188 6.38867 4.59473C6.50391 4.51855 6.53418 4.36328 6.45801 4.24902C6.41211 4.17969 6.33496 4.1377 6.25293 4.13672ZM13.7539 4.13672C13.6689 4.13574 13.5889 4.17773 13.542 4.24902C13.4648 4.36328 13.4961 4.51855 13.6104 4.59473C13.7256 4.67188 13.8809 4.64062 13.957 4.52637C13.9941 4.47168 14.0078 4.40332 13.9951 4.33887C13.9824 4.27344 13.9443 4.21582 13.8887 4.17969C13.8486 4.15234 13.8027 4.1377 13.7539 4.13672ZM5.23047 4.97656C5.16309 4.97656 5.09766 5.00293 5.05078 5.05078C4.95312 5.14746 4.95312 5.30664 5.05078 5.40332C5.14746 5.50098 5.30664 5.50098 5.40332 5.40332C5.50098 5.30664 5.50098 5.14746 5.40332 5.05078C5.35742 5.00391 5.2959 4.97754 5.23047 4.97656ZM14.7764 4.97656C14.709 4.97656 14.6436 5.00293 14.5967 5.05078C14.499 5.14746 14.499 5.30664 14.5967 5.40332C14.6934 5.50098 14.8525 5.50098 14.9492 5.40332C15.0469 5.30664 15.0469 5.14746 14.9492 5.05078C14.9033 5.00391 14.8418 4.97754 14.7764 4.97656ZM15.6152 6C15.5645 5.99902 15.5156 6.01367 15.4736 6.04199C15.3594 6.11816 15.3281 6.27344 15.4053 6.3877C15.4814 6.50293 15.6367 6.53418 15.751 6.45703C15.8662 6.37988 15.8975 6.22559 15.8203 6.11035C15.7744 6.04199 15.6973 6 15.6152 6ZM4.3916 6C4.30664 5.99805 4.22656 6.04004 4.17969 6.11035C4.10352 6.22559 4.13379 6.38086 4.24902 6.45703C4.36426 6.53418 4.51855 6.50293 4.5957 6.38867C4.67187 6.27344 4.6416 6.11816 4.52637 6.04199C4.48633 6.01562 4.44043 6.00098 4.3916 6ZM9 6V9H6V11H9V14H11V11H14V9H11V6H9ZM9.5 6.5H10.5V9.5H13.5V10.5H10.5V13.5H9.5V10.5H6.5V9.5H9.5V6.5ZM16.2383 7.16699C16.2051 7.16602 16.1719 7.17285 16.1406 7.18555C16.0127 7.23828 15.9521 7.38477 16.0049 7.51172C16.0586 7.63965 16.2041 7.7002 16.332 7.64746C16.46 7.59473 16.5205 7.44824 16.4678 7.32031C16.4287 7.22852 16.3389 7.16699 16.2383 7.16699ZM3.76953 7.16699C3.66602 7.16504 3.57227 7.22559 3.5332 7.32129C3.48047 7.44922 3.54102 7.59473 3.66797 7.64844C3.7959 7.70117 3.94238 7.64063 3.99512 7.5127C4.04785 7.38477 3.9873 7.23926 3.85938 7.18652C3.83105 7.17383 3.80078 7.16797 3.76953 7.16699ZM16.6211 8.43359C16.6045 8.43262 16.5879 8.43457 16.5713 8.4375C16.4365 8.46484 16.3486 8.59668 16.375 8.73145C16.4023 8.86719 16.5342 8.95508 16.6689 8.92871C16.8047 8.90137 16.8926 8.76953 16.8662 8.63379C16.8428 8.51758 16.7402 8.43359 16.6211 8.43359ZM3.38672 8.43359C3.26465 8.43066 3.15918 8.51465 3.13477 8.63379C3.12207 8.69922 3.13477 8.76758 3.17188 8.82227C3.20898 8.87793 3.2666 8.91602 3.33203 8.92871C3.39648 8.94141 3.46387 8.92773 3.51953 8.8916C3.57422 8.85449 3.6123 8.79688 3.625 8.73145C3.65234 8.59668 3.56445 8.46484 3.42969 8.4375C3.41504 8.43555 3.40137 8.43359 3.38672 8.43359ZM3.25 9.75C3.1123 9.75 3 9.8623 3 10C3 10.1377 3.1123 10.25 3.25 10.25C3.3877 10.25 3.5 10.1377 3.5 10C3.5 9.8623 3.3877 9.75 3.25 9.75ZM16.75 9.75C16.6123 9.75 16.5 9.8623 16.5 10C16.5 10.1377 16.6123 10.25 16.75 10.25C16.8877 10.25 17 10.1377 17 10C17 9.8623 16.8877 9.75 16.75 9.75ZM3.38086 11.0664C3.36426 11.0664 3.34766 11.0684 3.33105 11.0713C3.19531 11.0986 3.10742 11.2305 3.13477 11.3662C3.16211 11.501 3.29297 11.5889 3.42871 11.5625C3.56445 11.5352 3.65234 11.4033 3.625 11.2686C3.60156 11.1514 3.5 11.0674 3.38086 11.0664ZM16.627 11.0664C16.5049 11.0635 16.3994 11.1484 16.375 11.2686C16.3486 11.4033 16.4365 11.5352 16.5713 11.5625C16.707 11.5889 16.8389 11.501 16.8662 11.3662C16.8926 11.2305 16.8047 11.0986 16.6689 11.0713C16.6553 11.0693 16.6416 11.0674 16.627 11.0664ZM16.2422 12.332C16.1387 12.3301 16.0449 12.3916 16.0049 12.4873C15.9521 12.6143 16.0127 12.7607 16.1406 12.8135C16.2686 12.8662 16.4141 12.8057 16.4678 12.6787C16.5205 12.5508 16.46 12.4043 16.332 12.3516C16.3037 12.3398 16.2725 12.333 16.2422 12.332ZM3.76562 12.333C3.73242 12.333 3.69922 12.3389 3.66797 12.3516C3.60742 12.377 3.55859 12.4258 3.5332 12.4873C3.50781 12.5488 3.50781 12.6172 3.53223 12.6787C3.58594 12.8066 3.73145 12.8672 3.85938 12.8135C3.9209 12.7891 3.96973 12.7402 3.99512 12.6787C4.02051 12.6172 4.02051 12.5488 3.99512 12.4873C3.95703 12.3945 3.86621 12.334 3.76562 12.333ZM15.6172 13.5C15.5322 13.498 15.4521 13.54 15.4053 13.6104C15.3281 13.7256 15.3594 13.8799 15.4736 13.957C15.5283 13.9941 15.5967 14.0078 15.6611 13.9941C15.7266 13.9814 15.7842 13.9434 15.8203 13.8877C15.8975 13.7734 15.8662 13.6182 15.751 13.542C15.7119 13.5146 15.665 13.5 15.6172 13.5ZM4.39062 13.5C4.33984 13.499 4.29102 13.5137 4.24902 13.542C4.13477 13.6191 4.10352 13.7734 4.17969 13.8887C4.25684 14.0029 4.41211 14.0342 4.52734 13.957C4.6416 13.8809 4.67285 13.7256 4.5957 13.6104C4.5498 13.542 4.47266 13.501 4.39062 13.5ZM5.23047 14.5234C5.16309 14.5225 5.09766 14.5488 5.05078 14.5967C4.95312 14.6934 4.95312 14.8525 5.05078 14.9492C5.14746 15.0469 5.30664 15.0469 5.40332 14.9492C5.50098 14.8525 5.50098 14.6934 5.40332 14.5967C5.35742 14.5498 5.2959 14.5234 5.23047 14.5234ZM14.7764 14.5234C14.709 14.5225 14.6436 14.5488 14.5967 14.5967C14.499 14.6934 14.499 14.8525 14.5967 14.9492C14.6934 15.0469 14.8525 15.0469 14.9492 14.9492C15.0469 14.8525 15.0469 14.6934 14.9492 14.5967C14.9033 14.5498 14.8418 14.5234 14.7764 14.5234ZM6.25488 15.3623C6.16992 15.3604 6.08984 15.4023 6.04297 15.4727C5.96582 15.5879 5.99707 15.7432 6.1123 15.8203C6.22656 15.8965 6.38184 15.8652 6.45801 15.751C6.53516 15.6357 6.50391 15.4814 6.38965 15.4043C6.34961 15.3779 6.30273 15.3623 6.25488 15.3623ZM13.7529 15.3623C13.7021 15.3613 13.6533 15.376 13.6113 15.4033C13.5557 15.4404 13.5176 15.498 13.5049 15.5635C13.4922 15.6279 13.5059 15.6963 13.543 15.751C13.6191 15.8652 13.7744 15.8965 13.8896 15.8203C14.0039 15.7432 14.0352 15.5879 13.958 15.4727C13.9131 15.4043 13.8359 15.3623 13.7529 15.3623ZM7.42285 15.9854C7.31934 15.9834 7.22559 16.0449 7.18652 16.1406C7.13379 16.2676 7.19434 16.4141 7.32129 16.4668C7.44922 16.5195 7.5957 16.459 7.64844 16.332C7.70117 16.2041 7.64063 16.0576 7.5127 16.0049C7.48438 15.9932 7.4541 15.9863 7.42285 15.9854ZM12.585 15.9854C12.5518 15.9854 12.5186 15.9922 12.4883 16.0049C12.4268 16.0303 12.3779 16.0791 12.3525 16.1396C12.3271 16.2012 12.3271 16.2705 12.3516 16.332C12.4053 16.459 12.5508 16.5195 12.6787 16.4668C12.7402 16.4414 12.7891 16.3926 12.8145 16.332C12.8398 16.2705 12.8398 16.2012 12.8145 16.1406C12.7764 16.0469 12.6855 15.9863 12.585 15.9854ZM8.69043 16.3701C8.56836 16.3672 8.46191 16.4521 8.43848 16.5713C8.41113 16.707 8.49902 16.8379 8.63477 16.8652C8.77051 16.8926 8.90137 16.8047 8.92871 16.6689C8.95605 16.5332 8.86816 16.4023 8.73242 16.375C8.71875 16.3721 8.7041 16.3701 8.69043 16.3701ZM11.3174 16.3711C11.3008 16.3701 11.2842 16.3721 11.2686 16.375C11.1328 16.4023 11.0449 16.5332 11.0713 16.6689C11.085 16.7344 11.123 16.791 11.1777 16.8281C11.2334 16.8652 11.3008 16.8789 11.3662 16.8662C11.4307 16.8525 11.4883 16.8145 11.5254 16.7598C11.5615 16.7041 11.5752 16.6367 11.5625 16.5713C11.5391 16.4551 11.4365 16.3711 11.3174 16.3711ZM10 16.5C9.8623 16.5 9.75 16.6123 9.75 16.75C9.75 16.8877 9.8623 17 10 17C10.1377 17 10.25 16.8877 10.25 16.75C10.25 16.6123 10.1377 16.5 10 16.5Z"
                fill="black"
              />
            </svg>

            <div className="text-sm">New Project</div>
          </button>
          <button
            className="focus:outline-none flex gap-3 items-center py-3 px-4"
            onClick={() => {
              router.push("/dashboard/integrations");
            }}
          >
            <VscExtensions />
            <div className="text-sm">Integrations</div>
          </button>
          <button
            className="focus:outline-none flex gap-3 items-center py-3 px-4"
            onClick={() => {
              router.push("/dashboard/product");
            }}
          >
            <FaEye />
            <div className="text-sm">Projects</div>
            <div className="flex justify-center items-center w-5 h-5 bg-green rounded-full text-white ml-auto text-xs">
              {Object.keys(products ?? {}).length}
            </div>
          </button>
          <button
            className="focus:outline-none flex gap-3 items-center py-3 px-4"
            onClick={() => {
              nookies.destroy(null, "authToken", { path: "/" });
              router.push("/auth/login");
            }}
          >
            <FaSignOutAlt />
            <div className="text-sm">Sign Out</div>
          </button>
        </div>
        <div className=" w-full h-[76px] border-t border-borderGray flex gap-3 p-5">
          <div className="w-9 h-9 rounded-full bg-green text-white text-sm flex justify-center items-center">
            {name[0].toLocaleUpperCase()}
          </div>
          <div>
            <div className="text-sm">{name}</div>
            <div className="text-xs font-light">{email}</div>
          </div>
        </div>
      </div>
      <NewProduct />
    </>
  );
};

export default Navbar;
