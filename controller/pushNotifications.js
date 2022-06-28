const { Expo } = require("expo-server-sdk");
const Users = require("./users");

exports.generatePushNotifications = (pushTokens, messageTitle, messageData) => {
  let expo = new Expo();

  let messages = [];
  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      Users.deleteNotificationToken(pushToken);
      continue;
    }

    messages.push({
      to: pushToken,
      title: messageTitle,
      body: messageData.description,
      data: messageData,
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        ticketChunk.forEach((chunk) => {
          if (chunk.details?.error === "DeviceNotRegistered") {
            Users.deleteNotificationToken(chunk.details.expoPushToken);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  })();

  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);

        for (let receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              if (details.error === "DeviceNotRegistered") {
                Users.deleteNotificationToken(chunk.details.expoPushToken);
              }
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
