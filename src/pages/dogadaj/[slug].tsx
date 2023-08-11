import RootLayout from "@/components/layout";
import TextPage from "@/components/page-types/text-page";
import type { Collection } from "@/types/collection";
import type { Event } from "@/types/event";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data: pages } = await axios.get<Collection<Event>>("/events", {
//     params: {
//       "pagination[pageSize]": "100",
//     },
//   });

//   const paths = pages.data.map((page) => ({
//     params: { slug: page.attributes.slug },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// };

// interface StaticPathParams extends ParsedUrlQuery {
//   slug: string;
// }

const getEvent = async (slug: string) => {
  const response = await axios.get<Collection<Event>>("/events", {
    params: {
      "filters[slug][$eq]": slug,
    },
  });
  return response.data.data[0];
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params as StaticPathParams;

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["event", slug], () => getEvent(slug));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: 60 * 60 * 24,
//   };
// };

const EventDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useQuery(["event", slug], () =>
    getEvent(slug as string)
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Greška...</div>;
  return (
    <RootLayout title={data.attributes.Naslov}>
      <TextPage type="event" page={data} />
    </RootLayout>
  );
};

export default EventDetail;
