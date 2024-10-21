import React from "react";
//@ts-ignore
import { Alert } from "digitinary-ui";

const AlertComponent = ({ userNotFount }: { userNotFount: boolean }) => {
  return (
    <div>
      {userNotFount ? (
        <Alert color="error">
          <span className="search-note">The user Not exist.</span>
        </Alert>
      ) : (
        <Alert color="info">
          <span className="search-note">
            Fill one of the following fields and click “Search” to get results.
          </span>
        </Alert>
      )}
    </div>
  );
};

export default AlertComponent;
