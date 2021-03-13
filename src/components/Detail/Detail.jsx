import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Descriptions, Typography } from "antd";
import PropTypes from "prop-types";
import { getSelectedResource, searchDetail } from "../../app/reducer";
import { Card } from "../Card/Card";
import "./Detail.scss";
import { renderImage, renderText } from "../../helpers/render.helper";
import { mapDetails } from "./detail.helper";

const { Title } = Typography;

export const Detail = ({ resource }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pathname } = useLocation();
  const resourceDetails = useSelector(getSelectedResource);
  const [mappedResource, setMappedResource] = useState({});

  useEffect(() => {
    setMappedResource({});
    const { id } = params;
    if (id) {
      dispatch(searchDetail(resource, id));
    }
  }, [params, pathname]);

  useEffect(() => {
    if (resourceDetails && Object.keys(resourceDetails).length > 0) {
      setMappedResource(mapDetails(resourceDetails, resource));
    } else {
      setMappedResource({});
    }
  }, [resourceDetails]);

  return (
    <div>
      {Object.keys(mappedResource).length > 0 && (
        <>
          <Title level={4}>{renderText(mappedResource.title)}</Title>
          <div className="image">
            <img
              alt={renderText(mappedResource.title)}
              src={renderImage(mappedResource.poster)}
            />
          </div>
          <Descriptions title="" bordered>
            {mappedResource.description.map((desc) => (
              <Descriptions.Item key={desc.label} label={desc.label}>
                {renderText(desc.value)}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <div className="extra-details">
            <Title level={4}>
              {renderText(mappedResource.extraDetails.title)}
            </Title>
            <div className="results-row">
              {mappedResource.extraDetails.data.map((item) => (
                <Card
                  key={item.id}
                  type={mappedResource.extraDetails.type}
                  data={item}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Detail.propTypes = {
  resource: PropTypes.string.isRequired,
};
