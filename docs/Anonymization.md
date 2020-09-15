# Anonymization

Ackee tries its best to keep tracked data anonymized. Several steps are used to avoid that users are identifiable, while still providing helpful analytics.

## User identifier

Ackee uses the IP, user-agent and domainId to identify a user. All information will be hashed together with a [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) that changes daily. The final hash is called `clientId`.

The daily salt is never stored anywhere. It avoids that database backups can be used to stick data together to reconstruct the browsing history of a user.

Ackee also removes personal data from previous records when a new record with an existing identification gets added. This way the user identifier and other identifiable data is only stored once in the database. Or with other words: Ackee forgets who you are as soon as it sees you, again. It's not possible to reconstruct a browsing history, even on a daily basis.

## Personal data

Ackee won't track personal information by default, but it has the ability to do so in a privacy focused way. Our recommendation:

1. Ask the user for permission to track personal data and set a cookie to remember their decision
2. Enable `detailed` with the next page view (an option of [ackee-tracker](https://github.com/electerious/ackee-tracker))
3. Ackee now receives data considered as "personal data"

The following data is considered as "personal data":

| Name | Description |
|:-----------|:------------|
| siteLanguage | Language version of the browser. |
| screenWidth | The width of the screen in pixels. |
| screenHeight | The height of the screen in pixels. |
| screenColorDepth | The bit depth of the color palette for displaying images (in bits per pixel). |
| deviceName | The name of the product hosting the browser. |
| deviceManufacturer | The name of the product's manufacturer. |
| osName | The family of the OS. |
| osVersion | The version of the OS. |
| browserName | The name of the browser/environment. |
| browserVersion | The browser/environment version. |
| browserWidth | The width of the screen in pixels. |
| browserHeight | The height of the screen in pixels. |

All those parameters are considered as personal data, because you could point at the tracked person when sitting in the same room (even when this is probably never the case and totally unrealistic).

`siteReferrer` and visit duration (calculated using the creation and update time of a record) is not considered as personal data as you won't be able to identifier a user with this piece of information. Even when you are in the same room you would need access to the browsing history of the user.
