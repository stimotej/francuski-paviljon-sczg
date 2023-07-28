import type { Poveznica, PoveznicaLink, Slider } from "./components";
import type { Media } from "./media";

export interface Stranica {
  id: number;
  attributes: {
    Naslov: string;
    slug: string;
    Opis: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Sadrzaj: string | null;
    Slika: { data: Media };
    Poveznica: Poveznica;
    Poveznice_sadrzaja: PoveznicaLink[];
    Slideri: Slider[];
    Mediji: {
      data: Media[] | null;
    };
    Vrsta_stranice: "Slideri" | "Teskt" | "Mediji";
  };
}
