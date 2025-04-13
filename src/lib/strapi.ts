import pkg, {type ApolloClientOptions} from '@apollo/client';
import type Portfolio from "../interfaces/Portfolio.ts";
import type Photographer from "../interfaces/Photographer.ts";
import type {Gallery} from "../interfaces/Gallery.ts";
import type Site from "../interfaces/Site.ts";

const {ApolloClient, gql, InMemoryCache} = pkg;

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

let options = {
    uri: `${import.meta.env.STRAPI_URL}/graphql`,
} as ApolloClientOptions<unknown>;

if (import.meta.env.DEV) {
    options = {
        ...options,
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        site: {
                            merge(existing, incoming) {
                                return incoming;
                            },
                        },
                    },
                },
            },
        }),
    }
} else {
    options = {
        ...options,
        cache: new InMemoryCache(),
    };
}
const client = new ApolloClient(options);


export async function retrieveMain(): Promise<{ site: Site, photographer: Photographer }> {
    const query = gql`
        query site {
            photographer {
                AboutMe
                documentId
                Email
                Instagram
                Name
                Surname
                PhoneNumber
            }
            site {
                Name
                PhotographerName
                Home {
                    Cover {
                        alternativeText
                        width
                        mime
                        height
                        url
                        previewUrl
                        caption
                        formats
                    }
                    ShowAboutMe
                    ShowInstagram
                }
                DefaultGalleryStyle {
                    NrColumns
                    MainStyle
                    Name
                    NrColumns
                    documentId
                    ShowNextGallery
                    ShowTitles
                }
                Menu {
                    Entry {
                        Page
                        Label
                    }
                    MainPortfolio {
                        documentId
                    }
                    BackgroundColor
                    TextColor
                }
                Footer {
                    LeftSide
                    ShowEmail
                    ShowPhoneNumber
                    ShowInstagram
                }
            }
        }
    `;
    const variables = {};
    try {
        const res = await client.query({
            query,
            variables,
        });
        console.log(JSON.stringify(res, null, 2));

        return {
            site: res.data.site,
            photographer: res.data.photographer,
        }
    } catch (error) {
        console.error("Error fetching site:", error);
        throw error;
    }
}

export async function retrieveGallery(slug: string | undefined): Promise<Gallery | null> {
    if (!slug) {
        return null;
    }
    const galleries = await fetchApi<Gallery[] | null>({
        endpoint: `/galleries?filters[Slug][$eq]=${slug}&populate=*`,
        wrappedByKey: "data",
    });
    console.log(JSON.stringify(galleries, null, 2));
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

