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
  const isHomePage = location.pathname === "/";
  const node = useRef();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState(
    constants.DEFAULT_SEARCH_OPTION
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  /**
   * To show suggestions when the entered text length is 5 or above
   */
  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    if (keyword.length > constants.MIN_SEARCH_LENGTH) {
      dispatch(multiSearch(keyword, searchOption, true));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  /**
   * To hide the suggestions section when clicked elsewhere in web page
   */
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShowSuggestions(false);
  };

  /**
   * To redirect to the details page when a suggestion item is clicked
   */
  const handleSuggestionClick = (path) => {
    appHistory.push(path);
    setShowSuggestions(false);
  };

  /**
   * To initiate a search/recommended movies by redirecting to the specified URL
   */
  const initiateSearch = (option) => {
    if (searchTerm) {
      appHistory.push(`/search?query=${searchTerm}&options=${option}`);
    }
    if (!searchTerm) {
      appHistory.push("/");
    }
  };

  /**
   * To initiate a search when search button is clicked or when enter is pressed
   */
  const submitSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    initiateSearch(searchOption);
  };

  /**
   * To initiate a search when the search filter changes
   */
  const onSearchOptionChange = (e) => {
    const { value } = e.target;
    setSearchOption(value);
    initiateSearch(value);
  };

  /**
   * To populate the search input field with the search term on page load
   */
  useEffect(() => {
    const keyword = location.search.split("&")[0].split("=")[1];
    const option =
      location.search.split("options=")[1] || constants.DEFAULT_SEARCH_OPTION;
    setSearchOption(option);
    if (keyword) {
      setSearchTerm(decodeURIComponent(keyword));
    }
    if (isHomePage) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * To handle the clicks outside the element
   */
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
