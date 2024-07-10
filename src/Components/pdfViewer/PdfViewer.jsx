import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker.min.mjs';

const PDFViewer = ({ url }) => {
    const canvasRef = useRef(null);
console.log(url)
    useEffect(() => {
        // Set the workerSrc property
        GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

        const loadingTask = getDocument(url);
        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');

            // Fetch the first page
            const pageNumber = 1;
            pdf.getPage(pageNumber).then(page => {
                console.log('Page loaded');

                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                // Prepare canvas using PDF page dimensions
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {
                    console.log('Page rendered');
                });
            });
        }, reason => {
            console.error(reason);
        });
    }, [url]);

    return <canvas ref={canvasRef} />;
};

export default PDFViewer;
