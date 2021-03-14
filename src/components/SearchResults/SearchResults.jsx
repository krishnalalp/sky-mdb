import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResults,
  multiSearch,
  searchRecommendations,
} from "../../app/reducer";
import { Card } from "../Card/Card";
import constants from "../../helpers/constants";
import "./SearchResults.scss";

const { Title } = Typography;
const { TITLES, TYPES } = constants;

export function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isHome, setIsHome] = useState(location.pathname === "/");

  const { movies, shows, actors } = useSelector(getSearchResults);

  /**
   * To trigger the search/recommendations API
   */
  useEffect(() => {
    const isHomePage = location.pathname === "/";
    setIsHome(isHomePage);

    if (isHomePage) {
      dispatch(searchRecommendations());
    } else {
      const keyword = location.search.split("&")[0].split("=")[1];
      const searchOption = location.search.split("options=")[1];
      dispatch(multiSearch(keyword, searchOption, false));
    }
  }, [location, dispatch]);

  const renderList = (title, type, arr) => {
    if (arr && arr.length) {
      return (
        <>
          <Title level={5}>{title}</Title>
          <div className="results-row">
            {arr.map((result) => (
              <Card key={result.id} type={type} data={result} />
            ))}
          </div>
        </>
      );
    }
    return "";
  };

  const renderNoResults = () => {
    if (
      !isHome &&
      !(
        (shows && shows.length > 0) ||
        (movies && movies.length > 0) ||
        (actors && actors.length > 0)
      )
    ) {
      return <Title level={4}>Oops! Try searching for other keywords.</Title>;
    }
    return <></>;
  };

  return (
    <div className="search-results-wrapper">
      <Title level={4}>
        {isHome ? TITLES.RECOMMENDED_MOVIES : TITLES.SEARCH_RESULTS}
      </Title>
      {renderList(TITLES.MOVIE, TYPES.MOVIE, movies)}
      {renderList(TITLES.TV, TYPES.TV, shows)}
      {renderList(TITLES.CAST, TYPES.CAST, actors)}
      {renderNoResults()}
    </div>
  );
}
