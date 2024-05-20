"use server"

import { fetch } from "fetch-opengraph";
import { createSupabaseServerComponentClient } from "@/utils/supabaseAppRouterServer";

export async function fetchPageMetadata(save) {
    const supabase = createSupabaseServerComponentClient();
    const pageData = await fetch(save.links.url);
    const pageTitle = pageData['og:title'];

    if (!pageTitle) {
        return "";
    }

    // update links table
    const { data, error } = await supabase
        .from('links')
        .update({ 'page_title': pageTitle })
        .eq('url', save.links.url)
        .select();
    if (error) {
        throw error;
    }

    return pageTitle;
}