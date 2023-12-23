import Navbar from "../components/navbar";

export default function MainLayout({
	children,
	title = "Document",
}: {
	children: JSX.Element[] | JSX.Element;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="stylesheet" href="/public/dist.css" />
				<title>
					{title}
					{" - Guava. Spent More, Smile Less."}
				</title>
			</head>
			<body class="bg-base-200 min-h-[100dvh]">
				{/* TODO Navbar requires user login state. Check if this needs to be refactored */}
				<Navbar />
				<div class="max-w-7xl mx-auto w-full">{children}</div>
			</body>
		</html>
	);
}
