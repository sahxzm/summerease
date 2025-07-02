'use server';

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfSummary as generateOpenAISummary } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const session = await auth();
  const { userId } = session;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response(`Hello user: ${userId}`);
}

export async function generatePdfSummary(uploadResponse: any) {
  try {
    console.log('Upload response:', JSON.stringify(uploadResponse, null, 2));
    
    if (!uploadResponse || !Array.isArray(uploadResponse) || uploadResponse.length === 0) {
      throw new Error('No files uploaded or invalid upload response');
    }

    // Get the first file from the upload response
    const file = uploadResponse[0];
    if (!file || !file.url) {
      throw new Error('Invalid file format in upload response');
    }

    const fileUrl = file.url;
    console.log('Processing file URL:', fileUrl);

    try {
      // Step 1: Extract text from PDF
      const pdfText = await fetchAndExtractPdfText(fileUrl);
      console.log('Successfully extracted text from PDF');

      if (!pdfText || pdfText.trim() === '') {
        throw new Error('No text could be extracted from the PDF');
      }

      // Step 2: Generate summary using local function
      const summary = await generateOpenAISummary(pdfText);
      console.log('Successfully generated summary');

      return {
        success: true,
        message: "PDF processed and summarized successfully",
        data: {
          originalText: pdfText,
          summary: summary
        },
      };
    } catch (err) {
      console.error('Error in PDF processing:', err);
      throw new Error(`Failed to process PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  } catch (error) {
    console.error("Error in generatePdfSummary:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process PDF',
      data: null,
    };
  }
}

async function savePdfSummary(userId: string, fileUrl: string, summary: string, title: string, fileName: string) {
  //sql inserting pdf summmary
  try {
    const sql = await getDbConnection();
    await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName})`;
  } catch (error) {
    console.error('Error saving pdf summary:', error);
    throw error;
  }
}

export async function storePdfSummaryAction(fileUrl: string, summary: string, title: string, fileName: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: 'User not authenticated',
      };
    }
    await savePdfSummary(userId, fileUrl, summary, title, fileName);
    return {
      success: true,
      message: 'PDF summary saved successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving pdf summary',
      data: null,
    };
  }
}