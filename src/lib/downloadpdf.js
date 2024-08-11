import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DownloadCloud } from 'lucide-react'; // Ensure this icon component is correctly imported

const handleGeneratePDF = async (imageUrl) => {
  try {
    // Create an HTML element to hold the image
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.style.display = 'block'; // Make sure the image is visible for capturing
    imgElement.style.maxWidth = '100%'; // Fit within viewport width
    imgElement.style.maxHeight = '100%'; // Fit within viewport height

    // Append the image to the document body
    document.body.appendChild(imgElement);

    // Wait for the image to load
    await new Promise((resolve) => {
      imgElement.onload = resolve;
    });

    // Use html2canvas to capture the image
    const canvas = await html2canvas(imgElement, { scale: 2 }); // Increase scale for better quality
    const imgData = canvas.toDataURL('image/png');

    // Remove the image from the document body
    document.body.removeChild(imgElement);

    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [canvas.width * 0.75, canvas.height * 0.75] // Adjust page size based on image dimensions
    });

    // Calculate the dimensions and position of the image in the PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width * 0.75; // Scale to PDF units
    const imgHeight = canvas.height * 0.75; // Scale to PDF units

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Save the PDF
    pdf.save('image.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

const GeneratePDFButton = ({ imageUrl }) => {
  return (
    <div
      onClick={() => handleGeneratePDF(imageUrl)}
      style={{ borderRadius: '5px', cursor: 'pointer' }}
      className="bg-[#C99F5D] ml-3 flex gap-x-1 w-[90px] items-center justify-center px-3 py-2"
    >
      <DownloadCloud />
      <h1 className="text-white text-sm">PDF</h1>
    </div>
  );
};

export default GeneratePDFButton;
