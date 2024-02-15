import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import PortfoiloFetch from "../hooks/FetchPortfoilo";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ServerErrorPage from "../ServerErrorPage";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "@splidejs/react-splide/css";
import moment from "moment";
import { TERipple } from "tw-elements-react";
const GetPortfoilo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { data, isLoading, error } = PortfoiloFetch();
  if (error)
    return (
      <p className="text-center text-red-500 md:text-3xl font-black">
        {error.message}
      </p>
    );
  if (isLoading) return <Loader />;
  if (data?.status === 500) return <ServerErrorPage />;
  //   useEffect(()=>{
  //     console.log(data.data.response)
  //   },[])
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const paginatedData = data?.data?.response?.slice(
    firstPostIndex,
    lastPostIndex
  );
  const length = data?.data?.response?.length || 1;

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="">
      <div className="flex overflow-x-scroll">
        {paginatedData?.map((item, index) => {
          return (
            <div key={index} className="w-[400px] border m-6">
              <div>
                <div
                  className=" rounded-lg bg-white
                dark:bg-neutral-700"
                >
                  <a href="#!">
                    <img
                      width={"100%"}
                      className="rounded-t-lg min-h-[160px]"
                      src={`${item.imageurl}`}
                      alt=""
                    />
                  </a>
                  <div className="p-10">
                    {/* <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    Card title
                  </h5>
                 */}
                    <TERipple>
                      <a
                        href={`${item.portfoilourl}`}
                        type="button"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Open
                      </a>
                    </TERipple>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {!data && (
          <h3 className="font-bold text-center md:text-3xl">
            No Data Available.
          </h3>
        )}
      </div>
      <div className="relative text-sm text-center my-2 md:my-4 font-bold tracking-wider group">
        {pageNumber.length > 0 && (
          <p>
            {currentPage} 0f {pageNumber.length}{" "}
            {pageNumber.length > 1 ? "pages" : "page"}
          </p>
        )}
        <div className="my-2 md:my-5">
          <Splide
            options={{
              drag: "free",
              pagination: false,
              perPage: 5,
              perMove: 3,
              gap: "20px",
              focus: "center",
              trimSpace: false,
              arrows: pageNumber.length > 1 ? true : false,
              breakpoints: {
                768: {
                  perPage: 4,
                  perMove: 2,
                  gap: "10px",
                  focus: "none",
                  trimSpace: pageNumber.length > 1 && true,
                },
              },
            }}
            className=""
          >
            {pageNumber.map((num) => (
              <SplideSlide key={num}>
                <button
                  onClick={() => setCurrentPage(num)}
                  key={num}
                  className={`${
                    currentPage === num &&
                    "bg-BLUE text-white px-3 py-2 rounded-md"
                  } px-3 py-2 text-sm md:text-base font-bold`}
                >
                  {num}
                </button>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  );
};

export default GetPortfoilo;
