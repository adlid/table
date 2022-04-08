import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "axios";
interface ResponseUser {
	id: string;
	name: string;
	username: string;
}

export default function TableUI() {
	const [originalUsers, setOriginalUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const sex: Array<any> = [
		{ id: 5, sex: "male" },
		{ id: 2, sex: "male" },
		{ id: 3, sex: "male" },
		{ id: 4, sex: "female" },
		{ id: 1, sex: "male" },
		{ id: 6, sex: "male" },
		{ id: 7, sex: "male" },
		{ id: 9, sex: "female" },
		{ id: 8, sex: "male" },
		{ id: 10, sex: "female" },
	];
	useEffect(() => {
		console.log("nnnhnh");

		fetchPosts();
	}, []);

	useEffect(() => {
		console.log(isLoading);
	}, [isLoading]);
	const fetchPosts = async () => {
		setIsLoading(true);
		return await axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				setIsLoading(false);
				setOriginalUsers(mergeTwoArr(response.data));
			});
	};
	const mergeTwoArr: any = (arr1: ResponseUser[]) => {
		return sex.map((itm: any) => ({
			...arr1.find((item: any) => item.id === itm.id && item),
			...itm,
		}));
	};
	return (
		<>
			<Table dataSource={originalUsers} loading={isLoading} />
		</>
	);
}
