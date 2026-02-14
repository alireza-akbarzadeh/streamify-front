import { Polar } from "@polar-sh/sdk";
import { env } from "process";


export const POLAR_PRODUCT_TO_PLAN: Record<string, string> = {
  [env.POLAR_FREE_PRODUCT_ID as string]: "FREE",
  [env.POLAR_PREMIUM_MONTHLY_PRODUCT_ID as string]: "PREMIUM",
  [env.POLAR_PREMIUM_YEARLY_PRODUCT_ID as string]: "PREMIUM",
  [env.POLAR_FAMILY_MONTHLY_PRODUCT_ID as string]: "FAMILY",
  [env.POLAR_FAMILY_YEARLY_PRODUCT_ID as string]: "FAMILY",
};

export const POLAR_SLUG_TO_PRODUCT: Record<string, string> = {
  "free": env.POLAR_FREE_PRODUCT_ID as string,
  "premium-monthly": env.POLAR_PREMIUM_MONTHLY_PRODUCT_ID as string,
  "premium-yearly": env.POLAR_PREMIUM_YEARLY_PRODUCT_ID as string,
  "family-monthly": env.POLAR_FAMILY_MONTHLY_PRODUCT_ID as string,
  "family-yearly": env.POLAR_FAMILY_YEARLY_PRODUCT_ID as string,
};

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN
});

