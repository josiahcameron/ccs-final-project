import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";

import { Card, Form, Col, Row, Container, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const INITIAL_HABITS = [
	{
		title: "Brush Teeth",
		completed: "false",
		frequency: "daily",
		is_active: true,
	},
];
const INITIAL_FORM_DATA = {
	title: "",
	completed: "false",
	frequency: "daily",
	is_active: true,
};

const INITIAL_QUOTE = [
	{
		text: "The way I see it, if you want the rainbows, you gotta put up with the rain",
		author: "Dolly Parton",
	},
];

function HabitPage() {
	const csrftoken = Cookies.get("csrftoken");
	axios.defaults.headers.post["X-CSRFToken"] = csrftoken;
	const [habits, setHabits] = useState(INITIAL_HABITS);
	const [habitsCompleted, setHabitsCompleted] = useState(0);
	const [habitCompletion, setHabitCompletion] = useState(false);
	const [quote, setQuote] = useState(INITIAL_QUOTE);
	const denominator = habits.length;
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const habitHTML = habits.map((habit) => (
		<Col key={habit.title} className="align-items-start col-md-4 ">
			<Card className="single-post habit-card mt-5">
				{/* <Card.Img src={article.image} alt="post-image" /> */}
				{/* <Card.ImgOverlay> */}
				<Form.Check
					type="radio"
					className="form-control habit-checkbox border-0"
					name="is_complete"
					value="true"
					id={habit.title}
					label={habit.title}
				/>
				{/* <div className="post-info flexbox">

						</div>
					</Card.ImgOverlay> */}
			</Card>
		</Col>
	));

	useEffect(() => {
		console.log("firing");
		const fetchHabits = async () => {
			try {
				const res = await axios.get("/api_v1/habits/");
				setHabits(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		// Trigger the API Call
		fetchHabits();
	}, []);
	const handleError = (err) => {
		console.warn(err);
	};

	const handleInput = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(formData);
		try {
			const response = axios.post("/api_v1/add-habit/", formData);
			const data = (await response).data;
			setHabits([...habits, data]);
		} catch (error) {
			handleError(error);
		}
	};
	return (
		<div className="habit-page wrapper">
			<div className="box progress-qotd">
				<section className="progress-QOTD">
					<div className="progress">
						<CircularProgressbarWithChildren
							value={75}
							strokeWidth={8}
							styles={buildStyles({
								pathColor: "#f00",
								trailColor: "transparent",
							})}
						>
							{/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
							<div style={{ width: "84%" }}>
								<CircularProgressbarWithChildren
									value={70}
									styles={buildStyles({
										trailColor: "transparent",
									})}
								>
									<div style={{ width: "84%" }}>
										<CircularProgressbar
											value={70}
											styles={buildStyles({
												pathColor: "green",
												trailColor: "transparent",
											})}
										/>
									</div>
								</CircularProgressbarWithChildren>
							</div>
						</CircularProgressbarWithChildren>
					</div>
					<div className="qotd-container">
						<div className="qotd">
							<p className="quote">{quote[0].text}</p>
							<p className="quote-author">- {quote[0].author}</p>
						</div>
					</div>
				</section>
			</div>
			<div className="habit-type-selection-wrapper">
				<h5>My Steps:</h5>
				<section className="habit-type-selection-navbar">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="c"
							>
								Daily Strolls
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Weekly Jaunts
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Monthly Treks
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link "
								aria-current="page"
								href="c"
							>
								Overview
							</a>
						</li>
					</ul>
				</section>
			</div>
			<div className="box habit-list">
				{/* <Container className="m-0  habit-container "> */}
				<Row className=" row align-items-start habit-cards ">
					{habitHTML}
					<Col className="align-items-start col-md-4 ">
						<Card className="single-post mt-5 habit-card add-habit">
							<form>
								<div className="form-group input-box">
									<input
										className="form-control"
										id="title"
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInput}
									/>
									<label>Add Habit</label>
								</div>
								<button
									onClick={handleSubmit}
									className="btn btn-primary btn-block"
								>
									Submit
								</button>
							</form>
						</Card>
					</Col>
				</Row>
				{/* </Container> */}
			</div>
		</div>
	);
}

export default HabitPage;
