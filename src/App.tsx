import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { NewFlashcard } from "../share/types";

const newFlashcard: NewFlashcard = {
	category: "ccc",
	front: "fff",
	back: "bbb",
};

function App() {
	return (
		<main className="bg-slate-400 p-4 w-full md:w-[60rem] mt-0 md:mt-6">
			<p>{newFlashcard.front}</p>
			<Header />
			<main className="py-4">
				<Outlet />
			</main>
		</main>
	);
}

export default App;
