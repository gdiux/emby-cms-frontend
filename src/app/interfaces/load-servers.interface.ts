import { Server } from "../models/servers.model";

export interface LoadServers {
    ok: boolean,
    servers: Server[],
    total: number
}