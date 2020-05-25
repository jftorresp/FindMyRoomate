import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import dummyUsers from './User';
import Talk from 'talkjs';
import SearchBar from "./SearchBar";
import location from "./placeholder.png";
import message from "./mesaage.png";

function Feed(props) {

  const [feed, setFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetching();
  }, []);

  useEffect(() => {
    fetch("/getUsers2").then((res) => res.json())
      .then((newusers) => setUsers(newusers));
    console.log(users);

  }, []);

  const fetching = async () => {
    const res = await fetch("/loadFeed");
    const newFeed = await res.json();
    setFeed(newFeed);
  };


  const handlePageChange = (newCurrent) => {
    setPageNumber(newCurrent);
    // fetch("/pagesFeed");
  };

  const handleClick= (userName)=> {
 
    /* Retrieve the two users that will participate in the conversation */
   console.log("username",userName);
    const user = users.find(user => user.username === userName)
   console.log(users);
    console.log(user);

    console.log(props.user);
    /* Session initialization code */
    Talk.ready
    .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User({
          id: props.user._id,
          name: props.user.username,
          email: props.user.email,
          photoUrl: "https://talkjs.com/docs/img/george.jpg",
          welcomeMessage: " Hi, im interested"
      });

        const other = new Talk.User({         
          id: user._id,
          name: user.username,
          email: user.email,
          photoUrl: "https://talkjs.com/docs/img/george.jpg",
          welcomeMessage: " Hi"
      })

      console.log(other);
        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
            window.talkSession = new Talk.Session({
                appId: "tknEJI1i",
                me: me
            });
        } 
        
        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(conversationId);
        
        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
        
        
    })            
    .catch(e => console.error(e));
};
  

  const renderFeed = () => {
    console.log("What is this?", feed);
    return feed.map((element) => (
      <div key={element.id} className="card mt-4  d-flex align-items-stretch">
        <img
          className="card-img-top"
          src={element.image}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title"><img src={location} width="30" height="30"/>{element.address}</h5>
          <h6 className="card-text">Furnished:</h6> <p>Complete</p>
          <h6 className="card-text">Bathroom:</h6> <p>Private</p>
         
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><h6>Price</h6><p>${element.price}{element.currency}</p></li>
          <li className="list-group-item"><h6>{element.city}</h6></li>
      
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            {element.user}
          </a>
          <h5>
            {element.availability ? "Available" : "No Available"}
          </h5>
          <button className="button" onClick={ ()=>handleClick(element.user)}><img src={message} width="30" height="30"/></button>
        </div>
      </div>
    ));
  };

  return (
    <div>
  
      <section> 
        <h3>Current Offers</h3>
        <SearchBar></SearchBar>
      </section>
      <div id="thisCards">{renderFeed()}</div>
      <div>
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={10}
          totalItemsCount={props.pages}
          onChange={handlePageChange}
        />
      </div>
      <div className="chatbox-container" ref={c => this.container = c} >
            <div id="talkjs-container" style={{height: "300px"}}><i></i></div>
         </div>
      </div>
    
  );
}

export default Feed;
