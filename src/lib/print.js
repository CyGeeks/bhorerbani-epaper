const handlePrint = (imageUrl) => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #fff;
            }
            img {
              max-width: 100%;
              max-height: 100vh;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" />
        </body>
      </html>
    `);
    
    printWindow.document.close(); // Required for IE >= 10
    printWindow.focus(); // Required for IE >= 10
    
    // Trigger the print dialog
    printWindow.print();
    
    // Optionally, close the print window after printing
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };

export default handlePrint;