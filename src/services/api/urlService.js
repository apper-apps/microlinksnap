import mockData from "@/services/mockData/shortenedLinks.json";

let shortenedLinks = [...mockData];

const generateShortCode = () => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const isValidUrl = (url) => {
  try {
    const urlPattern = /^https?:\/\/[^\s]+$/;
    return urlPattern.test(url) && url.length > 0;
  } catch {
    return false;
  }
};

const generateQRCode = async (url) => {
  // Simulate QR code generation
  await new Promise(resolve => setTimeout(resolve, 200));
  return `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#f8fafc"/><text x="50" y="50" text-anchor="middle" dy="0.35em" font-family="monospace" font-size="8">QR:${url.substring(0, 10)}</text></svg>`)}`;
};

export const urlService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...shortenedLinks];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const link = shortenedLinks.find(link => link.Id === parseInt(id));
    return link ? { ...link } : null;
  },

  getByShortCode: async (shortCode) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const link = shortenedLinks.find(link => link.shortCode === shortCode);
    return link ? { ...link } : null;
  },

  create: async (originalUrl) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!isValidUrl(originalUrl)) {
      throw new Error("Please enter a valid URL (must start with http:// or https://)");
    }

    // Check if URL already exists
    const existingLink = shortenedLinks.find(link => link.originalUrl === originalUrl);
    if (existingLink) {
      return { ...existingLink };
    }

    // Generate unique short code
    let shortCode;
    do {
      shortCode = generateShortCode();
    } while (shortenedLinks.some(link => link.shortCode === shortCode));

    const newId = shortenedLinks.length > 0 ? Math.max(...shortenedLinks.map(link => link.Id)) + 1 : 1;
    const qrCode = await generateQRCode(`${window.location.origin}/${shortCode}`);
    
    const newLink = {
      Id: newId,
      originalUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      clickCount: 0,
      qrCode
    };

    shortenedLinks.push(newLink);
    return { ...newLink };
  },

  incrementClick: async (shortCode) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const link = shortenedLinks.find(link => link.shortCode === shortCode);
    if (link) {
      link.clickCount++;
      return { ...link };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = shortenedLinks.findIndex(link => link.Id === parseInt(id));
    if (index > -1) {
      const deletedLink = shortenedLinks.splice(index, 1)[0];
      return { ...deletedLink };
    }
    return null;
  }
};