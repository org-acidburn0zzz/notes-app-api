import uuid from "uuid";
import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}