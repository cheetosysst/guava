import { Html } from "@elysiajs/html";
import Navbar from "../components/navbar";
import type { AppContext } from "../utils/context";

const tabs: Record<string, { name: string; href: string }> = {
	dashboard: {
		name: "Dashboard",
		href: "dashboard",
	},
	business: {
		name: "Business",
		href: "business",
	},
	businessAccount: {
		name: "Business Account",
		href: "businessAccount",
	},
};

export default function AdminLayout({
	children,
	appContext,
	title = "Document",
	className = "",
}: {
	children: JSX.Element[] | JSX.Element;
	appContext?: AppContext;
	title?: string;
	className?: string;
}) {
	console.log(Object.keys(tabs).map((tabname) => tabname === "dashboard"));
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
			<body class="bg-base-200 min-h-[100dvh] flex flex-col h-full">
				{/* TODO Navbar requires user login state. Check if this needs to be refactored */}
				<Navbar context={appContext} />
				<div class={`mx-auto w-full flex-grow flex ${className}`}>
					<div class="w-48 min-h-full flex flex-col bg-base-300">
						{Object.keys(tabs).map((tabname) => (
							<TabButton
								href={tabs[tabname].href}
								active={tabname === "dashboard"}
							>
								{Html.escapeHtml(tabs[tabname].name)}
							</TabButton>
						))}
					</div>
					<div
						id="tab-content"
						hx-get="/api/admin/dashboard"
						hx-trigger="load"
						safe
					>
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}

function TabButton({
	children,
	active = false,
	href,
}: {
	children: JSX.Element[] | JSX.Element | null;
	active?: boolean;
	href: string;
}) {
	return (
		<button
			type="button"
			class="bg-base-100 w-full text-left p-2 hover:bg-primary aria-selected:bg-base-200 transition-colors"
			aria-selected={active ? "true" : "false"}
			hx-get={`/api/admin/${encodeURI(href)}`}
			hx-target="#tab-content"
			// @ts-ignore
			_="on htmx:afterOnLoad set @aria-selected of <[aria-selected=true]/> to false tell the target take .selected set @aria-selected to true"
			hx-trigger="click"
			safe
		>
			{children}
		</button>
	);
}
