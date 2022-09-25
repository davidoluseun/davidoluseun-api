import config from "config";

function appConfig() {
  if (!config.get("db")) {
    throw new Error("FATAL ERROR: db is not defined.");
  }

  if (!config.get("OAuthClientId")) {
    throw new Error("FATAL ERROR: OAuthClientId is not defined.");
  }

  if (!config.get("OAuthClientSecret")) {
    throw new Error("FATAL ERROR: OAuthClientSecret is not defined.");
  }

  if (!config.get("OAuthRefreshToken")) {
    throw new Error("FATAL ERROR: OAuthRefreshToken is not defined.");
  }

  if (!config.get("accessEmail")) {
    throw new Error("FATAL ERROR: accessEmail is not defined.");
  }
}

export default appConfig;
