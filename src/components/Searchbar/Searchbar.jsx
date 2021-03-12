import { Button, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import constants from "../../helpers/constants";
import { multiSearch } from "../../app/reducer";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Suggestions } from "../Suggestions/Suggestions";

export function Search() {
  const appHistory = useHistory();
  const node = useRef();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("multi");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    if(keyword.length > constants.MIN_SEARCH_LENGTH) {
      dispatch(multiSearch(keyword, searchOption, true));
    } else {
      setShowSuggestions(false);
    }
  }

  const handleSuggestionClick =(path) => {
    appHistory.push(path);
    setShowSuggestions(false);
  }

  const submitSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    initiateSearch(searchOption);
  }

  const onSearchOptionChange = (e) => {
    const { value } = e.target;
    setSearchOption(value);
    initiateSearch(value);
  };

  const initiateSearch = (option) => {
    if(searchTerm) {
      appHistory.push(`/search?query=${searchTerm}&options=${option}`);
    }
    if (!searchTerm) {
      appHistory.push("/");
    }
  }

  return (
    <div className="searchbar" ref={node}>
      <form>
        <div className="textbox-wrapper">
          <input 
            ref={inputRef}
            className="textbox"
            aria-label="Search here"
            placeholder="Movies, TV Series, Cast"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button 
          onClick={(e) => submitSearch(e)}
          type="primary"
          shape="circle"
          className="search-button"
          icon={<SearchOutlined />}
        />
        {showSuggestions && (
          <div className="suggestions-wrapper">
            <Suggestions handleClick={handleSuggestionClick} />
          </div>
        )}
      </form>
      <Radio.Group 
        options={constants.SEARCH_OPTIONS}
        onChange={onSearchOptionChange}
        value={searchOption}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
}