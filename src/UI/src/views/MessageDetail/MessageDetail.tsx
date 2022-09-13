import React from "react";
import { useParams } from "react-router-dom";
import { Nav } from "../../components";

const MessageDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <Nav />
      <div>{id}</div>
    </>
  );
};

export default MessageDetail;
