import type { AppContext, AuthToken } from "../utils/context";
import { HeroIconLogOut, HeroIconUser, ShoppingBag, StopCircle } from "./icon";

export default function Navbar({ context }: { context?: AppContext }) {
	return (
		<div class="navbar bg-neutral text-neutral-content">
			<div class="navbar-start w-fit">
				<a href="/" class="flex btn items-center btn-ghost text-2xl">
					<StopCircle
						name="Main Logo in Navbar"
						className="w-8 h-8"
						width={2.5}
					/>
					GUAVA
				</a>
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
				<UserButtons user={context?.user} />
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

function UserButtons({ user }: { user: AuthToken | undefined }) {
	console.log(user);
	if (user == null) return <UserSignup />;

	return <UserProfile user={user} />;
}

function UserProfile({ user }: { user: AuthToken }) {
	return (
		<>
			<a
				href={`/user/profile?name=${encodeURI(user.userid)}`}
				id={"navbar-signup"}
				class="btn btn-outline btn-warning"
			>
				<HeroIconUser name="User Icon" className="w-6 h-6" />
			</a>
			<a
				href="/user/logout"
				id={"navbar-signup"}
				class="btn btn-outline btn-info"
			>
				<HeroIconLogOut name="logout icon" className="w-6 h-6" />
			</a>
		</>
	);
}

function UserSignup() {
	return (
		<a
			href="/user/signup"
			id={"navbar-signup"}
			class="btn btn-outline btn-warning"
		>
			Sign Up!
		</a>
	);
}
