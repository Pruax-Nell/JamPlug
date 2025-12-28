import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: import.meta.env.Wix_CLIENT_ID }),
});

const dataItemsList = await myWixClient.items.query({
  "dataCollectionId": "Members/Badges"
}).find();

console.log('My Data Items:');
console.log('Total: ', dataItemsList.items.length);
console.log(dataItemsList.items
  .map((item) => item.data._id)
  .join('\n')
);

export default async function fetchPosts() {
    let query = WixClient.items.queryDataItems({
        dataCollectionId: "Posts",
    });

    const articles = await query.find();
    return articles.items; 
}
