import { useState } from "react"
import { GetEmployees } from "../../services/getApis"
import { UserList } from "../List/UserList"
import SearchBar from "./SearchBar"

const SelectList=()=>{
    const [options, setOptions] = useState(GetEmployees())
    const [filteredOptions, setFilteredOptions] = useState([]);
    const updateOptions =(index)=>{
        setOptions(options.filter((_, i) => i!== index))
    }
    const handleSearch = (searchTerm) => {
        // Filter the options based on the search term
        const result = options.filter((option) =>
          option.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
        // Update the options state with the filtered options
        setFilteredOptions(result);
    }
return(<>

<SearchBar onInput={handleSearch} />
      <div
        className="overflow-auto max-vh-100 mt-2"
        style={{ maxHeight: "calc(100vh - 275px)" }}
      >
        <UserList
          leadingElement={true}
          userlist={filteredOptions.length>0 ? filteredOptions : options}
          trailingElement={true}
        />
      </div></>)
}
export default SelectList