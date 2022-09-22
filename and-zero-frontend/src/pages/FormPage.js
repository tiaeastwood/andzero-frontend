import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function FormPage() {
	const [coffeeCups, setCoffeeCups] = useState();
	const [pledge, setPledge] = useState();
	const [pledgeDate, setPledgeDate] = useState();
	const [email, setEmail] = useState();
	const [clubId, setClubId] = useState();
	const [clubsList, setClubsList] = useState([]);

	const navigation = useNavigate();

	const canSubmit = coffeeCups && pledge && pledgeDate && email && clubId;

	const submitForm = (e) => {
		e.preventDefault();

		const url = "http://localhost:3001/pledge";
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
			body: JSON.stringify({
				email: email,
				club: clubId,
				date: pledgeDate,
				cupsPledged: coffeeCups,
			}),
		};
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then(navigation("/Stats"))
			.catch((error) => console.log("Form submit error", error));
	};

	const fetchClubs = async () => {
		const clubUrl = "http://localhost:3001/clubs";

		const response = await fetch(clubUrl);

		if (!response.ok) {
			throw new Error("Data could not be fetched");
		}

		return await response.json();
	};

	useEffect(() => {
		fetchClubs()
			.then((clubsList) => {
				setClubsList(clubsList);
			})
			.catch((error) => console.log(error.message));
	}, []);

	return (
		<div id="form-container">
			<form className="p-12">
				<label htmlFor="number">
					On average, enter the number of coffees you have per day:
				</label>
				<input
					name="number"
					type="text"
					placeholder="5"
					className="input input-bordered input-secondary w-full mb-6"
					onChange={(e) => setCoffeeCups(e.target.value)}
				/>
				<label htmlFor="radio">
					Do you pledge to switch to a reusable coffee cup?
				</label>
				<div className="mb-5">
					<label className="label cursor-pointer">
						<span className="label-text">Yes</span>
						<input
							value={true}
							type="radio"
							name="radio"
							className="radio checked:bg-red-500"
							onChange={(e) => setPledge(e.target.value)}
						/>
					</label>

					<label className="label cursor-pointer">
						<span className="label-text">No</span>
						<input
							value={false}
							type="radio"
							name="radio"
							className="radio checked:bg-blue-500"
							onChange={(e) => setPledge(e.target.value)}
						/>
					</label>
				</div>

				<label htmlFor="number">From what date do you pledge to do this?</label>
				<input
					name="number"
					type="date"
					placeholder="5"
					className="input input-bordered input-secondary w-full mb-6"
					onChange={(e) => setPledgeDate(e.target.value)}
				/>

				<label htmlFor="club">Club</label>
				<select
					className="select select-secondary w-full mb-6"
					onChange={(e) => setClubId(e.target.value)}
				>
					<option disabled defaultValue>
						Pick your club
					</option>
					{clubsList &&
						clubsList.map((club, index) => {
							return (
								<option key={index} value={club.id}>
									{club.club}
								</option>
							);
						})}
				</select>

				<label htmlFor="email">Email address</label>
				<input
					name="emil"
					type="text"
					placeholder="joe@joebloggs.com"
					className="input input-bordered input-secondary w-full mb-6"
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					type="submit"
					onClick={submitForm}
					className="btn btn-primary ANDRed"
					disabled={!canSubmit}
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default FormPage;
