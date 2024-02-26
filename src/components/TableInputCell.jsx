import {useState, useEffect} from 'react'
import Input from '@mui/joy/Input';



const TableInputCell = ({getValue, table}) => {

  const initialValue = getValue()

  const [value, setValue] = useState(initialValue)
  const handleChange = (e)=> {
    setValue(e.target.value)
  }

  // Trigger the update with an input onBlur
  const ONBLUR = ()=> {
    table.options.meta?.updateDatas
  }

  useEffect(()=> {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Input
      onChange={handleChange}
      value={value}
      variant='filled'
      size='sm'
      sx={{ width: 256 }}
      onBlur={ONBLUR}
    />
  )
}

export default TableInputCell;