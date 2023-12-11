import Search from "../assets/search";
import React, { ChangeEvent, useState } from "react";

const SearchBox: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full p-2">
      <div className="pl-2 w-full">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Agrega este evento
          className="p-2 border rounded w-full h-full"
        />
      </div>
      <button
        onClick={handleSearch}
        className={`px-2 py-2 ml-2 bg-blue-500 text-white rounded h-full`}
      >
        <Search color="#ffffff" />
      </button>
    </div>
  );
};

export default SearchBox;
