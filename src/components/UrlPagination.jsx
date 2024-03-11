import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import UrlFetch from "../hooks/FetchUrl";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ServerErrorPage from "../ServerErrorPage";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import "@splidejs/react-splide/css";
import moment from "moment";
import TableInputCell from "./TableInputCell";
import { FilterData } from "./FilterData";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa";

const columnHelper = createColumnHelper()

const defaultColumns = [
  columnHelper.accessor(row => row.date, {
    id: 'date',
    cell: info => <p>{moment(info.getValue()).format("YYYY-MM-DD")}</p>,
    header: () => <span className="flex justify-center items-center gap-2"><SlCalender size={20}/> DATE</span>,
  }),
  columnHelper.accessor(row => row.url, {
    id: 'url',
    cell: info => <p>{info.getValue()}</p>,
    // cell: info => <TableInputCell {...info} />,
    header: () => <span className="flex justify-center items-center gap-2"><FaLink size={20} />WEBSITE URL</span>,
  }),
  columnHelper.accessor(row => row.description, {
    id: 'description',
    cell: info => <p>{info.getValue()}</p>,
    // cell: info => <TableInputCell {...info} />,
    header: () => <span>DESCRIPTION</span>,
  }),
]

const UrlPagination = () => {
  const { data, isLoading, error } = UrlFetch()
  const [columnFilters, setcolumnFilters] = useState([])

  const table = useReactTable({
    data,
    columns: defaultColumns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    // Update the url and description
    meta: {
      updateDatas: ()=> alert("updated successfully")
    },
    getPaginationRowModel: getPaginationRowModel()
  });


  if (error)
    return (
      <p className="text-center text-red-500 md:text-3xl font-black">
        {error.message}
      </p>
    );
  if (data?.status === 500) return <ServerErrorPage />;
  if (isLoading) return <Loader />

  return (
    <div className="">
      <FilterData columnFilters={columnFilters} setcolumnFilters={setcolumnFilters} />
     {(data?.length > 0) &&
     <table className={`table w-full my-2`}>
        <thead>
          {table?.getHeaderGroups()?.map((headerEl) => (
            <tr key={headerEl.id} className="bg-[#f2f2f2]">
              {headerEl?.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: `${header.getSize()}px` }}
                  className={`font-black text-lg relative py-3`}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <div className={`resizer ${header.column.getIsResizing() && "show"} `}></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {(data?.length > 0 && !isLoading) && 
        <tbody>
          {table?.getRowModel()?.rows.map((row) => (
            <tr
              key={row?.id}
              className={`bg-[#f8fafa] border-b-[3px] border-[#f2f2f2]`}
            >
              {row?.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  colSpan={cell.colSpan}
                  className={`md:text-sm text-center py-2`}
                >
                  {flexRender(cell?.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
          }
        </tbody>}
      </table>}
      {!data?.length !== 0 && isLoading && <Loader />}      
      <Splide options={{
        drag: "free",
        pagination: false,
        perPage: 5,
        perMove: 3,
        gap: "20px",
        focus: "center",
        trimSpace: false,
        arrows: table.getPageOptions().length > 1 ? true : false,
        breakpoints: {
          768: {
            perPage: 4,
            perMove: 2,
            gap: "10px",
            focus: "none",
            trimSpace: table.getPageOptions().length > 1 && true,
          },
        }}}>
      {table.getPageOptions().map(num=> (
        <SplideSlide key={num}>
          <button onClick={()=>table.setPageIndex(num)} className={`cursor-pointer py-2 px-4 rounded-md bg-black text-white ${table.getPageCount()}`}>{num + 1}</button>
        </SplideSlide>
      ))}
      </Splide>
    </div>
  );
};


export default UrlPagination;
