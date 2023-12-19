import { StopCircle } from "./icon";

export default function Navbar() {
	return (
		<div class="navbar bg-neutral text-neutral-content">
			<button type="button" class="btn btn-ghost text-xl">
				<StopCircle name="Main Logo in Navbar" />
			</button>
			<div>
				<a href="/" class="btn btn-ghost text-xl">
					{/*  */}
				</a>
			</div>
		</div>
	);
}
