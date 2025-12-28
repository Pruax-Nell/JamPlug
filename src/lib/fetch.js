import { items } from "@wix/data";
import { createClient, OAuthStrategy } from "@wix/sdk";

const WixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ 
    clientId: 'e4662f9f-9309-4489-a602-0cbda949df03' }),
});

export default async function fetchEvents() {
    let query = WixClient.items.queryDataItems({
        dataCollectionId: "EVENT_ITEM",
    });

    const events = await query.find();
    return events.items; 
}

console.log('My Data Items:');
console.log('Total: ', dataItemsList.items.length);
console.log(dataItemsList.items
  .map((item) => item.data._id)
  .join('\n')
);


