// import gql from "graphql-tag";
//import { Query } from "react-apollo";
import React from "react";
import { useQuery, gql } from "@apollo/client";

interface IViewer {
  name: string;
  avatarUrl: string;
}

interface IQueryResult {
  viewer: IViewer;
}

const GET_VIEWER = gql`
  {
    viewer {
      name
      avatarUrl
    }
  }
`;

//class GetViewerQuery extends Query<IQueryResult> {}

export const GitHubInfoApollo: React.FC = () => {
  const { loading, data, error } = useQuery<IQueryResult>(GET_VIEWER);
  return (
    <div>
      {error ? <div className="viewer">{error.toString()}</div> : null}

      {loading ? (
        <div className="viewer">Loading ...</div>
      ) : !data ? null : (
        <div>
          <img src={data.viewer.avatarUrl} className="avatar" alt="avatar" />
          <div className="viewer">{data.viewer.name}</div>
          <h1>GitHub Search</h1>
        </div>
      )}
    </div>
  );
};
