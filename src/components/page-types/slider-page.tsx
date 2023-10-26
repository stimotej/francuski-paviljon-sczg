import type { Stranica } from "@/types/stranica";
import React from "react";
import Container from "../container";
import Slider from "../slider";

interface SliderPageProps {
  page: Stranica;
}

const SliderPage: React.FC<SliderPageProps> = (props) => {
  return (
    <>
      <Container className="bg-siva-600 py-24">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white">
          {props.page.attributes.Naslov}
        </h1>
      </Container>
      {props.page.attributes.Slideri.map((slider) => (
        <div
          key={slider.id}
          className={slider.Istaknuti_naslov ? "mb-8" : "my-24"}
        >
          {!!slider.Naslov ? (
            slider.Istaknuti_naslov ? (
              <div className="bg-siva-600 pt-12 pb-[184px]">
                <Container className="border-y-[0.25px] border-white py-8">
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl">
                    {slider.Naslov}
                  </h3>
                </Container>
              </div>
            ) : (
              <div className="bg-siva-600 w-4/5 md:w-3/5 ld:w-2/5 py-8 pr-32 mb-8">
                <Container>
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl">
                    {slider.Naslov}
                  </h3>
                </Container>
              </div>
            )
          ) : null}
          {slider.Eventi.data.length > 0 && (
            <Slider
              className={slider.Istaknuti_naslov ? "-mt-32" : ""}
              slides={
                slider.Eventi.data.map((event) => ({
                  id: event.id,
                  title: event.attributes.Naslov,
                  autor: event.attributes.Autor,
                  image: {
                    src:
                      process.env.NEXT_PUBLIC_BACKEND_URL +
                        event.attributes.Slika?.data.attributes.url || "",
                    alt:
                      event.attributes.Slika?.data.attributes.alternativeText ||
                      "",
                  },
                  date: {
                    start: event.attributes.Pocetak || "",
                    end: event.attributes.Kraj || "",
                  },
                  link: {
                    href: `/dogadaj/${event.attributes.slug}`,
                    text: event.attributes.Poveznica.Naslov,
                    color: event.attributes.Poveznica.Boja_pozadine || "",
                    textColor: event.attributes.Poveznica.Boja_teksta || "",
                  },
                })) || []
              }
            />
          )}
        </div>
      ))}
    </>
  );
};

export default SliderPage;
