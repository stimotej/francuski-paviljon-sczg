import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import dayjs from "dayjs";
import Container from "./container";
import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Slide {
  id: number;
  title: string;
  description?: string;
  autor?: string;
  autorColor?: string;
  image: {
    src: string;
    alt: string;
  };
  date?: {
    start: string;
    end: string;
  };
  link: {
    href: string;
    text: string;
    color: string;
    textColor: string;
  };
}

interface SliderProps {
  slides: Slide[];
  className?: string;
  loading?: boolean;
}

const Slider: React.FC<SliderProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const tablet = useMediaQuery("(min-width: 768px)");
  const desktop = useMediaQuery("(min-width: 1024px)");

  const numberOfCards = desktop ? 3 : tablet ? 2 : 1;

  const maxPages = Math.ceil(props.slides.length / numberOfCards);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % maxPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + maxPages) % maxPages);
  };

  if (props.loading)
    return <div className="text-center text-lg">Učitavanje...</div>;
  if (props.slides.length === 0) return null;
  return (
    <div className={clsx("relative w-full", props.className)}>
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: maxPages }).map((_, index) => (
            <Container key={index} className="w-full flex-shrink-0">
              <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {props.slides
                  .slice(
                    index * numberOfCards,
                    index * numberOfCards + numberOfCards
                  )
                  .map((slide, cardIndex) => (
                    <Transition
                      key={index * numberOfCards + cardIndex}
                      show={currentPage === index}
                      enter="transition-opacity ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="h-[450px] flex flex-col">
                        <div className="bg-siva-800 p-8 pb-4 flex flex-col flex-1">
                          <h3 className="text-2xl text-white">
                            {slide.autor || slide.title}
                          </h3>
                          {!!slide.autor && (
                            <h4
                              className="text-2xl text-roza-600 mt-2 line-clamp-2"
                              style={{
                                color: slide.autorColor || undefined,
                              }}
                            >
                              {slide.title}
                            </h4>
                          )}
                          {!!slide.description && (
                            <p className="text-base text-gray-400 mt-2 line-clamp-2">
                              {slide.description}
                            </p>
                          )}
                          <div className="flex items-end justify-between flex-1 mt-2">
                            {slide.date ? (
                              <p className="text-white">
                                {!slide.date.start
                                  ? dayjs(slide.date.end).format(
                                      "DD. MMMM YYYY"
                                    )
                                  : !slide.date.end
                                  ? dayjs(slide.date.start).format(
                                      "DD. MMMM YYYY"
                                    )
                                  : dayjs(slide.date.start).format("DD") +
                                    ". - " +
                                    dayjs(slide.date.end).format(
                                      "DD. MMMM YYYY"
                                    )}
                              </p>
                            ) : (
                              <div />
                            )}
                            <Link
                              href={slide.link.href}
                              className="w-16 h-16 text-center flex items-center justify-center text-xs font-semibold rounded-full bg-plava-600 text-white"
                              style={{
                                backgroundColor: slide.link.color,
                                color: slide.link.textColor,
                              }}
                            >
                              {slide.link.text}
                            </Link>
                          </div>
                        </div>
                        <img
                          src={slide.image.src}
                          alt={slide.image.alt}
                          className="w-full h-[250px] object-cover"
                        />
                      </div>
                    </Transition>
                  ))}
              </div>
            </Container>
          ))}
        </div>
      </div>

      <button
        onClick={goToPreviousPage}
        className="absolute top-1/2 transform -translate-y-1/2 left-4"
      >
        <div className="w-0 h-0 border-t-[40px] border-t-transparent border-r-[50px] border-r-zelena-600 border-b-[40px] border-b-transparent" />
      </button>
      <button
        onClick={goToNextPage}
        className="absolute top-1/2 transform -translate-y-1/2 right-4"
      >
        <div className="w-0 h-0 border-t-[40px] border-t-transparent border-l-[50px] border-l-zelena-600 border-b-[40px] border-b-transparent" />
      </button>
    </div>
  );
};

export default Slider;
