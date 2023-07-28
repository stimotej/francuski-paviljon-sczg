import { DrustvenaMreza } from "./components";
import { Media } from "./media";

export interface PocetnaStranica {
  id: number;
  attributes: {
    Naslov: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Informacije: string;
    Slika: { data: Media };
    Drustvene_mreze: DrustvenaMreza[];
    Virtualna_setnja: { data: Media };
    Naslov_virtualne_setnje: string;
  };
}
