export const COLUMNS = [
    {
        accessorKey: `date`,
        header: "Date",
        cell: (props)=> <p>{props.getValue()}</p>
    },
    {
        accessorKey: `description`,
        header: "Description",
        cell: (props)=> <p>{props.getValue()}</p>
    },
    {
        accessorKey: `url`,
        header: "Url",
        cell: (props)=> <p>{props.getValue()}</p>
    },
]