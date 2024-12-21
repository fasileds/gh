import fs from "fs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { google } from "googleapis";
import { PrismaClient } from "@prisma/client";
import path from "path";
import os from "os";
import { Dropbox } from "dropbox";
import { Readable } from "stream";
import fetch from "node-fetch";
const prisma = new PrismaClient();
const API_URL = "https://googleads.googleapis.com/v18/customers";
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const GOOGLE_ADS_ACCOUNT_ID = process.env.GOOGLE_ADS_ACCOUNT_ID;

// Google Auth for service account
const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch: fetch });
async function uploadVideoToDropbox(videoFile) {
  const uniqueName = `${uuidv4()}${path.extname(videoFile.name)}`;
  const dropboxPath = `/uploads/${uniqueName}`;

  try {
    const buffer = Buffer.from(await videoFile.arrayBuffer());
    await dbx.filesUpload({
      path: dropboxPath,
      contents: buffer,
    });
    console.log(`File uploaded to Dropbox: ${dropboxPath}`);
    return dropboxPath;
  } catch (error) {
    console.error("Error uploading to Dropbox:", error);
    throw new Error("Failed to upload video to Dropbox.");
  }
}
async function downloadVideoFromDropbox(dropboxUrl) {
  try {
    const response = await fetch(dropboxUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch file from Dropbox.");
    }
    const buffer = await response.buffer(); // Get file buffer
    return buffer;
  } catch (error) {
    console.error("Error downloading video from Dropbox:", error);
    throw new Error("Failed to download video from Dropbox.");
  }
}

async function getDropboxDownloadLink(dropboxPath) {
  try {
    const { result } = await dbx.sharingCreateSharedLinkWithSettings({
      path: dropboxPath,
    });
    return result.url.replace("?dl=0", "?dl=1"); // Direct download link
  } catch (error) {
    console.error("Error generating Dropbox download link:", error);
    throw new Error("Failed to generate download link for Dropbox file.");
  }
}
async function getRefreshTokenFromDatabase() {
  const token =
    "1//03glJmPG3PlYtCgYIARAAGAMSNwF-L9IrSdHStwowdCLPPx2VENSF54U-J5JfcXEzXkTe2JlDyiMyHmZVcmGwFaNtKTmFXbAPsUs";

  return getAccessTokenUsingRefreshToken(token);
}

