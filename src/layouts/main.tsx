import Footer from "../components/footer";
import Navbar from "../components/navbar";
import type { AppContext } from "../utils/context";

export default function MainLayout({
	children: safeChildren,
	appContext,
	title = "Document",
	className = "",
}: {
	children: JSX.Element[] | JSX.Element;
	appContext?: AppContext;
	title?: string;
	className?: string;
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
					{Html.escapeHtml(title)}
					{" - Guava. Spent More, Smile Less."}
				</title>
				<script
					src="https://unpkg.com/htmx.org@1.9.10"
					integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
					crossorigin="anonymous"
				/>
				<script src="https://unpkg.com/hyperscript.org@0.9.12" />
			</head>
			<body class="bg-base-200 min-h-[100dvh] h-full">
				{/* TODO Navbar requires user login state. Check if this needs to be refactored */}
				<Navbar context={appContext} />
				<div class={`max-w-7xl mx-auto w-full ${className}`}>
					{safeChildren}
				</div>
				<Footer />
			</body>
		</html>
	);
}
