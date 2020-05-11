
export interface ApiPermission {
    api_endpoints: Array<string|RegExp>,
    permission_identifier: string;
    descriptions?: string
}