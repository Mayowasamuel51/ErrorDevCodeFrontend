import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import UrlFetch from "../hooks/FetchUrl";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ServerErrorPage from "../ServerErrorPage";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "@splidejs/react-splide/css";
import moment from "moment";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper()


const defaultColumns = [
  columnHelper.accessor(row => row.date, {
    id: 'date',
    cell: info => <p>{moment(info.getValue()).format("YYYY-MM-DD")}</p>,
    header: () => <span>DATE</span>,
  }),
  columnHelper.accessor(row => row.url, {
    id: 'url',
    cell: info => <p>{info.getValue()}</p>,
    header: () => <span>WEBSITE URL</span>,
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    cell: info => <p>{info.getValue()}</p>,
    header: () => <span>DESCRIPTION</span>,
  }),
]

const UrlPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const { data: urls, isLoading, error } = UrlFetch();

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const paginatedData = urls?.data?.response?.slice(
    firstPostIndex,
    lastPostIndex
  );

  const length = urls?.data?.response?.length ?? 1;

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    pageNumber.push(i);
  }

    const URLS = urls?.data?.response

    const columnDef = useMemo(()=> URLS, [])
    const table = useReactTable({
        data: columnDef,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


  if (error)
    return (
      <p className="text-center text-red-500 md:text-3xl font-black">
        {error.message}
      </p>
    );
  if (isLoading) return <Loader />;
  if (urls?.status === 500) return <ServerErrorPage />;

    return (
        <div className="">
            <table className='dashboard table-auto w-full'>
                <thead className=''>
                    <tr className='font-black text-left'>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2'>Date</th>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2'>Website Url </th>
                        <th className='text-sm md:text-base tracking-wide p-1 md:p-2 hidden md:block'>Description</th>
                    </tr>
                </thead>
                <tbody className='tbody'>
                    {paginatedData?.map((info, index) => (
                        <tr key={index} className=''>
                            <td data-cell="Registration Date" className='text-[13px] leading-7 md:text-sm font-medium  p-1 md:p-2'>   {moment(info.date)
                                .utc()
                                .format("YYYY-MM-DD")}</td>
                            <td data-cell="Student Name" className='text-[13px] leading-7 md:text-sm font-medium  p-1 md:p-2'><a href={`${info.url}`}>{info.url}</a></td>
                            <td data-cell="Email Address" className='text-[13px] leading-7 md:text-sm font-medium  p-1 hidden md:block md:p-2'>{info.description}</td>
                            {/* <td className='text-[13px] leading-7 md:text-sm font-medium  p-1 md:p-2'><IoEyeSharp size={20} /></td>
                            <td className='text-[13px] leading-7 md:text-sm font-medium  p-1 md:p-2'><FaTrash size={20} /></td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {!urls && <h3 className="font-bold text-center md:text-3xl">No Data Available.</h3>}
            </div>
            <div className='relative text-sm text-center my-2 md:my-4 font-bold tracking-wider group'>
                {pageNumber.length > 0 && <p>{currentPage} 0f {pageNumber?.length} {pageNumber?.length > 1 ? "pages" : "page" }</p>}
                <div className="my-2 md:my-5">
                    <Splide options={{
                        drag: "free",
                        pagination: false,
                        perPage: 5,
                        perMove: 3,
                        gap: "20px",
                        focus : 'center',
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
                        }
                    }} className="">
                        {pageNumber.map((num) => (
                            <SplideSlide key={num}><button onClick={() => setCurrentPage(num)} key={num} className={`${currentPage === num && "bg-BLUE text-white px-3 py-2 rounded-md"} px-3 py-2 text-sm md:text-base font-bold`}>{num}</button></SplideSlide>
                        ))}
                    </Splide>
                </div>
            </div>
            <table className="table w-full border-2 border-black">
                <thead>
                    {table?.getHeaderGroups()?.map((headerEl)=> (
                        <tr key={headerEl.id}>
                            {headerEl?.headers.map((header)=> (
                                <th key={header.id} colSpan={header.colSpan} className="bg-black text-white py-2">{flexRender(header.column.columnDef.header, header.getContext())}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                {table?.getRowModel()?.rows.map((row)=> (
                    <tr key={row.id} >
                        {row?.getVisibleCells().map((cell)=> (
                            <td key={cell.id} colSpan={cell.colSpan} className="text-center py-2">{
                                flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )
                            }</td>
                        ))}
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}

export default UrlPagination;
