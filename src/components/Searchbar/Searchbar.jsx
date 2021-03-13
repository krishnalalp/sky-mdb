import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { multiSearch } from "../../app/reducer";
import constants from "../../helpers/constants";
import { Suggestions } from "../Suggestions/Suggestions";

import "./Searchbar.scss";

export function Search() {
  const appHistory = useHistory();
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const node = useRef();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(constants.DEFAULT_SEARCH_OPTION);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    if (keyword.length > constants.MIN_SEARCH_LENGTH) {
      dispatch(multiSearch(keyword, searchOption, true));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (path) => {
    appHistory.push(path);
    setShowSuggestions(false);
  };

  const initiateSearch = (option) => {
    if (searchTerm) {
      appHistory.push(`/search?query=${searchTerm}&options=${option}`);
    }
    if (!searchTerm) {
      appHistory.push("/");
    }
  };

  const submitSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    initiateSearch(searchOption);
  };

  const onSearchOptionChange = (e) => {
    const { value } = e.target;
    setSearchOption(value);
    initiateSearch(value);
  };

  useEffect(() => {
    const keyword = location.search.split("&")[0].split("=")[1];
    const option = location.search.split("options=")[1] || "multi";
    setSearchOption(option);
    if (keyword) {
      setSearchTerm(decodeURIComponent(keyword));
    }
    if (isHomepage) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="searchbar" ref={node}>
      <form onSubmit={(e) => submitSearch(e)}>
        <div className="textbox-wrapper">
          <input
            ref={inputRef}
            className="textbox"
            aria-label="Search here"
            placeholder="Movies, TV Shows, Cast"
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
