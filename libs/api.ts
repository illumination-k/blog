import { DefaultApi, Configuration, ConfigurationParameters } from "./axios";

const basePath = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

const conf: ConfigurationParameters = {
  basePath: basePath,
};

const Config = new Configuration(conf);
const Api = new DefaultApi(Config);

export default Api;
