import { createStore } from "easy-peasy";
import { mainModel, MainModel } from "./models/mainModel";

export type StoreModel = {
	mainModel: MainModel;
};

export const store = createStore<StoreModel>({
	mainModel
});
