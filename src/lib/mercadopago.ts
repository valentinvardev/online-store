import MercadoPagoConfig, { Preference, Payment } from "mercadopago";

const accessToken = process.env.MP_ACCESS_TOKEN ?? "";

export const mpClient = new MercadoPagoConfig({ accessToken });

export const mpPreference = new Preference(mpClient);
export const mpPayment = new Payment(mpClient);
