import { useTypedStoreState } from "../store/hooks"

export const PageWelcome = () => {
	const { message } = useTypedStoreState((state) => state.mainModel);

	return (
		<p>{message}</p>
	)
}