import { Client } from "@modelcontextprotocol/sdk/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp";
import { EXA_MCP_TOOL_NAMES, type ExaMcpToolName } from "./exa_mcp_tools";

const EXA_MCP_SERVER = "https://mcp.exa.ai/mcp";
const EXA_MCP_CONNECT_TIMEOUT_MS = 15_000;
const EXA_MCP_REQUEST_TIMEOUT_MS = 60_000;

let exaMcpClientPromise: Promise<Client> | undefined;

function getExaMcp(apiKey?: string): Promise<Client> {
  if (!exaMcpClientPromise) {
    const clientPromise = (async () => {
      const exaMcpUrl = new URL(EXA_MCP_SERVER);
      exaMcpUrl.searchParams.set("tools", EXA_MCP_TOOL_NAMES.join(","));
      if (apiKey) {
        exaMcpUrl.searchParams.set("exaApiKey", apiKey);
      }

      const transport = new StreamableHTTPClientTransport(exaMcpUrl);
      const client = new Client(
        { name: "pi-exa", version: "0.1.0" },
        { capabilities: {} },
      );

      await client.connect(transport, {
        timeout: EXA_MCP_CONNECT_TIMEOUT_MS,
        maxTotalTimeout: EXA_MCP_CONNECT_TIMEOUT_MS,
      });
      return client;
    })();

    exaMcpClientPromise = clientPromise.catch((err) => {
      if (clientPromise === exaMcpClientPromise) {
        exaMcpClientPromise = undefined;
      }
      throw err;
    });
  }

  return exaMcpClientPromise;
}

export async function callExaMcpTool(
  name: ExaMcpToolName,
  args: Record<string, unknown>,
  apiKey?: string,
  signal?: AbortSignal,
) {
  if (!EXA_MCP_TOOL_NAMES.includes(name)) {
    throw new Error(`Refusing to call unrecognized Exa MCP tool: ${name}`);
  }

  const client = await getExaMcp(apiKey);
  return client.callTool(
    { name, arguments: args },
    undefined,
    {
      signal,
      timeout: EXA_MCP_REQUEST_TIMEOUT_MS,
      maxTotalTimeout: EXA_MCP_REQUEST_TIMEOUT_MS,
    },
  );
}

export async function checkExaMcp(apiKey?: string) {
  const client = await getExaMcp(apiKey);
  await client.ping({
    timeout: EXA_MCP_CONNECT_TIMEOUT_MS,
    maxTotalTimeout: EXA_MCP_CONNECT_TIMEOUT_MS,
  });
}

export async function closeExaMcp() {
  if (!exaMcpClientPromise) {
    return;
  }

  const clientPromise = exaMcpClientPromise;
  exaMcpClientPromise = undefined;
  const client = await clientPromise.catch(() => undefined);
  await client?.close();
}
