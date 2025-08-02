import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const MultiInput = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setData(props.options);
  });
  const [search, setSearch] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    setSearch("");

    if (val === "$create") {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatch(updateFilter({[props.title]:[...value,search]}))
    } else {
      dispatch(updateFilter({[props.title]:value.includes(val)?value.filter((v)=>v!== val):[...value,val]}))
      setValue((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val]

      );
    }
  };

  const handleValueRemove = (val: string) =>{
      dispatch(updateFilter({[props.title]:value.filter((v)=>v!==val)}))
    setValue((current) => current.filter((v) => v !== val));
  }
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="font-['poppins']" ref={dropdownRef}>
      <div
        className="flex items-center rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bg-gray-800 text-yellow-400 p-1 rounded-full mr-2">
          <props.icon size={16} />
        </div>
        <div className="flex flex-wrap gap-1 flex-1">
          {value.length > 0 ? (
            <>
              <span className="bg-gray-900 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                {value[0]}
                <button onClick={() => handleValueRemove(value[0])}>×</button>
              </span>
              {value.length > 1 && (
                <span className="bg-gray-900 px-2 py-1 rounded-full text-sm">
                  +{value.length - 1} more
                </span>
              )}
            </>
          ) : (
            <span className="text-mine-shaft-300 mr-2">{props.title}</span>
          )}
        </div>
        <div className="text-mine-shaft-500">
          <ChevronsUpDown className=""/>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 rounded-md shadow-xl max-h-60 overflow-y-auto  bg-mine-shaft-950">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={props.title}
            className="bg-mine-shaft-900 border mt-3 border-bright-sun-400 w-full px-2 py-1 outline-none"
          />
          <div>
            {filteredData.map((item) => (
              <div
                key={item}
                onClick={() => handleValueSelect(item)}
                className="px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-900 "
              >
                <span>{item}</span>
                <input
                  type="checkbox"
                  checked={value.includes(item)}
                  readOnly
                  className="accent-yellow-400"
                />
              </div>
            ))}
            {!exactOptionMatch && search.trim().length > 0 && (
              <div
                onClick={() => handleValueSelect("$create")}
                className="px-3 py-2 cursor-pointer hover:bg-gray-800 text-blue-500"
              >
                + Create "{search}"
              </div>
            )}
            {exactOptionMatch && filteredData.length === 0 && (
              <div className="px-3 py-2 text-gray-400 text-sm">
                Nothing found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiInput;
