import { NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";
import imageJson from "../../../util/images.json";

const responseObject = z.object({
  imageName: z.string(),
  filePath: z.string(),
  tags: z.array(z.string()),
  expression: z.array(z.string()),
  distinctFeatures: z.array(z.string()),
  distinctBody: z.array(z.string()),
  matchingWeight: z.object({
    tags: z.number(),
    expression: z.number(),
    distinctFeatures: z.number(),
    distinctBody: z.number(),
  }),
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image");

  if (!image || !(image instanceof Blob)) {
    // If no file is received or if it's not a Blob/File, return a JSON response with an error
    return NextResponse.json(
      { error: "No valid image received." },
      { status: 400 }
    );
  }

  const imageBuffer = Buffer.from(await image.arrayBuffer());

  const imageDescription = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    schemaName: "imageJson",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
                You are an AI image classifier. Your job is to take an image and describe it using the given schema.

                Here is the schema for describing an image:
            
                z.object({
                    imageName: z.string(), // the name of the image
                    filePath: z.string(), // the filepath of the image
                    tags: z.array(z.string()), // the tags of the image
                    expression: z.array(z.string()), // the expression of the image
                    distinctFeatures: z.array(z.string()), // the distinct features of the image
                    distinctBody: z.array(z.string()), // the distinct body of the image
                    matchingWeight: z.object({ // the matching weight describing the importance of each chracteristic above, ranging from 0-1, 1 being highest.
                    tags: z.number(), // the weight of the tags
                    expression: z.number(), // the weight of the expression
                    distinctFeatures: z.number(), // the weight of the distinct features
                    distinctBody: z.number(), // the weight of the distinct body
                    }),
                }) 


                Your job is to describe the attached image to this message.
            `,
          },
          {
            type: "image",
            image: imageBuffer,
          },
        ],
      },
    ],
    schemaDescription: "A JSON object containing information about an image.",
    schema: responseObject,
  });

  console.log(`${imageDescription.object}`);

  const result = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    schemaName: "imageJson",
    schemaDescription: "A JSON object containing information about an image.",
    schema: responseObject,
    temperature: 1,
    system: `You are an AI meme generator, your job is to take in an object about an image the user uploaded, 
    select a meme from the list, and return the funniest meme.

    Here is the schema for a meme and what it contains:
      z.object({
        imageName: z.string(), // the name of the meme
        filePath: z.string(), // the filepath of the meme
        tags: z.array(z.string()), // the tags of the meme
        expression: z.array(z.string()), // the expression of the meme
        distinctFeatures: z.array(z.string()), // the distinct features of the meme
        distinctBody: z.array(z.string()), // the distinct body of the meme
        matchingWeight: z.object({ // the matching weight describing the importance of each chracteristic above, ranging from 0-1, 1 being highest.
          tags: z.number(), // the weight of the tags
          expression: z.number(), // the weight of the expression
          distinctFeatures: z.number(), // the weight of the distinct features
          distinctBody: z.number(), // the weight of the distinct body
        }),
      })    
    `,
    prompt: `
        Given the following description of an image:
        ${JSON.stringify(imageDescription.object, null)}

        And the following list of meme images to choose from:
        ${JSON.stringify(imageJson)}

        Please select the SINGLE most funniest meme to match the given description.
    
    `,
  });

  return NextResponse.json(result);
}
