import * as React from "react";
import { GitHubInfo } from "./GitHubInfo";
import { GitHubInfoApollo } from "./GitHubInfoApollo";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <GitHubInfoApollo />
    </div>
  );
};
