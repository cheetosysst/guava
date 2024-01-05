import sharp from "sharp";

export function generateUniqueFilename(
	identifier: string,
	ext: "avif" | "png",
) {
	const date = new Date().toISOString().replace(/[-:]/g, "");
	const uniqueFilename = `${identifier}_${date}.${ext}`;

	return uniqueFilename;
}

export async function convertToAvif(image: File) {
	const buffer = await image.arrayBuffer();
	const data = await sharp(buffer)
		.avif()
		.toBuffer()
		.catch((err) => console.error(err));
	return data;
}