async function getAccessTokenUsingRefreshToken(refreshToken) {
  if (!refreshToken) {
    throw new Error("Refresh token is required.");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_KEY,
    "http://localhost:3000/api/auth/callback/google"
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const { token } = await oauth2Client.getAccessToken();
  return token;
}

async function uploadVideoToYouTube(videoPath, description, accessToken) {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const videoBuffer = await downloadVideoFromDropbox(videoPath);
  if (Buffer.byteLength(videoBuffer) > 128 * 1024 * 1024 * 1024) {
    throw new Error("Video exceeds the maximum allowed size.");
  }
  const videoStream = Readable.from(videoBuffer);
  try {
    const response = await google.youtube("v3").videos.insert({
      auth: oauth2Client,
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "Your Video Title",
          description: description,
          tags: ["tag1", "tag2"],
          categoryId: "22",
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: videoStream,
      },
    });
    console.log("video uploded yo youtube sussfully :", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error uploading video to YouTube:", error);
    throw new Error("Failed to upload video to YouTube.");
  }
}

async function uploadVideoToGoogleAds(videoId, accessToken) {
  const url = `${API_URL}/${process.env.GOOGLE_ADS_ACCOUNT_ID}/assets:mutate`;
  const payload = {
    operations: [
      {
        create: {
          youtubeVideoAsset: {
            youtubeVideoId: videoId,
          },
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorDetail = await response.json();
      console.error("Google Ads API upload error details:", errorDetail);
      throw new Error(errorDetail.error.message || "Unknown error");
    }

    const responseData = await response.json();
    console.log("the video uploded sussfuly: ", responseData);
    return responseData.results[0].resourceName;
  } catch (error) {
    console.error("Network error during video upload to Google Ads:", error);
    throw new Error("Failed to upload video to Google Ads.");
  }
}

async function createGoogleAdsCampaign(
  videoId,
  targetZip,
  budget,
  description,
  duration,
  accessToken
) {
  try {
    // Step 1: Create Campaign Budget
    const budgetResponse = await fetch(
      `${API_URL}/${process.env.GOOGLE_ADS_ACCOUNT_ID}/campaignBudgets:mutate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        },
        body: JSON.stringify({
          operations: [
            {
              create: {
                name: `Video Campaign Budget${uuidv4()}`,
                amount_micros: budget * 1000000,
                delivery_method: "STANDARD",
                explicitlyShared: false,
              },
            },
          ],
        }),
      }
    );
    if (!budgetResponse.ok) {
      throw new Error("Failed to create campaign budget.");
    }

    const budgetData = await budgetResponse.json();
    console.log("buget created sussfully : ", budgetData);
    const budgetId = budgetData.results[0].resourceName.split("/").pop();

    // Step 2: Create Campaign
    const campaignResponse = await fetch(
      `${API_URL}/${process.env.GOOGLE_ADS_ACCOUNT_ID}/campaigns:mutate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        },
        body: JSON.stringify({
          operations: [
            {
              create: {
                name: `Video Campaign ${uuidv4()}`,
                advertisingChannelType: "DEMAND_GEN",
                status: "ENABLED",
                campaign_budget: `customers/${process.env.GOOGLE_ADS_ACCOUNT_ID}/campaignBudgets/${budgetId}`,
                maximizeConversions: {},
              },
            },
          ],
        }),
      }
    );

    if (!campaignResponse.ok) {
      // Log status and status text
      console.error(
        `Error: ${campaignResponse.status} - ${campaignResponse.statusText}`
      );

      // Attempt to parse and log the JSON error message
      throw new Error("Failed to create campaign.");
    }

    // If successful, log the success message or response data
    const campaignData = await campaignResponse.json();
    console.log(
      "Campaign created successfully:",
      JSON.stringify(campaignData, null, 2)
    );
    const campaignId = campaignData.results[0].resourceName.split("/").pop();
    const adGroupResponse = await fetch(
      `${API_URL}/${process.env.GOOGLE_ADS_ACCOUNT_ID}/adGroups:mutate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        },
        body: JSON.stringify({
          operations: [
            {
              create: {
                name: `Ad Group ${uuidv4()}`,
                campaign: `customers/${process.env.GOOGLE_ADS_ACCOUNT_ID}/campaigns/${campaignId}`,
                status: "ENABLED",
                cpcBidMicros: 1000000, // Example bid, adjust as needed
              },
            },
          ],
        }),
      }
    );

    if (!adGroupResponse.ok) {
      console.error(
        `Error: ${adGroupResponse.status} - ${adGroupResponse.statusText}`
      );
      throw new Error("Failed to create ad group.");
    }

    const adGroupData = await adGroupResponse.json();
    const adGroupId = adGroupData.results[0].resourceName.split("/").pop();
    console.log("Ad Group created successfully:", adGroupData);

    const assetResource = await uploadVideoToGoogleAds(videoId, accessToken);
    const adGroupAdResponse = await fetch(
      `${API_URL}/${process.env.GOOGLE_ADS_ACCOUNT_ID}/adGroupAds:mutate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        },
        body: JSON.stringify({
          operations: [
            {
              create: {
                adGroup: `customers/${process.env.GOOGLE_ADS_ACCOUNT_ID}/adGroups/${adGroupId}`,
                status: "ENABLED",
                ad: {
                  videoAd: {
                    video: assetResource,
                  },
                },
              },
            },
          ],
        }),
      }
    );

    if (!adGroupAdResponse.ok) {
      const errorDetail = await adGroupAdResponse.json();
      console.error("Google Ads API Ad Group Ad error details:", errorDetail);
      throw new Error(errorDetail.error.message || "Unknown error");
    }

    const responseData = await adGroupAdResponse.json();
    console.log("Ad Group Ad created successfully:", responseData);

    return {
      campaignId,
      adGroupId: adGroupData.results[0].resourceName.split("/").pop(),
      assetResource,
    };
  } catch (error) {
    console.error("Error creating Google Ads campaign:", error);
    throw new Error("Failed to create Google Ads campaign.");
  }
}
export const runtime = "nodejs";
export async function POST(req) {
  const formData = await req.formData();
  const targetZip = formData.get("targetZip");
  const budget = parseFloat(formData.get("budget"));
  const duration = parseInt(formData.get("duration"), 10);
  const videoFile = formData.get("video");
  const price = parseFloat(formData.get("price"));
  const restorantId = formData.get("restorantId");
  const description = formData.get("description");
  const userId = formData.get("userId");
  const dish = formData.get("dish");

  if (
    !targetZip ||
    isNaN(budget) ||
    isNaN(duration) ||
    !videoFile ||
    isNaN(price) ||
    !description ||
    !userId ||
    !restorantId ||
    !dish
  ) {
    return NextResponse.json(
      { error: "Invalid input fields." },
      { status: 400 }
    );
  }

  try {
    const dropboxPath = await uploadVideoToDropbox(videoFile);
    const videoUrl = await getDropboxDownloadLink(dropboxPath);

    const accessToken = await getRefreshTokenFromDatabase();

    const videoId = await uploadVideoToYouTube(
      videoUrl,
      description,
      accessToken
    );
    const savedVideo = await saveToDatabase(
      videoId,
      price,
      description,
      userId,
      restorantId,
      dish
    );
    const campaignData = await createGoogleAdsCampaign(
      videoId,
      targetZip,
      budget,
      description,
      duration,
      accessToken
    );

    return NextResponse.json(
      {
        success: true,
        campaignId: campaignData.campaignId,
        assetResource: campaignData.assetResource,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request." },
      { status: 500 }
    );
  }
}

async function saveToDatabase(
  videoId,
  price,
  description,
  userId,
  restorantId,
  dish
) {
  try {
    return await prisma.menu.create({
      data: {
        videoUrl: videoId,
        description: description,
        price: price,
        user: { connect: { id: userId } },
        restorant: { connect: { id: restorantId } },
        dish: dish,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to save data to the database.");
  }
}
