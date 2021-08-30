import ServiceProvider from "./ServiceProvider";
import DiscoveryService from "./discovery/interface/DiscoveryService";
import DefaultDiscoveryService from "./discovery/implementation/DefaultDiscoveryService";
import { GraphQLAPIClient } from "../data/network/graph/interface/GraphQLAPIClient";

class DefaultServiceProvider implements ServiceProvider {
  discovery(
    graph: GraphQLAPIClient
  ): DiscoveryService {
    return new DefaultDiscoveryService(
      graph
    )
  }
}

export default DefaultServiceProvider