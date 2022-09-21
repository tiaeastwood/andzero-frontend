import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function FormPage() {
  const [coffeeCups, setCoffeeCups] = useState();
  const [pledge, setPledge] = useState();
  const [pledgeDate, setPledgeDate] = useState();
  const [email, setEmail] = useState();
  const [clubId, setClubId] = useState();
  const [formResponse, setFormResponse] = useState();

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

  useEffect(() => {
    console.log(
      "coffeeCups",
      coffeeCups,
      "pledge",
      pledge,
      "email",
      email,
      "clubId",
      clubId,
      "pledgeDate",
      pledgeDate
    );
  }, [coffeeCups, pledge, email, clubId, pledgeDate]);

  return (
    <div id="form-container ">
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
        <label class="coffeePledgeLabel" htmlFor="radio">
          Do you pledge to switch to a reusable coffee cup?
        </label>
        <div className="mb-5">
          <label className="label cursor-pointer">
            <div className="btnContainer flex justify-between">
              <button
                className="btn btn-primary ANDRed"
                value={true}
                onClick={(e) => setPledge(e.target.value)}
              >
                Yes
              </button>
              <button
                className="btn btn-primary ANDRed"
                value={false}
                onClick={(e) => setPledge(e.target.value)}
              >
                No
              </button>
            </div>
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
          <option value="1">Wangari</option>
          <option value="2">Woods</option>
          <option value="3">Dekker</option>
          <option value="4">Jemison</option>
          <option value="5">Somerville</option>
          <option value="6">Adams</option>
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
