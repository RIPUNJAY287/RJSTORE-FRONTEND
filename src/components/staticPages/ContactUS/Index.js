import React from "react";
import "./style.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaSnapchat,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMail, IoCall, IoLocation } from "react-icons/io5";
import LocationOffice from "../../../assets/location.jpeg";
const Index = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [comment, setComment] = useState('');
  return (
    <div className="contact">
      <div className="contact_card shadow">
        <h3 className="contact_card_heading user_select_disable">
          GET IN TOUCH
        </h3>
        <div className="contact_card_details">
          <div className="contact_card_popups">
            <div className="contact_card_popups_social user_select_disable">
              Our Social Media handle:{" "}
              <a
                className="contact_link_"
                href="https://www.facebook.com/rjstore"
                rel="noreferrer"
                target="_blank"
              >
                <FaFacebookF />
              </a>
              <a
                className="contact_link_"
                href="https://www.instagram.com/rjstore/"
                rel="noreferrer"
                target="_blank"
              >
                <FaInstagram />
              </a>
              <a
                className="contact_link_"
                href="https://www.linkedin.com/company/rjstore/"
                rel="noreferrer"
                target="_blank"
              >
                <FaLinkedinIn />
              </a>
              <a
                className="contact_link_"
                href="https://twitter.com/rjstore"
                rel="noreferrer"
                target="_blank"
              >
                <FaTwitter />
              </a>
              <a
                className="contact_link_"
                href="https://www.snapchat.com/add/rjstore"
                rel="noreferrer"
                target="_blank"
              >
                <FaSnapchat />
              </a>
            </div>
            <div className="contact_card_popups_detail">
              <IoMail />{" "}
              <a
                className="contact_link"
                href="mailto:info@fooddude"
                rel="noreferrer"
                target="_blank"
              >
                Mail: kripunjay81@gmail.com
              </a>
            </div>
            <div className="contact_card_popups_detail">
              <IoCall />{" "}
              <a
                className="contact_link"
                href="tel:+917492032335"
                rel="noreferrer"
                target="_blank"
              >
                Phone: +91-7492032335
              </a>
            </div>
            <div className="contact_card_popups_detail">
              <FaWhatsapp />{" "}
              <a
                className="contact_link"
                href="https://wa.me/+917492032335"
                rel="noreferrer"
                target="_blank"
              >
                Whatsapp: +91-7492032335
              </a>
            </div>
            <div className="contact_card_popups_detail">
              <IoLocation />{" "}
              <a
                className="contact_link"
                href=""
                rel="noreferrer"
                target="_blank"
              >
                Karma Road, Aurangabad (Bihar) , pincode - 824101
              </a>
            </div>
            <img
              src={LocationOffice}
              alt="Office Location"
              className="contact_card_popups_location"
            />
          </div>
          {/*<div className="contact_card_direct">
                         <h4 className="contact_card_direct_heading user_select_disable">Leave Us A Comment</h4>
                        <form action="submit">
                            <div className="contact_card_direct_inputholder">
                                <input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    name="name"
                                    type="text"
                                    required
                                />
                                <label className={name !== '' && 'labelactive'} for="name">
                                    Name
                                </label>
                            </div>
                            <div className="contact_card_direct_inputholder">
                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    name="email"
                                    type="email"
                                    required
                                />
                                <label className={email !== '' && 'labelactive'} for="email">
                                    Email
                                </label>
                            </div>
                            <div className="contact_card_direct_inputholder-2">
                                <textarea
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                    name="comment"
                                    type="text"
                                    required
                                />
                                <label className={`label_alt ${comment !== '' && 'labelactive-2'}`} for="comment">
                                    Message
                                </label>
                            </div>
                            <button disabled={true} type="submit" className="contact_card_direct_submit">
                                Submit
                            </button> 
                        </form>
                    </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Index;
