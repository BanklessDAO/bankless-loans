import { NetworkProvider } from "./NetworkProvider";
import { GraphQLAPIClient } from "./graph/interface/GraphQLAPIClient";
import TheGraphAPIClient from "./graph/implementation/TheGraphAPIClient";
import TheGraphAPIMapper from "./graph/implementation/TheGraphAPIMapper";

class DefaultNetworkProvider implements NetworkProvider {
  graph(): GraphQLAPIClient {
    return new TheGraphAPIClient(
      new TheGraphAPIMapper()
    )
  }
}

export default DefaultNetworkProvider