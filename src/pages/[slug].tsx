import RootLayout from "@/components/layout";
import SliderPage from "@/components/page-types/slider-page";
import TextPage from "@/components/page-types/text-page";
import { Collection } from "@/types/collection";
import { Stranica } from "@/types/stranica";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import React from "react";
import { QueryClient, dehydrate, useQuery } from "react-query";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: pages } = await axios.get<Collection<Stranica>>("/stranicas", {
    params: {
      "pagination[pageSize]": "100",
    },
  });

  const paths = pages.data.map((page) => ({
    params: { slug: page.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

interface StaticPathParams extends ParsedUrlQuery {
  slug: string;
}

const getPage = async (slug: string) => {
  const response = await axios.get<Collection<Stranica>>("/stranicas", {
    params: {
      "filters[slug][$eq]": slug,
      "populate[0]": "Slika",
      "populate[1]": "Poveznice_sadrzaja",
      "populate[2]": "Slideri.Eventi.Poveznica",
      "populate[3]": "Slideri.Eventi.Slika",
    },
  });
  return response.data.data[0];
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as StaticPathParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["stranica", slug], () => getPage(slug));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
};

const PageDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useQuery(["stranica", slug], () =>
    getPage(slug as string)
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data)
    return (
      <main className="flex flex-col items-center justify-center gap-2 p-12 text-center">
        <h1 className="text-2xl font-bold">Stranica nije pronađena</h1>
        <p>
          Stranica koju tražite nije pronađena. Možda je uklonjena ili je
          poveznica koju ste pratili pogrešna.
        </p>
        <Link href="/" className="text-blue-500 underline">
          Povratak
        </Link>
      </main>
    );
  return (
    <RootLayout
      title={data.attributes.Naslov}
      description={data.attributes.Opis || undefined}
    >
      {data.attributes.Vrsta_stranice === "Slideri" ? (
        <SliderPage page={data} />
      ) : (
        <TextPage type="page" page={data} />
      )}
    </RootLayout>
  );
};

export default PageDetail;
