import React from "react";
import SearchBar from "@theme-original/SearchBar";
import AskCookbook from "@cookbookdev/docsbot/react";
import BrowserOnly from "@docusaurus/BrowserOnly";

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmNlMzNlMzYxODYyYTM3ZDhhZTQ1M2YiLCJpYXQiOjE3MjQ3ODk3MzEsImV4cCI6MjA0MDM2NTczMX0._v5kn1HFfeWe9ikSAhStsLMyQPvIeKCvS6hT4pBwYbs";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <BrowserOnly>{() => <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />}</BrowserOnly>
    </>
  );
}
