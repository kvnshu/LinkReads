"use server"

import { fetch } from "fetch-opengraph";

export async function fetchOpengraph(url) {
    const data = await fetch(url);
    return data;
}