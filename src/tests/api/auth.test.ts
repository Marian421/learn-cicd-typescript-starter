import { describe, expect, test } from "vitest";
import { getAPIKey } from "../../api/auth.ts";
import { IncomingHttpHeaders } from "http";

const headers: IncomingHttpHeaders = {
  "authorization" : "ApiKey dksalfjklasjf"
};

const headersWithExtraSpaces: IncomingHttpHeaders = {
  "authorization" : "ApiKey    dksalfjklasjf"
};

const headersWithoutApiKey: IncomingHttpHeaders = {
  "authorization" : "NotAnApiKey dksalfjklasjf"
};

const headersWithMissingApiKey: IncomingHttpHeaders = {
  "authorization" : "ApiKey"
};

const headersWithoutAuthorization: IncomingHttpHeaders = {
  "accept" : "ok",
  "cookie" : "string"
};

describe("auth", () => {
  test("Headers contain the ApiKey", () => {
    expect(getAPIKey(headers)).toBe("dksalfjklasjf");
  });
  
  test("Headers do not contain an ApiKey", () => {
    expect(getAPIKey(headersWithoutApiKey)).toBe(null);
  });

  test("Headers with missing ApiKey value or tag", () => {
    expect(getAPIKey(headersWithMissingApiKey)).toBe(null);
  });

  test("Headers miss the authorization tag", () => {
    expect(getAPIKey(headersWithoutAuthorization)).toBe(null);
  });
  
  //test("Returns the ApiKey if there are extra spaces between values", () => {
   // expect(getAPIKey(headersWithExtraSpaces)).toBe("dksalfjklasjf");
  //});
});
