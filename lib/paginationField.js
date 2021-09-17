import { PAGINATION_QUERY } from "../components/Pagination"

export default function paginationField() {
  return {
    keyArgs: false, 

    read(existing = [], { args, cache }) {
      console.log('Test', { existing, args, cache })
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // Check if there existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If
        // There are items
        // AND there aren't enough items to satisfy how many were requested
        // AND it is the last page
      // THEN SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
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
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network
      // with the product
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = 0; i < incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // Return the merged items from the cache
      return merged;
    }
  }
}