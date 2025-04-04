import pkg from '@apollo/client';

const {ApolloClient, gql, InMemoryCache} = pkg;
import type Portfolio from "../interfaces/Portfolio.ts";
import type Photographer from "../interfaces/Photographer.ts";
import type HeaderType from "../interfaces/Header.ts";
import type Gallery from "../interfaces/Gallery.ts";

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
    try {
        let data = await res.json();

        if (wrappedByKey) {
            data = data[wrappedByKey];
        }

        if (wrappedByList) {
            data = data[0];
        }
        //console.log(JSON.stringify(data, null, 2));
        return data as T;
    } catch (e) {
        console.error(res.status, res.statusText);
        console.error("Error parsing JSON:", e);
        throw e;
    }

}

const client = new ApolloClient({
    uri: `${import.meta.env.STRAPI_URL}/graphql`,
    cache: new InMemoryCache(),
});

export async function retrievePhotographer(): Promise<Photographer> {
    let photographer = await fetchApi({
        endpoint: '/photographer?populate=*',
        wrappedByKey: "data",
    }) as Photographer;
    // console.log(photographer);
    return photographer;
}

export async function retrieveHeader(): Promise<HeaderType> {
    return await fetchApi<HeaderType>({
        endpoint: '/header?populate=*',
        wrappedByKey: "data",
    });
}

export async function retrieveGallery(slug: string | undefined): Promise<Gallery | null> {
    if (!slug) {
        return null;
    }
    const galleries = await fetchApi<Gallery[] | null>({
        endpoint: `/galleries?filters[Slug][$eq]=${slug}&populate=*`,
        wrappedByKey: "data",
    });
    return galleries && galleries.length > 0 ? galleries[0] : null;
}

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

    try {
        const res = await fetch(`${import.meta.env.STRAPI_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query.loc?.source?.body || String(query),
                variables,
            }),
        });
        // console.log("Headers:", res.headers);
        const jsonResponse = await res.json();
        return jsonResponse.data.portfolio as Portfolio;
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        throw error;
    }

}

