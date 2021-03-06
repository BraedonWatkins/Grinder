
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './card.css';
import { AccountContext } from './Account';


export default function FriendProfile({ friendid }) {
  const { getSession } = useContext(AccountContext);
  useEffect(() => {
    getSession()
      .then(() => {
        // user is logged in
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []);

    const [Friend, setFriend] = useState([]);
    const [Friends, setFriends] = useState([]);
    var storage = require("../tokenStorage");
    var fs = require('fs');

    useEffect(async () => {
        var id, id2;
        var bp = require("./Path");
        try {
            id2 = await friendid;
        } catch (err) {
            console.error(err);
        }

        
        id2.map((c) => {
            const getFriend = async () => {
                try {
                    var config = {
                        method: "get",
                        url: bp.buildPath("api/getProfile/" + c),
                        headers: { Authorization: storage.retrieveToken() },
                    };
                    const resp = await axios(config);
                    setFriend(old => [...old, resp.data.Profile.Gamertag]);
                    let newElement = {
                        tag: resp.data.Profile.Gamertag,
                        age: resp.data.Profile.Age,
                        pic: resp.data.Profile.ProfilePicture,
                    }
                    
                    setFriends(Friends =>[...Friends, newElement])

                } catch (err) {
                    console.error(err);
                }
            };
            getFriend();

        });

    }, [friendid]);
    return (


        <div className="clearfix">
        <div className="row">
          {Friends.map(data => (
            <div className="col-md-4 animated fadeIn">
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    {data.pic ? <img src={`data:image/png;base64,${data.pic}`} class="profilepic"/>: ''}
                  </div>
                  <h5 className="card-title">
                  {data.tag}
                  </h5>
                  <p className="card-text">
                      {data.age}
                    <br />
                    <span className="phone"></span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    );
}