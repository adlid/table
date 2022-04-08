import { useEffect, useState } from "react";

interface User {
	id: string;
	name: string;
	username: string;
	sex: string;
}
type Props = {
	dataSource: User[];
	loading: boolean;
};
export default function Table(props: Props) {
	const { dataSource, loading } = props;
	const [selectValue, setSelectValue] = useState("");
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const dropdownFilterValues = ["All", "male", "female"];
	useEffect(() => {
		setFilteredUsers(dataSource);
	}, [dataSource]);
	const getUuid = () => {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	};

	const handleSortClick = (sortType: string, position: string) => {
		const newArr = [...filteredUsers.sort(compareBy(sortType, position))];
		setFilteredUsers(newArr);
	};
	const compareBy = (key: string, position: string) => {
		if (position === "up") {
			return function (a: any, b: any) {
				if (a[key] < b[key]) return -1;
				if (a[key] > b[key]) return 1;
				return 0;
			};
		} else {
			return function (a: any, b: any) {
				if (a[key] > b[key]) return -1;
				if (a[key] < b[key]) return 1;
				return 0;
			};
		}
	};

	const filter = (value: any) => {
		setSelectValue(value.target.value);
		const newArr: any = [
			...dataSource.filter((user: any) => {
				return value.target.value !== "All"
					? user.sex.startsWith(value.target.value)
					: user;
			}),
		];
		setFilteredUsers(newArr);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>
							<strong>Id</strong>
							<button onClick={() => handleSortClick("id", "up")}>up</button>
							<button onClick={() => handleSortClick("id", "down")}>
								down
							</button>
						</th>
						<th>
							<strong>Name</strong>
							<button onClick={() => handleSortClick("name", "up")}>up</button>
							<button onClick={() => handleSortClick("name", "down")}>
								down
							</button>
						</th>
						<th>
							<strong>username</strong>
						</th>
						<th>
							<strong>male</strong>
							<select value={selectValue} onChange={(value) => filter(value)}>
								{dropdownFilterValues.map((item) => {
									return (
										<option value={item} key={getUuid()}>
											{item}
										</option>
									);
								})}
							</select>
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user: any) => {
						return (
							<tr key={getUuid()}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.sex}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
