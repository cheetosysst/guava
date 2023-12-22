export default function MainLayout({
	children,
}: {
	children: JSX.Element[] | JSX.Element;
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
				<title>Document</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
