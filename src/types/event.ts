import { Poveznica, PoveznicaLink } from "./components";
import { Media } from "./media";

export interface Event {
  id: number;
  attributes: {
    Naslov: string;
    slug: string;
    Autor: string;
    Pocetak: string | null;
    Kraj: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Boja_naslova: string | null;
    Sadrzaj: string | null;
    Slika: { data: Media };
    Poveznica: Poveznica;
    Poveznice_sadrzaja: PoveznicaLink[];
  };
}
