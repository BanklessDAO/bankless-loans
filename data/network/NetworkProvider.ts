import { GraphQLAPIClient } from "./graph/interface/GraphQLAPIClient";

export interface NetworkProvider {
  graph(): GraphQLAPIClient
}