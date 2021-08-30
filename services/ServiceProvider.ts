import { GraphQLAPIClient } from "../data/network/graph/interface/GraphQLAPIClient";
import DiscoveryService from "./discovery/interface/DiscoveryService";

interface ServiceProvider {
  discovery(
    graph: GraphQLAPIClient
  ): DiscoveryService
}

export default ServiceProvider