/**
 * Sign up event handler assigned to guava-signup.
 * @param {Event} e
 */
async function signupHandler(e) {
	e.preventDefault();
	/**
	 * @type {string}
	 */
	const username = window.username.value;
	/**
	 * @type {string}
	 */
	const email = window.email.value;
	/**
	 * @type {string}
	 */
	const password = window.password.value;

	if (
		typeof username !== "string" ||
		typeof email !== "string" ||
		typeof password !== "string"
	) {
		// TODO raise error here
	}

	const formData = new FormData();
	formData.append("username", username);
	formData.append("email", email);
	const hashedPassword = await hash(password);
	formData.append("password", hashedPassword);

	fetch("/api/user/signup", {
		method: "POST",
		body: formData,
	})
		.then((res) => {
			if (res.ok) window.location.assign("/");
		})
		.catch((e) => {
			// TODO better error handling for signup
			console.log(e);
		});
}

/**
 * Hash strings with browser crypto API.
 * @param {string} str string to be encoded and hashed.
 */
function hash(str) {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	return crypto.subtle.digest("SHA-256", data).then((buffer) =>
		Array.from(new Uint8Array(buffer))
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("")
	);
}
