import { search } from "../../services/search";

export default async function handler(req, res) {
  const {
    query: { q },
  } = req;

  const { results } = await search({ query: q });

  return res.status(200).json(results);
}

// import algoliasearch from "algoliasearch/lite";

// const client = algoliasearch("4K6LZ3QPWL", "ddb9a53d26ffeb29cb49cecc29ef1ee3");
// const index = client.initIndex("xkcd");

// export default async function handler(req, res) {
//   const {
//     query: { q },
//   } = req;

//   const { hits } = await index.search(q, {
//     attributesToRetrieve: ["id", "title", "img", "alt"],
//     hitsPerPage: 10,
//   })

//   return res.status(200).json(hits);
// }
