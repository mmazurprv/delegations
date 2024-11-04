"use client";

export default function GenerateReportButton() {
  const handleGenerateReport = async () => {
    try {
      const response = await fetch("/dashboard/reports/generate", {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "delegation_report.pdf");

        // Append to the document and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate report.");
      }
    } catch (error) {
      console.error("An error occurred while generating the report:", error);
    }
  };

  return (
    <button
      onClick={handleGenerateReport}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
    >
      Generate Report
    </button>
  );
}
