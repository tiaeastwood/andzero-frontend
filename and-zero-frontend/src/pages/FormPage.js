import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function FormPage() {
  const [coffeeCups, setCoffeeCups] = useState();
  const [pledge, setPledge] = useState();
  const [pledgeDate, setPledgeDate] = useState();
  const [email, setEmail] = useState();
  const [clubId, setClubId] = useState();
  const [clubsList, setClubsList] = useState([]);
  const [showMsg, setShowMsg] = useState(false);

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
      .then((res) => {
        if (res.ok) navigation("/Stats");
      })
      .catch((error) => {
        setShowMsg(true);

        console.log("Form submit error", error);
        setTimeout(() => {
          setShowMsg(false);
        }, 3000);
      });
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
          <div id="pledgeContainer" className="flex items-between">
            <button
              className="rounded-lg ANDRed"
              value={true}
              onClick={(e) => setPledge(e.target.value)}
            >
              YES
            </button>

            <button
              className="p-3 rounded-lg ANDRed ml-2"
              value={false}
              onClick={(e) => setPledge(e.target.value)}
            >
              NO
            </button>
          </div>
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
          id="submitBtn"
          className="btn btn-primary ANDRed w-full"
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>

      {showMsg && (
        <div className="toast">
          <div className="alert alert-info">
            <div>
              <span>Error: Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
