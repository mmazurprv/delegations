import db from "@/lib/db/drizzle";
import { delegation, trip } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { latexEnd, latexStart } from "./latexContent";
import latex from "node-latex";
import { Readable } from "stream";

export async function GET(request: Request): Promise<Response> {
  try {
    // Todo: Get user id from session
    const userId = "1827463526172836"; // Placeholder for user ID
    const allDelegations = await db
      .select()
      .from(delegation)
      .where(eq(delegation.userId, userId));

    let latexTableRows = "";

    let tripIndex = 1;
    let totalDistance = 0;
    let totalDiets = 0;

    for (const delegation of allDelegations) {
      const trips = await db
        .select()
        .from(trip)
        .where(eq(trip.delegationId, delegation.id));

      for (const trip of trips) {
        if (!trip.startMeter || !trip.endMeter) {
          continue;
        }
        const distance = trip.endMeter - trip.startMeter;
        totalDistance += distance;
        totalDiets += delegation.dietCount || 0;

        latexTableRows += `
${tripIndex} & Del: ${delegation.id} & & & ${delegation.dietCount || 0} & ${trip.startLocation} & ${trip.endLocation} & ${trip.startMeter} & ${trip.endMeter} & \\textbf{${distance}} km\\\\ \\hline
\\multicolumn{2}{|c|}{ } & ${trip.startTime.toISOString().split("T")[0]} & ${
          trip.endTime ? trip.endTime.toISOString().split("T")[0] : ""
        } & & ${trip.startLocation} & ${trip.endLocation} & ${trip.startMeter} & ${
          trip.endMeter
        } & \\\\ \\hline
`;
        tripIndex++;
      }
    }

    // Adding the total row
    latexTableRows += `
\\hline \\hline
Razem & & & & ${totalDiets} & & & & & \\textbf{${totalDistance}} km \\\\ \\hline
`;

    const latexContent = latexStart + latexTableRows + latexEnd;

    const input = Readable.from(latexContent);
    const pdf = latex(input);

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = []; // Explicitly typed as Buffer[]

      pdf.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      pdf.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(
          new Response(pdfBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition":
                'attachment; filename="delegation_report.pdf"',
            },
          }),
        );
      });

      pdf.on("error", (err) => {
        console.error("PDF Generation Error:", err);
        reject(
          new Response(`Error generating PDF: ${err.message}`, { status: 500 }),
        );
      });
    });
  } catch (error: any) {
    console.error("Server Error:", error);
    return new Response(`Server Error: ${error.message}`, { status: 500 });
  }
}
