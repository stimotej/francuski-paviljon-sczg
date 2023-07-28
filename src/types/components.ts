import type { Event } from "./event";

export interface Poveznica {
  id: number;
  Naslov: string;
  Boja_pozadine: string | null;
  Boja_teksta: string | null;
}

export type PoveznicaLink = Poveznica & { Link: string };

export interface DrustvenaMreza {
  id: number;
  Link: string;
  Boja_pozadine: string | null;
  Boja_ikone: string | null;
  Ikona: string;
}

export interface Slider {
  id: number;
  Naslov: string | null;
  Istaknuti_naslov: boolean | null;
  Eventi: { data: Event[] };
}
