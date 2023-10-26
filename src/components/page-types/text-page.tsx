import type { Event } from "@/types/event";
import type { Stranica } from "@/types/stranica";
import React from "react";
import Container from "../container";
import DisplayHTML from "../display_html";
import dayjs from "dayjs";

type TextPageProps =
  | {
      type: "event";
      page: Event;
    }
  | {
      type: "page";
      page: Stranica;
    };

const TextPage: React.FC<TextPageProps> = (props) => {
  return (
    <>
      <img
        src={
          process.env.NEXT_PUBLIC_BACKEND_URL +
          props.page.attributes.Slika.data.attributes.url
        }
        alt={
          props.page.attributes.Slika.data.attributes.alternativeText ||
          "Francuski paviljon povijest"
        }
        className="absolute -z-10 w-full h-auto object-cover top-32"
      />
      <Container>
        <div className="w-full sm:w-3/4 lg:w-2/3 bg-black/60 my-12 p-4 sm:p-6 md:p-10 lg:py-12 lg:px-24 text-white">
          <div className="p-6 border-[0.25px] border-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl">
              {props.type === "event"
                ? props.page.attributes.Autor
                : props.page.attributes.Naslov}
            </h1>
            {props.type === "event" && (
              <h2
                className="text-2xl md:text-3xl lg:text-4xl mt-4"
                style={{
                  color: props.page.attributes.Boja_naslova || undefined,
                }}
              >
                {props.page.attributes.Naslov}
              </h2>
            )}
            {props.type === "event" && (
              <h4 className="text-lg md:text-xl mt-6">
                {dayjs(props.page.attributes.Pocetak).format("DD") +
                  ". - " +
                  dayjs(props.page.attributes.Kraj).format("DD. MMMM YYYY")}
              </h4>
            )}
            <div className="flex items-center mt-6 gap-4 justify-end">
              {props.page.attributes.Poveznice_sadrzaja.map((link) => (
                <a
                  key={link.id}
                  href={link.Link}
                  className="w-16 h-16 text-center flex items-center justify-center text-xs font-semibold rounded-full bg-plava-600 text-white"
                  style={{
                    backgroundColor: link.Boja_pozadine || undefined,
                    color: link.Boja_teksta || undefined,
                  }}
                >
                  {link.Naslov}
                </a>
              ))}
            </div>
          </div>
          <div className="p-6 border-[0.25px] border-white mt-6">
            <DisplayHTML
              html={props.page.attributes.Sadrzaj || ""}
              className="prose max-w-none prose-blockquote:text-gray-300 prose-a:text-white text-white"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default TextPage;
