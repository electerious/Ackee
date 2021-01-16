# Enhancing referrers

## Manually setting referrers

Whenever you post a link, you can choose to add a special query parameter to the link. When the `?source=<value>` query parameter is present, Ackee will treat it as a referrer.

For example, here's what you can do when you want to send a newsletter to your subscribers. If you link to your site with `example.com`, anyone who clicks on it wouldn't show up under "Referrers".

But if you link to `example.com?source=Newsletter` anyone who clicks on that link will show "Newsletter" as the referrer source. This will allow you to see how many people have clicked on your link in the newsletter.

## Fallback referrer

The `Referer` request header contains the address of the page making the request. It's not available in all situations (e.g. when opening a link from an application). Ackee will use and show the header in the UI when no `source` parameter is available.