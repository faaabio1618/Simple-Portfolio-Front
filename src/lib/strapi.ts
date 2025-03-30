import pkg from '@apollo/client';
const {ApolloClient, gql, InMemoryCache} = pkg;
import type Portfolio from "../interfaces/Portfolio.ts";

interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
                                              endpoint,
                                              query,
                                              wrappedByKey,
                                              wrappedByList,
                                          }: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }
    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    const res = await fetch(url.toString());
    let data = await res.json();
    console.log(JSON.stringify(data, null, 2));

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    if (wrappedByList) {
        data = data[0];
    }

    return data as T;
}

const client = new ApolloClient({
    uri: `${import.meta.env.STRAPI_URL}/graphql`,
    cache: new InMemoryCache(),
});

export async function retrievePortfolio(id: string): Promise<Portfolio> {
    const query = gql`
        query Portfolio($documentId: ID!, $status: PublicationStatus) {
            portfolio(documentId: $documentId, status: $status) {
                Title
                Galleries {
                    Title
                    id : documentId
                    Slug
                    Cover {
                        alternativeText
                        width
                        height
                        url
                        previewUrl
                        caption
                        formats
                    }
                    Pictures {
                        alternativeText
                        width
                        height
                        url
                        previewUrl
                        caption
                        formats
                    }

                }
            }
        }`
    const variables = {
        documentId: id,
        status: "PUBLISHED"
    };

    const {data} = await client.query({
        query,
        variables,
    });
    console.log(JSON.stringify(data, null, 2));
    return data.portfolio as Portfolio;
}

