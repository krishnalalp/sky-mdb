import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import constants from "../../helpers/constants";

import "./Card.scss";

const { TYPES } = constants;

export function Card({ type, data }) {
  const renderItem = (itemType, id, title, image) => (
    <Link to={`/${itemType}/${id}`}>
      <div className="card">
        <div
          className="card-cover"
          style={
            image
              ? {
                  backgroundImage: `url('${constants.IMAGE_BASE_URL}${image}')`,
                }
              : { backgroundImage: `url('${constants.DEFAULT_IMAGE}')` }
          }
        />
        <div className="card-body">
          <div className="card-detail">
            <div className="card-title">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );

  const renderSearchItem = () => {
    const { title, name, poster_path, profile_path, id } = data;
    if (type === TYPES.CAST) {
      return renderItem(TYPES.CAST, id, name, profile_path);
    }
    if (type === TYPES.TV) {
      return renderItem(TYPES.TV, id, name, poster_path);
    }
    return renderItem(TYPES.MOVIE, id, title, poster_path);
  };

  return <div className="search-item">{renderSearchItem()}</div>;
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
