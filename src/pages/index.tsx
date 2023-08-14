import RootLayout from "@/components/layout";
import { type GetStaticProps } from "next";
import { QueryClient, dehydrate, useQuery } from "react-query";
import axios from "axios";
import type { Collection, Single } from "@/types/collection";
import type { PocetnaStranica } from "@/types/pocetna-stranica";
import React from "react";
import Image from "next/image";
import Container from "@/components/container";
import DisplayHTML from "@/components/display_html";
import * as AllIcons from "react-icons/fa";
import Slider from "@/components/slider";
import { Stranica } from "@/types/stranica";

const getPocetnaStranica = async () => {
  const response = await axios.get<Single<PocetnaStranica>>(
    "/pocetna-stranica"
  );
  return response.data;
};

const getPages = async () => {
  const response = await axios.get<Collection<Stranica>>("/stranicas");
  return response.data;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("pocetna-stranica", getPocetnaStranica);
  await queryClient.prefetchQuery("stranicas", getPages);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24,
  };
};

export default function Home() {
  const { data } = useQuery("pocetna-stranica", getPocetnaStranica);
  const { data: pages, isLoading } = useQuery("stranicas", getPages);

  return (
    <RootLayout>
      <section className="bg-siva-600 pt-12 pb-24">
        <Container className="border-y border-white py-5">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl">
            {data?.data.attributes.Naslov}
          </h1>
        </Container>

        <Container>
          <div className="flex flex-col lg:flex-row gap-8 mt-12">
            <Image
              width={240}
              height={240}
              src={
                (process.env.NEXT_PUBLIC_BACKEND_URL || "") +
                data?.data.attributes.Slika.data.attributes.url
              }
              alt={
                data?.data.attributes.Slika.data.attributes.alternativeText ||
                "Francuski paviljon logo"
              }
              title={
                data?.data.attributes.Slika.data.attributes.caption ||
                data?.data.attributes.Slika.data.attributes.alternativeText ||
                "Francuski paviljon"
              }
              className="w-60 h-60 object-cover"
              priority
            />
            <div className="text-white text-base md:text-lg flex-1">
              <DisplayHTML html={data?.data.attributes.Informacije || ""} />
              <div className="flex items-center gap-3 mt-4">
                {data?.data.attributes.Drustvene_mreze.map((drustvenaMreza) => {
                  const Icon =
                    AllIcons[drustvenaMreza.Ikona as keyof typeof AllIcons];
                  return (
                    <a
                      key={drustvenaMreza.id}
                      href={drustvenaMreza.Link}
                      className="p-3 bg-[#c32aa3] rounded-full"
                      style={{
                        backgroundColor:
                          drustvenaMreza.Boja_pozadine || undefined,
                        color: drustvenaMreza.Boja_ikone || undefined,
                      }}
                      aria-label="Društvena mreža"
                      target="_blank"
                      rel="noopener"
                    >
                      <Icon size={22} />
                    </a>
                  );
                })}
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.383812823189!2d15.96498877645157!3d45.80357117108149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f1cb6d5eb7%3A0x991d994ba8526442!2sZa%C5%A1ti%C4%87eno%20kulturno%20dobro%2C%20Studentski%20centar%2C%20Francuski%20paviljon%2C%20Savska%20cesta%2025%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1690547754297!5m2!1shr!2shr"
              width="50%"
              height="450"
              className="border-none w-full lg:w-1/2"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </Container>
      </section>

      <section className="bg-siva-600 py-24 border-y border-white">
        <Slider
          slides={
            pages?.data.map((page) => ({
              id: page.id,
              title: page.attributes.Naslov,
              description: page.attributes.Opis || "",
              image: {
                src:
                  process.env.NEXT_PUBLIC_BACKEND_URL +
                    page.attributes.Slika?.data.attributes.url || "",
                alt:
                  page.attributes.Slika?.data.attributes.alternativeText || "",
              },
              link: {
                href: `/${page.attributes.slug}`,
                text: page.attributes.Poveznica.Naslov,
                color: page.attributes.Poveznica.Boja_pozadine || "",
                textColor: page.attributes.Poveznica.Boja_teksta || "",
              },
            })) || []
          }
          loading={isLoading}
        />
      </section>

      <section className="py-24 bg-siva-600">
        <Container>
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto relative">
            <a
              href="https://my.matterport.com/show/?m=ztZgSok4bfo"
              rel="noopenner noreferrer"
              target="_blank"
              aria-label="Otvori virtualnu šetnju"
            >
              <Image
                src={
                  (process.env.NEXT_PUBLIC_BACKEND_URL || "") +
                  data?.data.attributes.Virtualna_setnja.data.attributes.url
                }
                alt={
                  data?.data.attributes.Virtualna_setnja.data.attributes
                    .alternativeText || "Virtualna šetnja"
                }
                title={
                  data?.data.attributes.Virtualna_setnja.data.attributes
                    .caption ||
                  data?.data.attributes.Virtualna_setnja.data.attributes
                    .alternativeText ||
                  "Francuski paviljon virtualna šetnja"
                }
                className="w-full h-auto object-cover"
                priority
              />
            </a>
            <div className="bg-black/60 text-white text-lg p-4 absolute left-0 bottom-24">
              {data?.data.attributes.Naslov_virtualne_setnje}
            </div>
          </div>
        </Container>
      </section>
    </RootLayout>
  );
}
