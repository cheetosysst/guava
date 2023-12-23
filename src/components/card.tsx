export function Card({
	name = "Product Name",
	description = "Description",
	price = NaN,
	href = "#",
	src,
	className = "",
}: {
	name: string;
	description: string;
	price: number;
	href: string;
	src: string;
	className?: string;
}) {
	return (
		<a
			href={href}
			class={`group flex aspect-[2/3] flex-col overflow-hidden rounded-xl bg-base-100 drop-shadow-lg ${className}`}
		>
			<figure class="relative flex-[4] overflow-hidden transition-all duration-700 group-hover:flex-1 group-hover:blur-md">
				<img src={src} alt={`product ${name}`} />
			</figure>
			<div class="flex-1 overflow-hidden p-2 font-bold transition-all duration-500 after:blur-sm group-hover:flex-[4]">
				<p class="prose-lg line-clamp-1 pb-1 leading-5 transition duration-500 group-hover:text-error">
					{name}
				</p>
				<p class="text-sm font-normal">{description}</p>
				<p class="text-lg text-secondary">$ {price}</p>
			</div>
		</a>
	);
}
