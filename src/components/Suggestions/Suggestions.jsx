import React from "react";
import { Divider, List } from "antd";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getSuggestions } from "../../app/reducer";
import constants from "../../helpers/constants";

const { TITLES, TYPES } = constants;

export function Suggestions({ handleClick }) {
  const suggestions = useSelector(getSuggestions);
  const { movies, actors, shows } = suggestions;

  const renderList = (title, type, arr) => {
    const newarr = arr.slice(0, 3);
    if (newarr.length) {
      return (
        <>
          <Divider orientation="left">{title}</Divider>
          <List
            bordered
            dataSource={newarr}
            renderItem={(item) => (
              <List.Item onClick={() => handleClick(`/${type}/${item.id}`)}>
                {item.title || item.name}
              </List.Item>
            )}
          />
        </>
      );
    }
    return <></>;
  };

  return (
    <div>
      <>
        {renderList(TITLES.MOVIE, TYPES.MOVIE, movies)}
        {renderList(TITLES.TV, TYPES.TV, shows)}
        {renderList(TITLES.CAST, TYPES.CAST, actors)}
      </>
    </div>
  );
}

Suggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
