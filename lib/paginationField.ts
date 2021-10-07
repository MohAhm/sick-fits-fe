import { FieldPolicy } from "@apollo/client";
import { PAGINATION_QUERY } from "../components/Pagination"

export default function paginationField(): FieldPolicy<any, any, any> {
  return {
    keyArgs: false, 

    read(existing: any[], { args, cache }) {
      console.log('Test', { existing, args, cache })
      // const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data: any = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta;
      const page = args?.skip / args?.first + 1;
      const pages = Math.ceil(count / args?.first);
      // Check if there existing items
      const items = existing.slice(args?.skip, args?.skip + args?.first).filter((x) => x);
      // If
        // There are items
        // AND there aren't enough items to satisfy how many were requested
        // AND it is the last page
      // THEN SEND IT
      if (items.length && items.length !== args?.first && page === pages) {
        return items;
      }

      if (items.length !== args?.first) {
        return false;
      }
      // If there are items, juts return them from the cache
      if (items.length) {
        console.log(`There are ${items.length} items in the cache! Gonna send them to apollo`);
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      // const { skip, first } = args;
      // This runs when the Apollo client comes back from the network
      // with the product
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = 0; i < incoming.length; ++i) {
        merged[i] = incoming[i - args?.skip];
      }
      console.log(merged);
      // Return the merged items from the cache
      return merged;
    }
  }
}