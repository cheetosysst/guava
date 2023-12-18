export default function MainLayout({ children }: { children: JSX.Element[] }) {
	console.log(<div>Html import needs to be in scope!</div>);
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
