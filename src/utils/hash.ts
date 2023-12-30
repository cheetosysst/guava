function hash(password: string) {
	const hasher = new Bun.CryptoHasher("sha256");
	hasher.update(password);
	const resultRaw = hasher.digest("hex");
	return resultRaw;
}

export { hash };
