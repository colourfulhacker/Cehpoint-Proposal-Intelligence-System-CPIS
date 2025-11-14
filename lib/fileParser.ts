import mammoth from 'mammoth';

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  
  if (fileType === 'application/pdf') {
    return parsePDF(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
             fileType === 'application/msword') {
    return parseDOCX(file);
  } else if (fileType === 'text/plain') {
    return parseTXT(file);
  } else {
    throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
  }
}

async function parsePDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const pdfParse = await import('pdf-parse');
  const data = await pdfParse.default(buffer);
  return data.text;
}

async function parseDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function parseTXT(file: File): Promise<string> {
  return await file.text();
}

export async function fetchURLContent(url: string): Promise<string> {
  try {
    const response = await fetch(`/api/fetch-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch URL content');
    }
    
    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error('Failed to fetch content from URL');
  }
}
