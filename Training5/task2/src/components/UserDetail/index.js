import React from "react";
import "./UserDetail.css";

const _UserDetail = ({ data = {} }) => {
  const { fullName, email, password, id, role } = data;
  return (
    <div className="user-detail-container">
      <div name="row-flex">
        <span className="user-detail-title">Id: </span>
        <span className="user-detail-value">{id}</span>
      </div>
      <div name="row-flex">
        <span className="user-detail-title">Full name: </span>
        <span className="user-detail-value">{fullName}</span>
      </div>
      <div name="row-flex">
        <span className="user-detail-title">Email: </span>
        <span className="user-detail-value">{email}</span>
      </div>
      <div name="row-flex">
        <span className="user-detail-title">Password: </span>
        <span className="user-detail-value">{password}</span>
      </div>
      <div name="row-flex">
        <span className="user-detail-title">Role: </span>
        <span className="user-detail-value">{role}</span>
      </div>
    </div>
  );
};

export const UserDetail = React.memo(_UserDetail);
