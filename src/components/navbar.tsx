import { ShoppingBag, StopCircle } from "./icon";

export default function Navbar() {
	return (
		<div class="navbar bg-neutral text-neutral-content">
			<div class="navbar-start w-fit">
				<button
					type="button"
					class="flex btn items-center btn-ghost text-2xl"
				>
					<StopCircle
						name="Main Logo in Navbar"
						className="w-8 h-8"
						width={2.5}
					/>
					GUAVA
				</button>
			</div>
			<div class="navbar-center flex justify-center flex-grow px-2">
				<input
					type="text"
					placeholder="Search Guava"
					class="input bg-transparent w-1/2 input-bordered input-accent"
				/>
			</div>
			<div class="navbar-end w-fit flex gap-1">
				<select class="select text-neutral-content bg-neutral select-neutral w-20 text-xl">
					<option id="region-us" selected>
						🇺🇸 USA
					</option>
					<option id="region-jp">🇯🇵 Japan</option>
					<option id="region-it">🇮🇹 Italy</option>
				</select>
				<a href="/user/signup" class="btn btn-outline btn-warning">
					Sign Up!
				</a>
				<a href="/user/cart" class="btn btn-outline btn-success">
					<ShoppingBag
						className="w-6 h-6"
						name="Icon for cart, in the form of a shopping bag"
						width={2}
					/>
				</a>
			</div>
		</div>
	);
}
