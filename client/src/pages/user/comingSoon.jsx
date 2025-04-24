import "../../styles/user/comingSoon.css";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faLinkedinIn, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import comingSoonImage from "../../assets/images/coming-soon/coming-soon.png";
// import {UserPanel} from '../../components/admin/OfferTime.jsx';
function ComingSoon({ comingSoonData }) {

  //CountDown Time start

	const [seconds, setSeconds] = useState(1296000);
	useEffect(() => {
	  const interval = setInterval(() => {
		setSeconds(prevSeconds => {
		  if (prevSeconds === 0) {
			clearInterval(interval);
		  }
		  return prevSeconds - 1;
		});
	  }, 1000);
  
	  return () => clearInterval(interval);
	}, []);
	const days = Math.floor(seconds / (60 * 60 * 24));
	const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const second = seconds % 60;
		// const calculateTimeLeft = (countdownEndDate) => {
		//   const difference = new Date(countdownEndDate) - new Date();
		//   if (difference > 0) {
		// 	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		// 	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
		// 	const minutes = Math.floor((difference / 1000 / 60) % 60);
		// 	const seconds = Math.floor((difference / 1000) % 60);
		// 	return { days, hours, minutes, seconds };
		//   }
		//   return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		// };
	  
		// const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	  
		// useEffect(() => {
		//   const timer = setTimeout(() => {
		// 	setTimeLeft(calculateTimeLeft());
		//   }, 1000);
	  
		//   return () => clearTimeout(timer);
		// });

  //CountDown Time end

	return (
		<>
			<div className="coming-soon-section">
				<div className="coming-soon-text">
					<div className="coming-soon">
						<h1>COMING SOON...</h1>
					</div>

					<div className="countdown">
						<div className="days">
						
							<span className="countdown-time">
								{days}
								<span>:</span>
							</span>
							<p>days</p>
						</div>

						<div className="hours">
							<span className="countdown-time">
								{hours}
								<span>:</span>
							</span>
							<p>hours</p>
						</div>

						<div className="minutes">
							<span className="countdown-time">
								{minutes}
								<span>:</span>
							</span>
							<p>minutes</p>
						</div>

						<div className="seconds">
							<span className="countdown-time">{second}</span>
							<p>seconds</p>
						</div>
					</div>

					<div className="coming-soon-description">
						<p>WE ARE CURRENTLY WORKING ON AN AWESOME NEW SITE. SUBSCRIBE TO OUR NEWSLETTER TO STAY UPDATED.</p>
					</div>

					<div className="email-us">
						<input type="email" placeholder="Enter your Email here" />
						<span>
							<FontAwesomeIcon icon={faPaperPlane} />
						</span>
					</div>

					<div className="connect-in-social">
						<div className="connect-social-icons">
							<span>
								<FontAwesomeIcon icon={faFacebookF} />
							</span>
							<span>
								<FontAwesomeIcon icon={faTwitter} />
							</span>
							<span>
								<FontAwesomeIcon icon={faInstagram} />
							</span>
							<span>
								<FontAwesomeIcon icon={faLinkedinIn} />
							</span>
							<span>
								<FontAwesomeIcon icon={faPinterestP} />
							</span>
						</div>
					</div>
				</div>

				<div className="coming-soon-banner">
					<img src={comingSoonImage} alt="" />
				</div>
			</div>
		</>
	);
}

export default ComingSoon;
