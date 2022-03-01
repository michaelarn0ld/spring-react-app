import React, {useState} from "react";

function Registration() {

    const [name, setName] = useState("");
    const [heading, setHeading] = useState("");
	const [password, setPassword] = useState("");

    function handleChange(event) {
        console.log(event.target.value);
        setName(event.target.value);

    }

    function handleClick(event) {

		const { password, confirmPassword } = this.state;
		// perform all neccassary validations
		if (password !== confirmPassword) {
			alert("Passwords don't match");
		} else {
			// make API call
		}

		setHeading(name);
		event.preventDefault();
    }


    return (
		<>
			<div className={"card-group"}>
				<div className={"card bg-dark text-white"}>
					<img src={"https://post.healthline.com/wp-content/uploads/2020/09/woman-doing-push-ups-on-mat-732x549-thumbnail-732x549.jpg"} className={"card-img opacity-50"} alt={"yoga girl"}/>
					<div className={"card-img-overlay"}>
						<div className="card-title">
							<div className="card-body">
							</div>
						</div>
					</div>
				</div>
				<div className={"card bg-dark text-white"}>
					<img src={"https://images.unsplash.com/photo-1596357395217-80de13130e92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2VpZ2h0JTIwcm9vbXxlbnwwfHwwfHw%3D&w=1000&q=80"} className={"card-img opacity-50"} alt={"yoga girl"}/>
					<div className={"card-img-overlay"}>
						<div className="card-title">
							<div className="card-body">
								<div className={"text-center"}>
									<form onSubmit={handleClick} className="forms text-center">
										<h2>Hello, We're glad you're here!</h2>
										<label htmlFor="firstName">First Name: </label>
										<input
											type="text"
											onChange={handleChange}/>
										<br />
										<label htmlFor="lastName">Last Name: </label>
										<input type="text"/>
										<br />
										<label htmlFor="email">Email: </label>
										<input type="text"/>
										<br />
										<label htmlFor="password">Password: </label>
										<input type="password"/>
										<br />
										<label htmlFor="password">Confirm Password: </label>
										<input type="password"/>
										<br />
										<label htmlFor="phone">Phone Number: </label>
										<input type="text"/>
										<br />
										<label htmlFor="address">Address Line 1: </label>
										<input type="text"/>
										<br />
										<label htmlFor="address">Address Line 2: </label>
										<input type="text"/>
										<br />
										<label htmlFor="address">City: </label>
										<input type="text"/>
										<label htmlFor="address">State:</label>
										<select>
											<option value="AL">Alabama</option>
											<option value="AK">Alaska</option>
											<option value="AZ">Arizona</option>
											<option value="AR">Arkansas</option>
											<option value="CA">California</option>
											<option value="CO">Colorado</option>
											<option value="CT">Connecticut</option>
											<option value="DE">Delaware</option>
											<option value="DC">District Of Columbia</option>
											<option value="FL">Florida</option>
											<option value="GA">Georgia</option>
											<option value="HI">Hawaii</option>
											<option value="ID">Idaho</option>
											<option value="IL">Illinois</option>
											<option value="IN">Indiana</option>
											<option value="IA">Iowa</option>
											<option value="KS">Kansas</option>
											<option value="KY">Kentucky</option>
											<option value="LA">Louisiana</option>
											<option value="ME">Maine</option>
											<option value="MD">Maryland</option>
											<option value="MA">Massachusetts</option>
											<option value="MI">Michigan</option>
											<option value="MN">Minnesota</option>
											<option value="MS">Mississippi</option>
											<option value="MO">Missouri</option>
											<option value="MT">Montana</option>
											<option value="NE">Nebraska</option>
											<option value="NV">Nevada</option>
											<option value="NH">New Hampshire</option>
											<option value="NJ">New Jersey</option>
											<option value="NM">New Mexico</option>
											<option value="NY">New York</option>
											<option value="NC">North Carolina</option>
											<option value="ND">North Dakota</option>
											<option value="OH">Ohio</option>
											<option value="OK">Oklahoma</option>
											<option value="OR">Oregon</option>
											<option value="PA">Pennsylvania</option>
											<option value="RI">Rhode Island</option>
											<option value="SC">South Carolina</option>
											<option value="SD">South Dakota</option>
											<option value="TN">Tennessee</option>
											<option value="TX">Texas</option>
											<option value="UT">Utah</option>
											<option value="VT">Vermont</option>
											<option value="VA">Virginia</option>
											<option value="WA">Washington</option>
											<option value="WV">West Virginia</option>
											<option value="WI">Wisconsin</option>
											<option value="WY">Wyoming</option>
										</select>
										<br />
										<button onClick={handleClick}>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={"card bg-dark text-white"}>
					<img src={"https://www.familyfuntwincities.com/wp-content/uploads/2020/07/grove-aquatic-center.jpg"} className={"card-img opacity-50"} alt={"yoga girl"}/>
					<div className={"card-img-overlay"}>
						<div className="card-title">
							<div className="card-body">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={"card-group"}>
				<div className={"card bg-dark text-white"}>
					<img src={"https://images.squarespace-cdn.com/content/v1/54beb580e4b00cf9dcf08db8/1498259961131-L11YYWPW2B9I8712HR50/gym+wide+2017.png?format=750w"} className={"card-img opacity-50"} alt={"yoga girl"}/>
					<div className={"card-img-overlay"}>
					</div>
				</div>
			</div>
		</>


    )
}

export default Registration;




