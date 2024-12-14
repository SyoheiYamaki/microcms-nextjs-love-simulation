import { createClient, MicroCMSContentId, MicroCMSDate, MicroCMSImage } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

type Message = {
  text: string;
  speaker: ("me" | "heroin")[];
  character?: MicroCMSImage;
}

type Action = {
  label: string;
  next_scene?: Scene,
  url?: string;
  type: ("goToNextScene" | "openUrl" | "goToEndroll")[];
}

export type Scene = {
  background: MicroCMSImage;
  messages: Message[];
  actions: Action[];
} & MicroCMSContentId & MicroCMSDate