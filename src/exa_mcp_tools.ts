import { Type } from "typebox";

export const EXA_MCP_TOOLS = [
  {
    name: "web_search_exa",
    description:
      "Search the web for current information and return clean content from the most relevant results.",
    promptSnippet:
      "Search the web for current information and return clean result content",
    promptGuidelines: [
      "Use web_search_exa for simple web searches, current information, news, facts, people, companies, or answering questions about any topic.",
    ],
    parameters: Type.Object(
      {
        query: Type.String({
          minLength: 1,
          description:
            "A semantically rich description of the ideal page, not just keywords.",
        }),
        objective: Type.String({
          minLength: 1,
          maxLength: 4096,
          description:
            "Which documents should rank first, which should be excluded, and which facts to extract.",
        }),
        numResults: Type.Optional(
          Type.Number({ description: "Number of results to return." }),
        ),
      },
      { additionalProperties: false },
    ),
  },
  {
    name: "web_search_advanced_exa",
    description:
      "Advanced web search with explicit filters for domains, dates, categories, result freshness, and extracted content.",
    promptSnippet:
      "Search the web with advanced domain, date, category, freshness, and content filters",
    promptGuidelines: [
      "Use web_search_advanced_exa only when the request needs filters or content controls that web_search_exa does not provide.",
    ],
    parameters: Type.Object(
      {
        query: Type.String({
          minLength: 1,
          description: "Search query, question, statement, or keywords.",
        }),
        additionalQueries: Type.Optional(
          Type.Array(Type.String(), {
            description: "Additional query variations to expand coverage.",
          }),
        ),
        category: Type.Optional(
          Type.Union(
            [
              Type.Literal("company"),
              Type.Literal("publication"),
              Type.Literal("news"),
              Type.Literal("pdf"),
              Type.Literal("github"),
              Type.Literal("personal site"),
              Type.Literal("people"),
              Type.Literal("financial report"),
            ],
            { description: "Result category." },
          ),
        ),
        contextMaxCharacters: Type.Optional(
          Type.Number({
            minimum: 1,
            description: "Maximum characters in the optional context string.",
          }),
        ),
        enableHighlights: Type.Optional(
          Type.Boolean({ description: "Enable highlight extraction." }),
        ),
        enableSummary: Type.Optional(
          Type.Boolean({ description: "Enable result summaries." }),
        ),
        endCrawlDate: Type.Optional(
          Type.String({
            description: "Include results crawled before this ISO date.",
          }),
        ),
        endPublishedDate: Type.Optional(
          Type.String({
            description: "Include results published before this ISO date.",
          }),
        ),
        excludeDomains: Type.Optional(
          Type.Array(Type.String(), {
            description: "Domains to exclude.",
          }),
        ),
        excludeText: Type.Optional(
          Type.Array(Type.String(), {
            description: "Exclude results containing any of these strings.",
          }),
        ),
        highlightsMaxCharacters: Type.Optional(
          Type.Number({
            description: "Maximum total highlight characters per URL.",
          }),
        ),
        highlightsNumSentences: Type.Optional(
          Type.Number({
            description:
              "Deprecated sentence-based highlight limit; prefer highlightsMaxCharacters.",
          }),
        ),
        highlightsPerUrl: Type.Optional(
          Type.Number({
            description:
              "Deprecated and ignored by the server; prefer highlightsMaxCharacters.",
          }),
        ),
        highlightsQuery: Type.Optional(
          Type.String({ description: "Query used to rank highlights." }),
        ),
        includeDomains: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only return results from these domains.",
          }),
        ),
        includeText: Type.Optional(
          Type.Array(Type.String(), {
            description: "Only return results containing all these strings.",
          }),
        ),
        livecrawlTimeout: Type.Optional(
          Type.Number({
            description: "Timeout in milliseconds for fetching fresh content.",
          }),
        ),
        maxAgeHours: Type.Optional(
          Type.Number({
            description:
              "Maximum cached-content age in hours; zero always fetches fresh content.",
          }),
        ),
        moderation: Type.Optional(
          Type.Boolean({ description: "Filter unsafe or inappropriate content." }),
        ),
        numResults: Type.Optional(
          Type.Number({
            minimum: 1,
            maximum: 100,
            description: "Number of results to return.",
          }),
        ),
        startCrawlDate: Type.Optional(
          Type.String({
            description: "Include results crawled after this ISO date.",
          }),
        ),
        startPublishedDate: Type.Optional(
          Type.String({
            description: "Include results published after this ISO date.",
          }),
        ),
        subpageTarget: Type.Optional(
          Type.Array(Type.String(), {
            description: "Keywords used to select relevant subpages.",
          }),
        ),
        subpages: Type.Optional(
          Type.Number({
            minimum: 1,
            maximum: 10,
            description: "Number of subpages to crawl per result.",
          }),
        ),
        summaryQuery: Type.Optional(
          Type.String({ description: "Focus query for result summaries." }),
        ),
        textMaxCharacters: Type.Optional(
          Type.Number({
            minimum: 1,
            description: "Maximum extracted text characters per result.",
          }),
        ),
        type: Type.Optional(
          Type.Union(
            [
              Type.Literal("auto"),
              Type.Literal("fast"),
              Type.Literal("instant"),
            ],
            { description: "Search speed and quality mode." },
          ),
        ),
        userLocation: Type.Optional(
          Type.String({
            description: "ISO country code used for geographic targeting.",
          }),
        ),
      },
      { additionalProperties: false },
    ),
  },
  {
    name: "web_fetch_exa",
    description:
      "Read one or more known webpages and return their content as clean markdown.",
    promptSnippet:
      "Fetch full clean markdown content from known webpage URLs",
    promptGuidelines: [
      "Use web_fetch_exa to read full clean markdown content from known webpage URLs.",
    ],
    parameters: Type.Object(
      {
        urls: Type.Array(Type.String(), {
          description: "Webpage URLs to read in one batch.",
        }),
        maxCharacters: Type.Optional(
          Type.Number({
            minimum: 1,
            description: "Maximum extracted characters per page.",
          }),
        ),
      },
      { additionalProperties: false },
    ),
  },
] as const;

export type ExaMcpToolName = (typeof EXA_MCP_TOOLS)[number]["name"];

export const EXA_MCP_TOOL_NAMES = EXA_MCP_TOOLS.map(
  (tool) => tool.name,
) as ExaMcpToolName[];
